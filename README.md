# async-iterators
Asynchronous iterators for event handilng in JavaScript

## install
Just copy index.mjs to the relevant folder or
```
$ npm install @santoshrajan/async-iterators
``` 

## Example
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Click Counter</title>
  </head>
<body>
  <h1>Click Counter</h1>
  <div id='counter'></div>
  <button id='plus'>+</button>
  <button id='minus'>-</button>

<script type='module'>

import {
  clickIterator,
  mapIterator,
  mergeIterators,
  runIterator
 } from './index.mjs'

const store = function createStore () {
  var counter = 0
  return (n) => counter += n 	
}()

function render (n) {
  document.querySelector('#counter').textContent = n
  return n
}

function pipe (...fns) {
  return function (n) {
    for (const f of fns) n = f(n)
  }
}

const handleButtonClicks = pipe(store, render)

const plusIterator = mapIterator(clickIterator('#plus'), e => 1)

const minusIterator = mapIterator(clickIterator('#minus'), e => -1)

const allIterator = mergeIterators(plusIterator, minusIterator)

runIterator(allIterator, handleButtonClicks)

handleButtonClicks(0)

</script>
</body>
</html>

```
