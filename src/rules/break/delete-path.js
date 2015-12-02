
export default function deletePath({kind, path, lhs, rhs}) {
  const match = kind === 'D'
              && path.length === 2
              && path[0] === 'paths';
  if (match) {
    const pathId = path[1];
    return `${pathId} - Deleted`;
  }
  return false;
}
