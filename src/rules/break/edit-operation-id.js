

export default function editOperationId({kind, path, lhs, rhs}) {
  if (kind !== 'E' || path[0] !== 'path' || path[2] !== 'operationId') {
    return false;
  }
  const pathId = path[1];
  return `${pathId}: operationId turned from ${lhs} to ${rhs}`;
}
