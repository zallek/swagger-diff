
export default function deleteOperationId({kind, path, lhs, rhs}) {
  if (kind === 'D' && path[0] === 'paths' && path[3] === 'operationId') {
    const pathId = path[1];
    const method = path[2];
    return `${pathId} (${method}) - OperationId (${lhs}) deleted`;
  }
  return false;
}
