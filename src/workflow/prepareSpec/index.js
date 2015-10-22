import inline from './inline';


export function prepareSwaggerSpec(spec) {
  return inline(spec);
}
