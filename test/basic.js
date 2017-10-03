
var dynaType = require('../');
var assert = require('assert');

function toString(arg) {
  if (arg === null) { return 'null'; }
  if (arg === undefined) { return 'undefined'; }
  return arg.toString();
}

var tests = [
  ['hello', { S: 'hello' }],
  [1337, { N: '1337' }],
  [true, { BOOL: true }],
  [null, { NULL: true }],
  [[1, 2, 3], { L: [{ N: '1' }, { N: '2' }, { N: '3' }] }],
  [{ a: 23 }, { M: { a: { N: '23' } } }],
  [{ a: [1, 2] }, { M: { a: { L: [{ N: '1' }, { N: '2' }] } } }],
  [{ a: { b: null } }, { M: { a: { M: { b: { NULL: true } } } } }],
  [new Set(['1', '2', '3']), { SS: ['1', '2', '3'] }],
  [new Set([1, 2, 3]), { NS: ['1', '2', '3'] }]
];

var keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

var objectJS = keys.reduce(function (res, key, idx) {
  res[key] = tests[idx][0]; return res;
}, {});

var objectDT = keys.reduce(function (res, key, idx) {
  res[key] = tests[idx][1]; return res;
}, {});

var objectsJS = [objectJS, objectJS, objectJS];
var objectsDT = [objectDT, objectDT, objectDT];

describe('dynaType', function () {

  describe('#encode', function () {
    tests.forEach(function (test) {
      it('encodes ' + toString(test[0]), function () {
        assert.deepEqual(dynaType.encode(test[0]), test[1]);
      });
    });
  });

  describe('#encodeObject', function () {
    it('encodes an object', function () {
      assert.deepEqual(dynaType.encodeObject(objectJS), objectDT);
    });
  });

  describe('#encodeObjects', function () {
    it('encodes an array of objects', function () {
      assert.deepEqual(dynaType.encodeObjects(objectsJS), objectsDT);
    });
  });

  describe('#decode', function () {
    tests.forEach(function (test) {
      it('decodes ' + toString(test[1]), function () {
        assert.deepEqual(dynaType.decode(test[1]), test[0]);
      });
    });
  });

  describe('#decodeObject', function () {
    it('decodes an object', function () {
      assert.deepEqual(dynaType.decodeObject(objectDT), objectJS);
    });
  });

  describe('#decodeObjects', function () {
    it('decodes an array of objects', function () {
      assert.deepEqual(dynaType.decodeObjects(objectsDT), objectsJS);
    });
  });

});
