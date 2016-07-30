
export default function addOptionalObjectProperty({ kind, path, lhs, rhs }) {
  const match = kind === 'N'
              && path.length >= 3
              && path[path.length - 2] === 'properties'
              && !rhs.required;
  if (match) {
    const objectPath = path.slice(0, -2).join('/');
    const propertyName = path[path.length - 1];
    return {
      message: `${objectPath} - Optional property ${propertyName} added`,
      path: objectPath,
      property: propertyName,
    };
  }
  return false;
}
