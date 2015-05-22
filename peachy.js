(function(global) {
  function peachy(items, iterator, callback) {
    var results = [], called = 0;
    callback = callback || function(){};
    for (var i = 0; i < items.length; i++) iterate(i);
    function iterate(index) {
      setTimeout(function() {
        iterator(items[index], function(err, result) {
          if (called === -1) return;
          if (err) called = -1;
          if (err) return callback(err);
          results[index] = result;
          if (++called === items.length) callback(undefined, results);
        }, index);
      }, 0);
    }
  }
  if (typeof define !== 'undefined' && define.amd) {
    define(function() { return peachy; });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = peachy;
  } else {
    global.parallelEach = peachy;
  }
})(this);
