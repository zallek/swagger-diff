import SwaggerParser from 'swagger-parser';


export default function dereference(spec) {
  return SwaggerParser.dereference(spec, {
    "$refs.internal": true,
    "$refs.external": false,
    "$refs.circular": "ignore",
  });
}
