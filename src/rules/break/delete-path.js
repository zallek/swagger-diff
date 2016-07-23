
export default function deletePath({ kind, path, lhs, rhs }) {
  const match = kind === 'D'
              && path.length === 2
              && path[0] === 'paths';
  if (match) {
    const pathId = path[1];
    return {
      message: `${pathId} - Deleted`,
      path: pathId,
    };
  }
  return false;
}
