# series-js

Generate polynomial series with ease.

A software implementation of Babbage's [Difference Engine](https://en.wikipedia.org/wiki/Difference_engine).

## Install

```sh
$ npm i @divs1210/series-js
```

## Usage

```js
const series = require('@divs1210/series-js');
```

### 1. All positive integers

```js
const posInts = series.infer([1, 2]);
// posInts.next().value => 1
// posInts.next().value => 2
// posInts.next().value => 3
// posInts.next().value => 4
// ...
```

### 2. First 5 multiples of 10

```js
const x10s = series.inferN([10, 20], 5);
// x10s.next().value => 10
// x10s.next().value => 20
// x10s.next().value => 30
// x10s.next().value => 40
// x10s.next().value => 50
// x10s.next().done  => true
```

### 3. Countdown

```js
const countdown = series.inferArray([5, 4], 5);
// countdown => [5, 4, 3, 2, 1]
```

### 4. First 10 Squares

```js
const squares = series.inferArray([1, 4, 9], 10);
// squares => [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```

### 5. Repetition

```js
const zeroes = series.inferArray([0], 5);
// zeroes => [0, 0, 0, 0, 0]
```

## License

[MIT](/LICENSE)