function TodoController(view) {

  this.view = view;

  this.$ctnItems = $('.items');
  this.$input = $('#input');
  this.$btnClearCompleted = $('#clear');
  this.$btnFilters = $('.filter');

  this.itemTemplate = Handlebars.compile($("#item-template").html());
}

TodoController.prototype.init = function(first_argument) {
  this.$input.on('keyup', this.inputKeyup.bind(this));
  this.$ctnItems.on('click', '.item .toggle', this.toggleCompleted.bind(this));
  this.$ctnItems.on('dblclick', '.item .text', this.startEditingText.bind(this));
  this.$ctnItems.on('keyup', '.item .editable', this.enterEditingText.bind(this));
  this.$ctnItems.on('blur', '.item .editable', this.blurEditingText.bind(this));
  this.$ctnItems.on('click', '.item .delete', this.removeItem.bind(this));
  this.$btnClearCompleted.on('click', this.clearCompleted.bind(this));
  this.$btnFilters.on('click', this.changeFilter.bind(this));
};

TodoController.prototype.itemsCompleted = function() {
  return $('.item.completed');
};

TodoController.prototype.inputKeyup = function(event) {
  if (event.which !== 13) { return; }

  var target = $(event.target);

  var itemHTML = this.itemTemplate({
    value: target.val()
  });
  this.$ctnItems.append(itemHTML);
  this.view.refreshDisplay();

  target.val('');
};

TodoController.prototype.toggleCompleted = function(event) {
  var target = $(event.target);

  if (target.prop('checked') === true) {
    target.closest('.item').addClass('completed').removeClass('todo');
  } else {
    target.closest('.item').removeClass('completed').addClass('todo');
  }
  this.view.refreshDisplay();
};

TodoController.prototype.startEditingText = function(event) {
  var target = $(event.currentTarget);
  if(target.closest('.text').hasClass('editing')) { return; }

  target.closest('.text').addClass('editing');
  target.find('.editable').focus();
  target.find('.editable').val(target.find('.editable').val());
};

TodoController.prototype.enterEditingText = function(event) {
  if (event.which !== 13) { return; }

  var target = $(event.target);
  this.onItemEdit(target);
};

TodoController.prototype.blurEditingText = function(event) {
  var target = $(event.target);
  this.onItemEdit(target);
};

TodoController.prototype.onItemEdit = function(target) {
  target.closest('.text').find('.readonly').text(target.val());
  target.closest('.text').removeClass('editing');
};

TodoController.prototype.removeItem = function(event) {
  var target = $(event.target);
  this.view.removeItem(target);
};

TodoController.prototype.clearCompleted = function() {
  this.itemsCompleted().toArray().forEach(this.view.removeItem.bind(this.view));
};

TodoController.prototype.changeFilter = function(event) {
  var target = $(event.target);

  $('.filter').removeClass('active');
  target.addClass('active');

  this.view.refreshDisplay();
};
