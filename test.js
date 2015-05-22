var each = require('./peachy');
var test = require('tape');

test('eachy', function(t) {
  t.plan(4);

  var results = [];
  var start = Date.now();
  each([900,800,700], function(n, done) {
    setTimeout(function() {
      done(null, n);
    }, n);
  }, function(err, data) {
    t.deepEqual([900,800,700], data, 'Peachy properly returns data provided to callbacks and respects the item order of the initial array');
    t.ok(Date.now() - start < 1000, 'Peachy calls each item in an array in parallel');
  });

  each([1,2,3,4], function(n, done) {
    if (n % 2 === 0) return done(new Error('boop' + n));
    done();
  }, function(err) {
    t.ok(err instanceof Error, 'Peachy handles errors');
  });

  var indexes = [];
  each([0,1,2,3,4], function(n, done, index) {
    indexes.push(index);
    done();
  }, function() {
    t.deepEqual(indexes, [0,1,2,3,4], 'Peachy provides indexes to iterator functions');
  });

});
