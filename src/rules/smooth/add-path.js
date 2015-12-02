
export default function addPath({kind, path, lhs, rhs}) {
  if (kind === 'N' && path[0] === 'paths' && path.length === 2) {
    const pathId = path[1];
    return `${pathId} - Added`;
  }
  return false;
}
