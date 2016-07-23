
export default function editBasePath({ kind, path, lhs, rhs }) {
  const match = kind === 'E'
              && path.length === 1
              && path[0] === 'basePath';
  if (match) {
    return {
      message: `Base path turned from ${lhs} to ${rhs}`,
      previousBasePath: lhs,
      currentBasePath: rhs,
    };
  }
  return false;
}
