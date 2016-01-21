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

  $('.items').on('dblclick', '.item .text', function() {
    if($(this).closest('.text').hasClass('editing')) { return; }

    $(this).closest('.text').addClass('editing');
    $(this).find('.editable').focus();
    $(this).find('.editable').val($(this).find('.editable').val());
  });

  function onItemEdit() {
    $(this).closest('.text').find('.readonly').text($(this).val());
    $(this).closest('.text').removeClass('editing');
  }

  $('.items').on('keyup', '.item .editable', function() {
    if (event.which !== 13) { return; }

    onItemEdit.call(this);
  });

  $('.items').on('blur', '.item .editable', onItemEdit);

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
    if (countTodo() == 1) {
      $('.items-left').text('1 item left');
    } else {
      $('.items-left').text(countTodo() + ' items left');
    }

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
