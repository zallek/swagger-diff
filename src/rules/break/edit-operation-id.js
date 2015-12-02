
export default function editOperationId({kind, path, lhs, rhs}) {
  if (kind === 'E' && path[0] === 'paths' && path[3] === 'operationId') {
    const pathId = path[1];
    return `${pathId}: operationId turned from ${lhs} to ${rhs}`;
  }
  return false;
}
