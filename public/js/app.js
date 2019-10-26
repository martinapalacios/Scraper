$(document).ready(function () {
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();

  $(document).on('click', '.scrape-btn', function () {
    $('#modal-count').modal('open');
  });
});

$(document).on('click', '.add-article', function () {
  var title = $(this).data('title');
  var excerpt = $(this).data('excerpt');
  var image = $(this).data('image');
  var link = $(this).data('link');

  $.ajax({
    method: 'POST',
    url: '/articles/add/',
    data: {
      title: title,
      excerpt: excerpt,
      image: image,
      link: link
    }
  }).done(function (data) {
    console.log(data);
  });
});

$(document).on('click', '.add-note', function () {
  var id = $(this).data('id');

  $.ajax({
    method: 'POST',
    url: '/articles/add-note/' + id,
    data: {
      body: $('#textarea-' + id).val()
    }
  }).done(function (data) {
    console.log(data);
    $('#textarea-' + id).val('');

    window.location.replace('/articles');
  });
});
