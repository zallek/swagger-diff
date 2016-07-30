
export default function editParamType({ kind, path, lhs, rhs }) {
  const match = kind === 'E'
              && path.length === 6
              && path[0] === 'paths'
              && path[3] === 'parameters'
              && path[5] === 'type';
  if (match) {
    const pathId = path[1];
    const method = path[2];
    const paramName = path[4];
    return {
      message: `${pathId} (${method}) - Param ${paramName} type turn from from ${lhs} to ${rhs}`,
      path: pathId,
      method,
      param: paramName,
      previousType: lhs,
      currentType: rhs,
    };
  }
  return false;
}
