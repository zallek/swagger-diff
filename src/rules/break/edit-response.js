
export default function editResponse({ kind, path, lhs, rhs }) {
  const match = kind === 'E'
              && path.length === 7
              && path[0] === 'paths'
              && path[3] === 'responses'
              && path[5] === 'schema'
              && path[6] === '$ref';
  if (match) {
    const pathId = path[1];
    const method = path[2];
    const responseId = path[4];
    return `${pathId} (${method}) - Response ${responseId} turned from ${lhs} to ${rhs}`;
  }
  return false;
}
