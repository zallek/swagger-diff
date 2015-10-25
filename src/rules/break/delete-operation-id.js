

export default function editOperationId({kind, path, lhs, rhs}) {
  if (kind !== 'D' || path[0] !== 'path' || path[2] !== 'operationId') {
    return false;
  }
  const pathId = path[1];
  return `${pathId}: operationId was deleted (previous: ${lhs})`;
}
