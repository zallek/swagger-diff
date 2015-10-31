import SwaggerParser from 'swagger-parser';


export default function dereference(spec) {
  return SwaggerParser.dereference(spec, {
    $refs: {
      internal: true,
      external: true,
      circular: false, // Disallow circular referenees
    },
  });
}
