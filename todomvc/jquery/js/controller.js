function TodoController(view) {

  this.view = view;

  this.$ctnItems = $('.items');
  this.$input = $('#input');
  this.$btnClearCompleted = $('#clear');
  this.$btnFilters = $('.filter');
}

TodoController.prototype.init = function(first_argument) {
  this.$input.on('keyup', this.inputKeyup.bind(this));
  this.$btnClearCompleted.on('click', this.clearCompleted.bind(this));
  this.$btnFilters.on('click', this.changeFilter.bind(this));

  this.$ctnItems.on('click',    '.item .toggle',   this.toggleCompleted.bind(this));
  this.$ctnItems.on('dblclick', '.item .text',     this.startEditingText.bind(this));
  this.$ctnItems.on('keyup',    '.item .editable', this.enterEditingText.bind(this));
  this.$ctnItems.on('blur',     '.item .editable', this.blurEditingText.bind(this));
  this.$ctnItems.on('click',    '.item .delete',   this.removeItem.bind(this));
};

TodoController.prototype.inputKeyup = function(event) {
  if (event.which !== 13) { return; }

  var target = $(event.target);

  this.view.addItem(target.val());
  target.val('');
};

TodoController.prototype.clearCompleted = function() {
  this.view.removeItemsCompleted();
};

TodoController.prototype.changeFilter = function(event) {
  var target = $(event.target);
  this.view.setFilter(target.val());
};

TodoController.prototype.toggleCompleted = function(event) {
  var target = $(event.target);
  this.view.setItemCompleted(target, target.prop('checked'));
};

TodoController.prototype.startEditingText = function(event) {
  var target = $(event.currentTarget);

  if (this.view.isEditing(target)) { return; }
  this.view.startEditing(target);
};

TodoController.prototype.enterEditingText = function(event) {
  if (event.which !== 13) { return; }

  var target = $(event.target);
  this.view.stopEditing(target);
};

TodoController.prototype.blurEditingText = function(event) {
  var target = $(event.target);
  this.view.stopEditing(target);
};

TodoController.prototype.removeItem = function(event) {
  var target = $(event.target);
  this.view.removeItem(target);
};
