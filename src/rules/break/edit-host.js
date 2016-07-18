
export default function editHost({ kind, path, lhs, rhs }) {
  const match = kind === 'E'
              && path.length === 1
              && path[0] === 'host';
  if (match) {
    return `Host turned from ${lhs} to ${rhs}`;
  }
  return false;
}
