
export default function editArrayItemsType({ kind, path, lhs, rhs }) {
  const match = kind === 'E'
              && path.length >= 2
              && path[path.length - 2] === 'items'
              && path[path.length - 1] === 'type';
  if (match) {
    const arrayPath = path.slice(0, -2).join('/');
    return {
      message: `${arrayPath} - Array items type turn from ${lhs} to ${rhs}`,
      path: arrayPath,
      previousType: lhs,
      currentType: rhs,
    };
  }
  return false;
}
