
export default function editObjectPropertyType({ kind, path, lhs, rhs }) {
  const match = kind === 'E'
              && path.length >= 3
              && path[path.length - 3] === 'properties'
              && path[path.length - 1] === 'type';
  if (match) {
    const objectPath = path.slice(0, -3).join('/');
    const propertyName = path[path.length - 2];
    return {
      message: `${objectPath} - Property ${propertyName} type turn from ${lhs} to ${rhs}`,
      path: objectPath,
      Property: propertyName,
      previousType: lhs,
      currentType: rhs,
    };
  }
  return false;
}
