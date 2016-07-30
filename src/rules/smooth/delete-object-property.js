
export default function deleteObjectProperty({ kind, path, lhs, rhs }) {
  const match = kind === 'D'
              && path.length >= 3
              && path[path.length - 2] === 'properties';
  if (match) {
    const objectPath = path.slice(0, -2).join('/');
    const propertyName = path[path.length - 1];
    return {
      message: `${objectPath} - Property ${propertyName} deleted`,
      path: objectPath,
      property: propertyName,
    };
  }
  return false;
}
