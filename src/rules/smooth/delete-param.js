
export default function deleteParam({ kind, path, lhs, rhs }) {
  const match = kind === 'D'
              && path.length === 5
              && path[0] === 'paths'
              && path[3] === 'parameters';
  if (match) {
    const pathId = path[1];
    const method = path[2];
    const paramName = path[4];
    return {
      message: `${pathId} (${method}) - Param ${paramName} deleted`,
      path: pathId,
      method,
      param: paramName,
    };
  }
  return false;
}
