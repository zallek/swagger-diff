
export default function editOperationId({ kind, path, lhs, rhs }) {
  const match = kind === 'E'
              && path.length === 4
              && path[0] === 'paths'
              && path[3] === 'operationId';
  if (match) {
    const pathId = path[1];
    const method = path[2];
    return {
      message: `${pathId} (${method}) - OperationId turned from ${lhs} to ${rhs}`,
      path: pathId,
      method,
      previousOperationId: lhs,
      currentOperationId: rhs,
    };
  }
  return false;
}
