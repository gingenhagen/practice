$(function() {

  $('#app').hide().fadeIn();

  var itemTemplate = Handlebars.compile($("#item-template").html());

  $('#input').on('keyup', function(event) {
    if (event.which !== 13) { return; }

    var itemHTML = itemTemplate({
      value: $(this).val()
    });
    $('.items').append(itemHTML);
    updateDisplay();

    $(this).val('');
  });

  $('.items').on('click', '.item .toggle', function() {
    if ($(this).prop('checked') === true) {
      $(this).closest('.item').addClass('completed').removeClass('todo');
    } else {
      $(this).closest('.item').removeClass('completed').addClass('todo');
    }
    updateCompleted();
  });

  function countCompleted() {
    return $('.item.todo').length;
  }

  function updateCompleted() {
    $('.items-left .count').text(countCompleted());
  }

  function countItems() {
    return $('.item').length;
  }

  function updateFooter() {
    if (countItems() > 0) {
      $('.footer').removeClass('hidden');
    } else {
      $('.footer').addClass('hidden');
    }
  }

  function updateDisplay() {
    updateCompleted();
    updateFooter();
  }

});
