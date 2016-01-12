
export default function addObjectPropertyOptional({kind, path, lhs, rhs}) {
  const match = kind === 'N'
              && path.length >= 3
              && path[path.length - 2] === 'properties';
  if (match) {
    const objectPath = path.slice(0, -2).join(' ');
    const propertyName = path[path.length - 1];
    return `${objectPath} - Property ${propertyName} added`;
  }
  return false;
}
