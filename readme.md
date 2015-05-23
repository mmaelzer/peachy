peachy
======

A tiny (23 lines of code) parallel async each/map implementation that supports CommonJS, AMD, and VanillaJS. The minified file `peachy.min.js` is just 360 bytes. 
  
[![build status](https://secure.travis-ci.org/mmaelzer/peachy.png)](http://travis-ci.org/mmaelzer/peachy)

Install
-------

#### npm
```
npm install peachy
```

#### bower
```
bower install peachy
```

Usage
-----

### asyncEach(array, iterator, callback)

#### Arguments
* `array` - An array to iterate over
* `iterator(item, callback, index)` - A function called for each `item` in the `array`. The `callback(err, value)` optionally takes an error or data. Data is collected and provided when all iterator functions have finished. The `index` value is the index of the item in the array.
* `callback(err, values)` - The callback that is called when all `iterator` functions are finished or an error occurs. The `values` argument is an array of values collected from iterator functions. The index of the value in values maps to the index of the item provided to the iterator function.

Examples
--------
#### Browser (No module loader)
```html
<script src="/js/peachy.min.js"></script>
<script>
  // parallelEach is a global bound to the window object now
  parallelEach(['hi', 'i love', 'alerts'], function(word, done) {
    alert(word);
    done();
  });
</script>
```

#### Node.js
```javascript
var parallelEach = require('peachy');
var fs = require('fs');

parallelEach(['robots.txt', 'todo.txt'], fs.readFile, function(err, files) {
  files.forEach(function(text) {
    console.log(text);
  });
  console.log('You should have all the information you need now.');
});
```
