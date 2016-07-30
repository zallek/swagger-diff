
export default function deleteProduce({ kind, path, index, item }) {
  const match = kind === 'A'
              && path.length === 4
              && path[0] === 'paths'
              && path[3] === 'produces'
              && item.kind === 'D';
  if (match) {
    const pathId = path[1];
    const method = path[2];
    return {
      message: `${pathId} (${method}) - Produces ${item.lhs} deleted`,
      path: pathId,
      method,
      produce: item.lhs,
    };
  }
  return false;
}
