$(function() {

  $('#app').hide().fadeIn();

  var view = new TodoView();
  var controller = new TodoController(view);
  controller.init();

});
