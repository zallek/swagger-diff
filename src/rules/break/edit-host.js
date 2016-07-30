
export default function editHost({ kind, path, lhs, rhs }) {
  const match = kind === 'E'
              && path.length === 1
              && path[0] === 'host';
  if (match) {
    return {
      message: `Host turned from ${lhs} to ${rhs}`,
      previousHost: lhs,
      currentHost: rhs,
    };
  }
  return false;
}
