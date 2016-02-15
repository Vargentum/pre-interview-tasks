# pre-interview-tasks
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

> Description

## Installation

```
$ npm install --save pre-interview-tasks
```

## Usage
```js
var preInterviewTasks = require('pre-interview-tasks');
```

## API

### `preInterviewTasks(data, [options])`
Description

#### Parameters
- **Array** `data`: An array of data
- **Object** `options`: An object containing the following fields:

#### Return
- **Array** - Result

## Development
- `npm run build` - Build task that generates both minified and non-minified scripts;
- `npm run test-server` - Run Mocha tests once;
- `npm run test-browser` - Run Mocha tests in the browser using Karma once;
- `npm run test` - Shortcut for `npm run test-server && npm run test-browser`;
- `npm run tdd` - Run Mocha tests & watch files for changes;
- `npm run tdd-browser` - Run Karma (w/ Mocha) tests & watch files for changes;
- `npm run coverage` - Run Isparta, a code coverage tool;

## License
MIT © [Vargentum](http://github.com/Vargentum)

[travis-url]: https://travis-ci.org/Vargentum/pre-interview-tasks
[travis-image]: https://img.shields.io/travis/Vargentum/pre-interview-tasks.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/Vargentum/pre-interview-tasks
[coveralls-image]: https://img.shields.io/coveralls/Vargentum/pre-interview-tasks.svg?style=flat-square

[depstat-url]: https://david-dm.org/Vargentum/pre-interview-tasks
[depstat-image]: https://david-dm.org/Vargentum/pre-interview-tasks.svg?style=flat-square
