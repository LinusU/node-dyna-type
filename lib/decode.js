
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
    case 'SS': return new Set(arg['SS']);
    case 'N': return Number(arg['N']);
    case 'NS': return new Set(arg['NS'].map(Number));
    case 'B': return arg['B'];
    case 'BS': return new Set(arg['BS']);
    case 'BOOL': return arg['BOOL'];
    case 'NULL': return null;
    case 'L': return arg['L'].map(exports.value);
    case 'M': return exports.object(arg['M']);
    default: throw new Error('Unknown type: ' + Object.keys(arg)[0]);
  }
};
