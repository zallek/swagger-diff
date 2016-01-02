
export default function editBasePath({kind, path, lhs, rhs}) {
  const match = kind === 'E'
              && path.length === 1
              && path[0] === 'basePath';
  if (match) {
    return `Base path turned from ${lhs} to ${rhs}`;
  }
  return false;
}
