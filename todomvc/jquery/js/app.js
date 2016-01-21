$(function() {

  $('#app').hide().fadeIn();

  var itemTemplate = Handlebars.compile($("#item-template").html());

  $('#input').on('keyup', function(event) {
    if (event.which !== 13) { return; }

    var itemHTML = itemTemplate({
      value: $(this).val()
    });
    $('.items').append(itemHTML);
    updateFooter();

    $(this).val('');
  });

  $('.items').on('click', '.item .toggle', function() {
    if ($(this).prop('checked') === true) {
      $(this).closest('.item').addClass('completed').removeClass('todo');
    } else {
      $(this).closest('.item').removeClass('completed').addClass('todo');
    }
    updateTodo();
  });

  $('.items').on('click', '.item .delete', function(){
    removeItem(this);
  });

  $('#clear').on('click', function() {
    $('.item.completed').toArray().forEach(removeItem);
  });

  function removeItem(target) {
    $(target).closest('.item').remove();
    updateFooter();
  }

  function countTodo() {
    return $('.item.todo').length;
  }

  function updateTodo() {
    $('.items-left .count').text(countTodo());
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
    updateTodo();
  }

});
