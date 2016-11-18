
export default function addMethod({ kind, path, lhs, rhs }) {
  const match = kind === 'N'
              && path.length === 3
              && path[0] === 'paths';
  if (match) {
    const pathId = path[1];
    const method = path[2];
    return {
      message: `${pathId} (${method}) - Method added`,
      path: pathId,
      method,
    };
  }
  return false;
}
