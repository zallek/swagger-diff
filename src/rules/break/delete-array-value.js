
export default function deleteArrayValue({ kind, path, item }) {
  const match = kind === 'A'
              && path.length > 1
              && item
              && item.kind === 'D';
  if (match) {
    const pathId = path[1];
    const arrayType = path.slice(-1);
    const arrayName = path.slice(-2)[0];

    if (path[0] === 'paths' && path[3] === 'parameters') {
      const paramName = path[4];
      const method = path[2];

      return {
        path: pathId,
        message: `${pathId} (${method}) - param ${paramName} - ${arrayName}.${item.lhs} ${arrayType} value deleted`,
        method,
        param: paramName,
        arrayName,
        arrayValue: item.lhs,
      };
    } else if (path[0] === 'definitions' && path[2] === 'properties') {
      const objectPath = path.slice(0, -2).join('/');
      const propertyName = path[3];

      return {
        message: `${objectPath} - Object property - ${arrayName}.${item.lhs} ${arrayType} value deleted`,
        path: objectPath,
        property: propertyName,
        arrayName,
        arrayValue: item.lhs,
      };
    }

    return {
      message: `${arrayName}.${item.lhs} - ${arrayType} value deleted`,
      path: pathId,
      arrayName,
      arrayValue: item.lhs,
    };
  }
  return false;
}
