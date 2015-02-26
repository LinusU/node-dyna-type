
var decode = require('./lib/decode.js');
var encode = require('./lib/encode.js');

exports.decode = decode.value;
exports.decodeObject = decode.object;
exports.decodeObjects = decode.objects;

exports.encode = encode.value;
exports.encodeObject = encode.object;
exports.encodeObjects = encode.objects;
