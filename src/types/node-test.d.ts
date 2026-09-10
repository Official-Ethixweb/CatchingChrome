/**
 * Minimal ambient typing for Node's built-in test runner (no @types/node
 * here, by the same choice as the ambient `process` declares in
 * contact.ts / weather.ts / googleReviews.ts) — just enough surface for the
 * *.test.ts files in this project, run via `npm test` (node --test).
 */
declare module 'node:test' {
  export function test(
    name: string,
    fn: () => void | Promise<void>,
  ): void
}

declare module 'node:assert/strict' {
  interface StrictAssert {
    equal(actual: unknown, expected: unknown, message?: string): void
    deepEqual(actual: unknown, expected: unknown, message?: string): void
  }
  const assert: StrictAssert
  export default assert
}
