
export default function editSummary({ kind, path, lhs, rhs }) {
  const match = kind === 'E'
              && path.length === 4
              && path[0] === 'paths'
              && path[3] === 'summary';
  if (match) {
    const pathId = path[1];
    const method = path[2];
    return `${pathId} (${method}) - Summary turned from ${lhs} to ${rhs}`;
  }
  return false;
}
