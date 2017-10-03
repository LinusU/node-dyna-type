
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

  if (arg instanceof Set) {
    if (arg.size === 0) throw new Error("Can't determine type of set when set is empty");

    return Array.from(arg).reduce((res, value) => {
      var itemType = type(value);

      var setType;
      switch (itemType) {
        case 'S': setType = 'SS'; break;
        case 'N': setType = 'NS'; break;
        case 'B': setType = 'BS'; break;
        default: throw new Error('Unsuported set type:' + (typeof value));
      }

      if (res && res !== setType) throw new Error('Sets can not mix types');

      return setType;
    }, null);
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
    case 'SS': return { SS: Array.from(arg) };
    case 'N': return { N: String(arg) };
    case 'NS': return { NS: Array.from(arg).map(String) };
    case 'B': return { B: arg };
    case 'BS': return { BS: Array.from(arg) };
    case 'BOOL': return { BOOL: arg };
    case 'NULL': return { NULL: true };
    case 'L': return { L: arg.map(exports.value) };
    case 'M': return { M: exports.object(arg) };
    default: throw new Error('Unknown type: ' + type(arg));
  }
};
