# object-filter-sequence

[![npm](https://img.shields.io/npm/v/object-filter-sequence.svg)](https://www.npmjs.com/package/object-filter-sequence)
[![Lint status](https://github.com/elastic/object-filter-sequence/workflows/Lint/badge.svg)](https://github.com/elastic/object-filter-sequence/actions)
[![Test status](https://github.com/elastic/object-filter-sequence/workflows/Test/badge.svg)](https://github.com/elastic/object-filter-sequence/actions)

This module provides an interface to apply a sequence of filters to an object. It is a subclass of Array, so any array method can be used on it.

## Installation

```
npm install object-filter-sequence
```

## Example Usage

```js
const Filters = require('object-filter-sequence')

const filters = new Filters()

filters.push(previous => {
  const next = {}
  next.key = previous.key.toUpperCase()
  return next
})

filters.push(previous => {
  const next = {}
  next.key = previous.key.reverse()
  return next
})

filters.process({ key: 'value' }) // { key: 'EULAV' }
```

## API

### `filters.process(object)`

This is the only unique method from the Array base class. It is used to apply the filters in the array to the provided object.

## License

[MIT](LICENSE)
