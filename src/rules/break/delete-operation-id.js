
export default function editOperationId({kind, path, lhs, rhs}) {
  if (kind === 'D' && path[0] === 'paths' && path[3] === 'operationId') {
    const pathId = path[1];
    return `${pathId}: operationId was deleted (previous: ${lhs})`;
  }
  return false;
}
