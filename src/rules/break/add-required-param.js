
export default function addRequiredParam({ kind, path, lhs, rhs }) {
  const match = kind === 'N'
              && path.length === 5
              && path[0] === 'paths'
              && path[3] === 'parameters'
              && rhs.required === true;
  if (match) {
    const pathId = path[1];
    const method = path[2];
    const paramName = path[4];
    return {
      message: `${pathId} (${method}) - Required param ${paramName} added`,
      path: pathId,
      method,
      paramAdded: paramName,
    };
  }
  return false;
}
