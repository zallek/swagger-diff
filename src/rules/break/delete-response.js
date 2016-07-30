
export default function deleteResponse({ kind, path, lhs, rhs }) {
  const match = kind === 'D'
              && path.length === 5
              && path[0] === 'paths'
              && path[3] === 'responses';
  if (match) {
    const pathId = path[1];
    const method = path[2];
    const responseId = path[4];
    return {
      message: `${pathId} (${method}) - Response ${responseId} deleted`,
      path: pathId,
      reponseId: responseId,
      method,
    };
  }
  return false;
}
