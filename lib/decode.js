
exports.object = function (obj) {
  return Object.keys(obj).reduce(function (res, key) {
    res[key] = exports.value(obj[key]);
    return res;
  }, {});
};

exports.objects = function (arr) {
  return arr.map(exports.object);
};

exports.value = function (arg) {
  switch (Object.keys(arg)[0]) {
    case 'S': return arg['S'];
    case 'N': return Number(arg['N']);
    case 'B': return arg['B'];
    case 'BOOL': return arg['BOOL'];
    case 'NULL': return null;
    case 'L': return arg['L'].map(exports.value);
    case 'M': return exports.object(arg['M']);
    default: throw new Error('Unknown type: ' + Object.keys(arg)[0]);
  }
};
