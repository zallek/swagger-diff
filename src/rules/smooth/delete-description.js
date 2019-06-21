export default function deleteDescription({ kind, path, lhs, rhs }) {
  const match = kind === 'D' && path.length >= 2 && path[path.length - 1] === 'description';
  if (match) {
    const p = `/${path.slice(0, -1).join('/')}/`;
    return {
      message: `${p} - Description deleted: ${lhs}`,
      descriptionPath: p,
      description: lhs,
    };
  }
  return false;
}
