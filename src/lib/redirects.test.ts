import { test } from 'node:test'
import assert from 'node:assert/strict'
import { resolveRedirect } from './redirects'

test('exact species-variant match redirects to the canonical species page', () => {
  assert.deepEqual(resolveRedirect('/salmon-fishing'), {
    href: '/fall-chinook',
    statusCode: 301,
  })
})

test('every real route slug resolves to itself (a same-path 301), never null or elsewhere', () => {
  // resolveRedirect() has no notion of "this path already has a route" —
  // that guarantee comes entirely from route precedence in src/router.tsx
  // (a real route always wins before the catch-all $.tsx ever calls this
  // function). What this function itself must never do is send one real
  // route's slug to a *different* page, or drop it to a 404 — both keyword
  // rules (e.g. /shad/ matching "american-shad") and the species EXACT list
  // are broad by design, so this pins that they stay harmless self-redirects.
  for (const real of [
    '/american-shad',
    '/fall-chinook',
    '/spring-chinook',
    '/winter-steelhead',
    '/sturgeon',
    '/dungeness-crab',
    '/contact',
    '/pricing',
    '/excursions',
    '/about',
    '/gallery',
    '/commercial',
  ]) {
    assert.deepEqual(resolveRedirect(real), { href: real, statusCode: 301 })
  }
  // The homepage is the one real route with nothing to normalize down to.
  assert.equal(resolveRedirect('/'), null)
})

test('nested paths match an EXACT entry on their last segment', () => {
  // 'rates' is an EXACT key; 'american-shad' is not (it's a real route, kept
  // out of the map on purpose) — this exercises the nested-lookup branch
  // specifically, not the keyword-rule fallback further down.
  assert.deepEqual(resolveRedirect('/services/rates'), {
    href: '/pricing',
    statusCode: 301,
  })
})

test('keyword rules catch slugs no exact entry covers', () => {
  assert.deepEqual(resolveRedirect('/american-shad-trips-oregon'), {
    href: '/american-shad',
    statusCode: 301,
  })
})

test('normalization: case, trailing slash, extension and underscores are ignored', () => {
  const target = { href: '/pricing', statusCode: 301 as const }
  assert.deepEqual(resolveRedirect('/RATES'), target)
  assert.deepEqual(resolveRedirect('/rates/'), target)
  assert.deepEqual(resolveRedirect('/rates.html'), target)
  assert.deepEqual(resolveRedirect('/trip_rates'), target)
})

test('single-page-site anchors resolve to the homepage section', () => {
  assert.deepEqual(resolveRedirect('/faq'), { href: '/#faq', statusCode: 301 })
})

test('an unrecognized path falls through to a real 404 rather than the homepage', () => {
  assert.equal(resolveRedirect('/this-was-never-a-page-anywhere'), null)
})

test('an empty path is left alone (the root route handles it, not this file)', () => {
  assert.equal(resolveRedirect('/'), null)
  assert.equal(resolveRedirect(''), null)
})
