function TodoModel(items) {
  this.items = items;
}

TodoModel.prototype.all = function() {
  return this.items;
};

TodoModel.prototype.active = function() {
  return this.items.filter(function(item) {
    return !item.completed;
  });
};

TodoModel.prototype.completed = function() {
  return this.items.filter(function(item) {
    return item.completed;
  });
};

TodoModel.prototype.filter = function(type) {
  if (type === 'active') {
    return this.active();
  } else if (type === 'completed') {
    return this.completed();
  } else {
    return this.all();
  }
};

TodoModel.prototype.add = function(text) {
  var newItem = {
    id: _.uniqueId(),
    text: text,
    completed: false
  };
  return new TodoModel(this.items.concat(newItem));
};

TodoModel.prototype.merge = function(item) {
  return new TodoModel(
    this.items.map(
      function(currentValue, index, array) {
        if (currentValue.id === item.id) {
          return _.merge({}, currentValue, item);
        } else {
          return currentValue;
        }
      }
    )
  );
};

TodoModel.prototype.remove = function(id) {
  return new TodoModel(
    this.items.filter(
      function(element, index, array) {
        return element.id !== id;
      }
    )
  );
};

TodoModel.prototype.removeCompleted = function() {
  return new TodoModel(
    this.items.filter(
      function(element, index, array) {
        return !element.completed;
      }
    )
  );
};

