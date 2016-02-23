$(function() {
  $('#compareForm').submit(handleFormSubmit);

  handleQueryStringParams();
});

function handleQueryStringParams() {
  var oldSpec = window.location.search.match(/oldSpecUrl=([^&]+)/);
  var newSpec = window.location.search.match(/newSpecUrl=([^&]+)/);

  if (oldSpec && oldSpec.length > 1) {
    $('#oldSwaggerSpec').val(decodeURIComponent(oldSpec[1]));
  }

  if (newSpec && newSpec.length > 1) {
    $('#newSwaggerSpec').val(decodeURIComponent(newSpec[1]));
  }

  if (oldSpec && newSpec) {
    handleFormSubmit();
  }
}

function handleFormSubmit(e) {
  e && e.preventDefault();
  var oldSpec = $('#oldSwaggerSpec').val();
  var newSpec = $('#newSwaggerSpec').val();

  if (!oldSpec || !newSpec) return;

  SwaggerDiff(oldSpec, newSpec)
    .then(function (diff) {
      $('#diff-result textarea').text(JSON.stringify(diff, null, 2));
    })
    .catch(function(err) {
      $('#diff-result textarea').text(err.message);
    });
}
