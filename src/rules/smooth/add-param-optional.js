
export default function addParamOptional({kind, path, lhs, rhs}) {
  if (kind === 'N' && path[0] === 'paths' && path[3] === 'parameters' && path.length === 5 && !rhs.required) {
    const pathId = path[1];
    const method = path[2];
    const paramName = path[4];
    return `${pathId} (${method}) - Optional param ${paramName} added`;
  }
  return false;
}
