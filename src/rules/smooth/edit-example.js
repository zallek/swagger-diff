
export default function editDescription({ kind, path, lhs, rhs }) {
  const match = 
    path[0] === 'paths' && 
    path[3] === 'responses' &&
    path[5] === 'examples'
  if (match) {
    const p = `/${path.slice(0, -1).join('/')}/`;

    const pathId = path[1];
    const method = path[2];
    const responseId = path[4];
    return {
      message: `${pathId} (${method}) - Response ${responseId} example changed`,
      path: pathId,
      method,
      responseId,
    };
  }
  return false;
}
