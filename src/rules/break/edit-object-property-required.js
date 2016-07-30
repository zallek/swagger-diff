
export default function editObjectPropertyRequired({ kind, path, lhs, rhs }) {
  const match = (kind === 'N' || kind === 'E')
              && path.length >= 3
              && path[path.length - 3] === 'properties'
              && path[path.length - 1] === 'required'
              && rhs === true;
  if (match) {
    const objectPath = path.slice(0, -3).join('/');
    const propertyName = path[path.length - 2];
    return {
      message: `${objectPath} - Property ${propertyName} became required`,
      path: objectPath,
      property: propertyName,
    };
  }
  return false;
}
