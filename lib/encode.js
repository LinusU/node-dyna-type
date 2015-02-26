
function type(arg) {

  if (arg === null) {
    return 'NULL';
  }

  if (Array.isArray(arg)) {
    return 'L';
  }

  if (Buffer.isBuffer(arg)) {
    return 'B';
  }

  switch (typeof arg) {
    case 'object': return 'M';
    case 'string': return 'S';
    case 'number': return 'N';
    case 'boolean': return 'BOOL';
  }

  throw new Error('Unsuported type:' + (typeof arg));
}

exports.object = function (obj) {
  return Object.keys(obj).reduce(function (res, key) {
    if (obj[key] !== undefined) {
      res[key] = exports.value(obj[key]);
    }
    return res;
  }, {});
};

exports.objects = function (arr) {
  return arr.map(exports.object);
};

exports.value = function (arg) {
  switch (type(arg)) {
    case 'S': return { S: arg };
    case 'N': return { N: String(arg) };
    case 'B': return { B: arg };
    case 'BOOL': return { BOOL: arg };
    case 'NULL': return { NULL: true };
    case 'L': return { L: arg.map(exports.value) };
    case 'M': return { M: exports.object(arg) };
    default: throw new Error('Unknown type: ' + type(arg));
  }
};
