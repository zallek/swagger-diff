import get from 'lodash.get';

export default function addResponse({kind, path, lhs, rhs}) {
  const match = kind === 'N'
              && path.length === 5
              && path[0] === 'paths'
              && path[3] === 'responses';
  if (match) {
    const pathId = path[1];
    const method = path[2];
    const responseId = path[4];
    const definition = get(rhs, ['schema', '$ref']);
    return `${pathId} (${method}) - Response ${responseId} added to ${definition || rhs}`;
  }
  return false;
}
