# immutable-js-schema

[![Build Status](https://travis-ci.org/duckpunch/immutable-js-schema.svg)](https://travis-ci.org/duckpunch/immutable-js-schema)
[![Dependencies](https://david-dm.org/duckpunch/immutable-js-schema.svg)](https://david-dm.org/duckpunch/immutable-js-schema)

Schema validator for immutable js structures

## Getting Started

`npm install immutable-schema`

Then,

```javascript
import {ListSchema, MapSchema} from 'immutable-schema';
```

## Examples

```javascript
const schema = ListSchema(isString, isNumber, v => v === 'greetings');
const list = List.of('hi', 14.5, 'greetings');
assert.ok(schema(list));
```

```javascript
const schema = MapSchema(
    isString, isNumber,
    v => isNumber(v) && (v % 2 === 0), isString
);

assert.ok(schema(
    Map().set('hi', 5).set(14, 'roar')
));
```
