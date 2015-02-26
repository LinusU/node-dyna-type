# dyna-type

Encodes and decodes the special format that DynamoDB uses to represent values.

## Installation

```sh
npm install --save dyna-type
```

## Usage

```javascript
var dynaType = require('dyna-type');

db.putItem({
  TableName: 'user',
  Item: dynaType.encodeObject({
    name: 'Linus',
    born: 1992
  });
}, cb);

db.getItem({
  TableName: 'user',
  Key: dynaType.encodeObject({
    born: 1992
  })
}, function (err, res) {
  if (err) { return cb(err); }

  cb(null, dynaType.decodeObject(res.Item));
});

db.query({
  TableName: 'user',
  KeyConditions: {
    name: {
      ComparisonOperator: 'EQ',
      AttributeValueList: [dynaType.encode('Linus')]
    }
  }
}, function (err, res) {
  if (err) { return cb(err); }

  cb(null, dynaType.decodeObjects(res.Items));
});
```

## API

### `decode(val)`

Decodes a value from DynamoDB type to Javascript type.

### `decodeObject(obj)`

Takes an object where all properties are in DynamoDB type and returns a new
object where all properties are Javascript type.

### `decodeObjects(arr)`

Takes an array with objects to decode. Returns a new array with all objects
decoded with `decodeObject(obj)`.

### `encode(val)`

Encodes a value from Javascript type to DynamoDB type.

### `encodeObject(obj)`

Takes an object where all properties are in Javascript type and returns a new
object where all properties are DynamoDB type.

### `encodeObjects(arr)`

Takes an array with objects to encode. Returns a new array with all objects
encoded with `encodeObject(obj)`.

## License

MIT
