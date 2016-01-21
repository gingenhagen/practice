function TodoView() {
  this.$items = $('.item');
  this.$itemTodo = $('.item.todo');
  this.$itemsCompleted = $('.item.completed');
  this.$itemsLeft = $('.items-left');
  this.$footer = $('.footer');
  this.$filterActive = $('.filter.active');
  this.$btnClear = $('.clear');
}

TodoView.prototype.init = function(first_argument) {

};

TodoView.prototype.removeItem = function(target) {
  $(target).closest('.item').remove();
  refreshDisplay();
};

TodoView.prototype.countTodo = function() {
  return this.$items.length;
};

TodoView.prototype.updateTodo = function() {
  if (countTodo() == 1) {
    this.$itemsLeft.text('1 item left');
  } else {
    this.$itemsLeft.text(countTodo() + ' items left');
  }
};

TodoView.prototype.countItems = function() {
  return this.$items.length;
};

TodoView.prototype.countCompleted = function() {
  return this.$itemsCompleted.length;
};

TodoView.prototype.updateFooter = function() {
  if (countItems() > 0) {
    this.$footer.removeClass('hidden');
  } else {
    this.$footer.addClass('hidden');
  }
  updateTodo();
  updateCompleted();
};

TodoView.prototype.updateItems = function() {
  var val = this.$filterActive.val();
  this.$items.removeClass('hidden');
  if (val === 'active') {
    this.$itemsCompleted.addClass('hidden');
  } else if (val === 'completed') {
    this.$itemsTodo.addClass('hidden');
  }
};

TodoView.prototype.updateCompleted = function() {
  if (countCompleted() > 0) {
    this.$btnClear.removeClass('hidden');
  } else {
    this.$btnClear.addClass('hidden');
  }
};

TodoView.prototype.refreshDisplay = function() {
  updateFooter();
  updateItems();
};
