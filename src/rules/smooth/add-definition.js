
export default function addDefinition({ kind, path, lhs, rhs }) {
  const match = kind === 'N'
              && path.length === 2
              && path[0] === 'definitions';
  if (match) {
    const pathId = path[1];
    return {
      message: `${pathId} - Added`,
      path: pathId,
    };
  }
  return false;
}
