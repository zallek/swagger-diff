
export default function editDescription({ kind, path, lhs, rhs }) {
  const match = kind === 'N'
              && path.length >= 4
              && path[path.length - 1] === 'description';
  if (match) {
    const pathId = path[1];
    const method = path[2];
    return {
      message: `${pathId} (${method}) - Description added: ${rhs}`,
      path: pathId,
      method,
      description: rhs,
    };
  }
  return false;
}
