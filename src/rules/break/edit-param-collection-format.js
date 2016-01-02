
export default function editParamCollectionFormat({kind, path, lhs, rhs}) {
  const match = (kind === 'N' || kind === 'E')
              && path.length === 6
              && path[0] === 'paths'
              && path[3] === 'parameters'
              && path[5] === 'collectionFormat';
  if (match) {
    const pathId = path[1];
    const method = path[2];
    const paramName = path[4];
    return `${pathId} (${method}) - Param ${paramName} collection format turn from ${lhs || '(none)'} to ${rhs || '(none)'}`;
  }
  return false;
}
