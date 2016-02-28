$(function() {
  $('#compareForm').submit(startCompare);

  handleQueryStringParams();
});

function handleQueryStringParams() {
  var oldSpec = window.location.search.match(/oldSpecUrl=([^&]+)/);
  var newSpec = window.location.search.match(/newSpecUrl=([^&]+)/);

  if (oldSpec && oldSpec.length > 1) {
    $('#oldSpecUrl').val(decodeURIComponent(oldSpec[1]));
  }

  if (newSpec && newSpec.length > 1) {
    $('#newSpecUrl').val(decodeURIComponent(newSpec[1]));
  }

  startCompare();
}

function startCompare(e) {
  e && e.preventDefault();
  var oldSpec = $('#oldSpecUrl').val();
  var newSpec = $('#newSpecUrl').val();

  if (!oldSpec || !newSpec) return;

  try {
    setQueryStringParam([
      ['oldSpecUrl', oldSpec],
      ['newSpecUrl', newSpec]
    ]);
  } catch (e) {}

  SwaggerDiff(oldSpec, newSpec)
    .then(function (diff) {
      $('#diff-result-area').text(JSON.stringify(diff, null, 2));
    })
    .catch(function(err) {
      $('#diff-result-area').text(err.message);
    });
}

function setQueryStringParam(params) {
  var url = window.location.href;
  params.forEach(function (param, i) {
    url = url.replace(new RegExp(param[0] + '=[^&]+'), '');
    url += (!window.location.search && i === 0 ? '?' : '&') + param[0] + '=' + encodeURIComponent(param[1]);
  });
  history.pushState({}, '', url);
}
