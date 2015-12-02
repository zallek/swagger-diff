
export default function deletePath({kind, path, lhs, rhs}) {
  if (kind === 'D' && path[0] === 'paths' && path.length === 2) {
    const pathId = path[1];
    return `${pathId} - Deleted`;
  }
  return false;
}
