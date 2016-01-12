
export default function deleteDefinition({kind, path, lhs, rhs}) {
  const match = kind === 'D'
              && path.length === 2
              && path[0] === 'definitions';
  if (match) {
    const pathId = path[1];
    return `${pathId} - Deleted`;
  }
  return false;
}
