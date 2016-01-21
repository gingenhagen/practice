function TodoView() {
  this.$ctnItems = $('.items');
  this.$footer = $('.footer');
  this.$btnClear = $('.clear');
  this.itemTemplate = Handlebars.compile($("#item-template").html());
}

TodoView.prototype.items = function() {
  return $('.item');
};

TodoView.prototype.itemsTodo = function() {
  return $('.item.todo');
};

TodoView.prototype.itemsCompleted = function() {
  return $('.item.completed');
};

TodoView.prototype.itemsLeft = function() {
  return $('.items-left');
};

// functions to modify the item list

TodoView.prototype.addItem = function(value) {
  var itemHTML = this.itemTemplate({value: value});
  this.$ctnItems.append(itemHTML);
  this.refreshDisplay();
};

TodoView.prototype.removeItem = function(target) {
  $(target).closest('.item').remove();
  this.refreshDisplay();
};

TodoView.prototype.setItemCompleted = function(_item, isCompleted) {
  var item = _item.closest('.item');

  if (isCompleted) {
    item.addClass('completed').removeClass('todo');
  } else {
    item.removeClass('completed').addClass('todo');
  }
  this.refreshDisplay();
};

TodoView.prototype.removeItemsCompleted = function() {
  this.itemsCompleted().toArray().forEach(this.removeItem.bind(this));
};

TodoView.prototype.isEditing = function(item) {
  var text = item.closest('.text');
  return text.hasClass('editing');
};

TodoView.prototype.startEditing = function(item) {
  var text = item.closest('.text');
  var editable = text.find('.editable');

  text.addClass('editing');
  editable.focus();
  editable.val(editable.val());
};

TodoView.prototype.stopEditing = function(item) {
  var text = item.closest('.text');
  var readonly = text.find('.readonly');
  var editable = text.find('.editable');

  readonly.text(editable.val());
  text.removeClass('editing');
};

TodoView.prototype.setFilter = function(type) {
  $('.filter').removeClass('active');
  $(".filter[value='" + type + "']").addClass('active');
  this.refreshDisplay();
};

// functions to update the display

TodoView.prototype.countItems = function() {
  return this.items().length;
};

TodoView.prototype.countItemsCompleted = function() {
  return this.itemsCompleted().length;
};

TodoView.prototype.countItemsTodo = function() {
  return this.itemsTodo().length;
};

TodoView.prototype.updateTodo = function() {
  if (this.countItemsTodo() == 1) {
    this.itemsLeft().text('1 item left');
  } else {
    this.itemsLeft().text(this.countItemsTodo() + ' items left');
  }
};

TodoView.prototype.updateItems = function() {
  var val = $('.filter.active').val();
  this.items().removeClass('hidden');
  if (val === 'active') {
    this.itemsCompleted().addClass('hidden');
  } else if (val === 'completed') {
    this.itemsTodo().addClass('hidden');
  }
};

TodoView.prototype.updateCompleted = function() {
  if (this.countItemsCompleted() > 0) {
    this.$btnClear.removeClass('hidden');
  } else {
    this.$btnClear.addClass('hidden');
  }
};

TodoView.prototype.updateFooter = function() {
  if (this.countItems() > 0) {
    this.$footer.removeClass('hidden');
  } else {
    this.$footer.addClass('hidden');
  }
};

TodoView.prototype.refreshDisplay = function() {
  this.updateItems();
  this.updateTodo();
  this.updateCompleted();
  this.updateFooter();
};
