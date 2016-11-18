
export default function editDescription({ kind, path, lhs, rhs }) {
  const match = kind === 'N'
              && path.length >= 2
              && path[path.length - 1] === 'description';
  if (match) {
    const p = `/${path.slice(0, -1).join('/')}/`;
    return {
      message: `${p} - Description added: ${rhs}`,
      descriptionPath: p,
      description: rhs,
    };
  }
  return false;
}
