import prepareSwaggerSpec from './prepareSwaggerSpec';


export function swaggerDiff(previousSpec, nextSpec) {
  const previousPrepared = prepareSwaggerSpec(previousSpec); // eslint-disable-line no-unused-vars
  const nextPrepared = prepareSwaggerSpec(nextSpec);         // eslint-disable-line no-unused-vars
}
