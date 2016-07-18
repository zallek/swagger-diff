
export default function addOptionalParam({ kind, path, lhs, rhs }) {
  const match = kind === 'N'
              && path.length === 5
              && path[0] === 'paths'
              && path[3] === 'parameters'
              && !rhs.required;
  if (match) {
    const pathId = path[1];
    const method = path[2];
    const paramName = path[4];
    return `${pathId} (${method}) - Optional param ${paramName} added`;
  }
  return false;
}
