
export default function editDescription({ kind, path, lhs, rhs }) {
  const match = kind === 'E'
              && path.length >= 2
              && path[path.length - 1] === 'description';
  if (match) {
    const p = `/${path.slice(0, -1).join('/')}/`;
    return {
      message: `${p} - Description turned from ${lhs} to ${rhs}`,
      descriptionPath: p,
      previousDescription: lhs,
      currentDescription: rhs,
    };
  }
  return false;
}
