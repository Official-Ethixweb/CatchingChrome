import { defineConfig, type Plugin } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Stops a browser hanging up from being reported as a server crash.
 *
 * When a client abandons an in-flight request — navigating away from a page
 * that is still pulling images, or a reload landing mid-fetch — Node raises
 * `ECONNRESET` on the socket. Vite hands that to its error middleware, which
 * throws the full-screen "Internal server error: read ECONNRESET" overlay over
 * a dev server that is in fact perfectly healthy.
 *
 * Only the socket codes that mean "the other end went away" are swallowed.
 * Every genuine error still reaches the overlay, which is the whole point of
 * doing this rather than setting `server.hmr.overlay: false` — that would hide
 * real errors too.
 */
function ignoreClientDisconnects(): Plugin {
  // Typed locally rather than via @types/node: this project deliberately has no
  // Node types installed (see the ambient `process` declare in src/lib/weather.ts).
  type ErrnoLike = { code?: string }
  type Emitterish = {
    on?: (event: string, listener: (err: unknown) => void) => void
  }
  type SocketLike = { destroy?: () => void; writable?: boolean; end?: (s?: string) => void }

  const GONE = new Set([
    'ECONNRESET',
    'EPIPE',
    'ECANCELED',
    'ERR_STREAM_PREMATURE_CLOSE',
  ])
  const isDisconnect = (e: unknown) => !!e && GONE.has((e as ErrnoLike).code ?? '')

  return {
    name: 'ignore-client-disconnects',
    apply: 'serve',
    configureServer(server) {
      // A socket reset before the request line is fully parsed.
      const httpServer = server.httpServer as Emitterish | null
      httpServer?.on?.('clientError', ((err: unknown, socket: SocketLike) => {
        if (isDisconnect(err)) {
          socket.destroy?.()
          return
        }
        if (socket.writable) socket.end?.('HTTP/1.1 400 Bad Request\r\n\r\n')
      }) as (err: unknown) => void)

      // configureServer runs before Vite's internal middlewares, so this claims
      // the stream's error events before the error middleware can escalate them
      // into a full-screen overlay.
      server.middlewares.use((req, res, next) => {
        const handle = (e: unknown) => {
          if (!isDisconnect(e)) server.config.logger.error(String(e))
        }
        ;(req as unknown as Emitterish).on?.('error', handle)
        ;(res as unknown as Emitterish).on?.('error', handle)
        next()
      })
    },
  }
}

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    ignoreClientDisconnects(),
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    nitro({
      preset: 'vercel',
    }),
    viteReact(),
  ],
})
