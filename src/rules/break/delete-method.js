
export default function addMethod({ kind, path, lhs, rhs }) {
  const match = kind === 'D'
              && path.length === 3
              && path[0] === 'paths';
  if (match) {
    const pathId = path[1];
    const method = path[2];
    return {
      message: `${pathId} (${method}) - Method deleted`,
      path: pathId,
      method,
    };
  }
  return false;
}
