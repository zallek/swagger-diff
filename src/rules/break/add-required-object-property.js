
export default function addRequiredObjectProperty({ kind, path, lhs, rhs }) {
  const match = kind === 'N'
              && path.length >= 3
              && path[path.length - 2] === 'properties'
              && rhs.required === true;
  if (match) {
    const objectPath = path.slice(0, -2).join('/');
    const propertyName = path[path.length - 1];
    return {
      message: `${objectPath} - Required property ${propertyName} added`,
      path: objectPath,
      property: propertyName,
    };
  }
  return false;
}
