function TodoView() {
  this.$footer = $('.footer');
  this.$btnClear = $('.clear');
}

TodoView.prototype.init = function(first_argument) {

};

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

TodoView.prototype.filterActive = function() {
  return $('.filter.active');
};

TodoView.prototype.removeItem = function(target) {
  $(target).closest('.item').remove();
  this.refreshDisplay();
};

TodoView.prototype.countTodo = function() {
  return this.itemsTodo().length;
};

TodoView.prototype.updateTodo = function() {
  if (this.countTodo() == 1) {
    this.itemsLeft().text('1 item left');
  } else {
    this.itemsLeft().text(this.countTodo() + ' items left');
  }
};

TodoView.prototype.countItems = function() {
  return this.items().length;
};

TodoView.prototype.countCompleted = function() {
  return this.itemsCompleted().length;
};

TodoView.prototype.updateFooter = function() {
  if (this.countItems() > 0) {
    this.$footer.removeClass('hidden');
  } else {
    this.$footer.addClass('hidden');
  }
  this.updateTodo();
  this.updateCompleted();
};

TodoView.prototype.updateItems = function() {
  var val = this.filterActive().val();
  this.items().removeClass('hidden');
  if (val === 'active') {
    this.itemsCompleted().addClass('hidden');
  } else if (val === 'completed') {
    this.itemsTodo().addClass('hidden');
  }
};

TodoView.prototype.updateCompleted = function() {
  if (this.countCompleted() > 0) {
    this.$btnClear.removeClass('hidden');
  } else {
    this.$btnClear.addClass('hidden');
  }
};

TodoView.prototype.refreshDisplay = function() {
  this.updateFooter();
  this.updateItems();
};
