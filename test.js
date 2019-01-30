'use strict'

const test = require('tape')

const Filters = require('./')

const allMethods = [
  'new',
  'from',
  'push',
  'unshift',
  'concat(item)',
  'concat([item])'
]

var types = [
  { type: 'number', value: 0, validFor: ['new'] },
  { type: 'string', value: 'a', validFor: [] },
  { type: 'true', value: true, validFor: [] },
  { type: 'null', value: null, validFor: [] },
  { type: 'undefined', value: undefined, validFor: [] },
  { type: 'regex', value: /a/, validFor: [] },
  { type: 'array', value: [], validFor: ['concat(item)'] },
  { type: 'object', value: {}, validFor: [] },
  { type: 'function', value: identity, validFor: allMethods }
]

function identity (value) {
  return value
}

const errorRegex = /^Error: filter must be a function$/

function verify (t, types, method, wrap) {
  for (let type of types) {
    const fn = () => wrap(type.value, type.type)
    if (type.validFor.includes(method)) {
      t.doesNotThrow(fn, null, `accept valid type "${type.type}"`)
    } else {
      t.throws(fn, errorRegex, `reject invalid type "${type.type}"`)
    }
  }
}

test('new Filters', t => {
  verify(t, types, 'new', (value, type) => {
    const result = new Filters(value)
    t.ok(result, `produced valid instance from type "${type}"`)
    return result
  })
  t.end()
})

test('Filters.from', t => {
  verify(t, types, 'from', (value, type) => {
    const result = Filters.from([value])
    t.ok(result, `produced valid instance from type "${type}"`)
    return result
  })
  t.end()
})

test('filters.push', t => {
  const filters = new Filters()
  verify(t, types, 'push', value => filters.push(value))
  t.end()
})

test('filters.unshift', t => {
  const filters = new Filters()
  verify(t, types, 'unshift', value => filters.unshift(value))
  t.end()
})

test('filters.concat(item)', t => {
  const filters = new Filters()
  verify(t, types, 'concat(item)', value => filters.concat(value))
  t.end()
})

test('filters.concat([item])', t => {
  const filters = new Filters()
  verify(t, types, 'concat([item])', value => filters.concat([value]))
  t.end()
})
