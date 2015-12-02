
export default function addParamRequired({kind, path, lhs, rhs}) {
  const match = (kind === 'N' || kind === 'E')
              && path.length === 6
              && path[0] === 'paths'
              && path[3] === 'parameters'
              && path[5] === 'required'
              && rhs === true;
  if (match) {
    const pathId = path[1];
    const method = path[2];
    const paramName = path[4];
    return `${pathId} (${method}) - Param ${paramName} became required`;
  }
  return false;
}
