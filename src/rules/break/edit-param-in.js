
export default function editParamIn({ kind, path, lhs, rhs }) {
  const match = kind === 'E'
              && path.length === 6
              && path[0] === 'paths'
              && path[3] === 'parameters'
              && path[5] === 'in';
  if (match) {
    const pathId = path[1];
    const method = path[2];
    const paramName = path[4];
    return {
      message: `${pathId} (${method}) - Param ${paramName} in turn from ${lhs} to ${rhs}`,
      path: pathId,
      method,
      param: paramName,
      previousIn: lhs,
      currentIn: rhs,
    };
  }
  return false;
}
