
export default function addPath({ kind, path, lhs, rhs }) {
  const match = kind === 'N'
              && path.length === 2
              && path[0] === 'paths';
  if (match) {
    const pathId = path[1];
    return {
      message: `${pathId} - Added`,
      path: pathId,
    };
  }
  return false;
}
