import SwaggerParser from 'swagger-parser';


export default function dereference(spec) {
  return SwaggerParser.dereference(spec, {
    $refs: {
      internal: true,
      external: false, // Do not resolve external references
      circular: false, // Disallow circular referenees
    },
  });
}
