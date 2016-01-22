var Input = React.createClass({
  handleKeyUp: function(e) {
    if (e.key === 'Enter') {
      this.props.onNewItem(e.target.value.trim());
      e.target.value = '';
    }
  },
  render: function() {
    return (
      <input type='text' className='input' onKeyUp={this.handleKeyUp}></input>
    );
  }
});

var Item = React.createClass({
  getInitialState: function() {
    return { editing: false, editedText: this.props.text };
  },
  textClassName: function() {
    return 'text ' + (this.state.editing ? 'editing' : '');
  },
  handleChangeEditedText: function(e) {
    this.setState({ editedText: e.target.value })
  },
  handleDoubleClick: function() {
    if (!this.state.editing) {
      this.setState({editing: true});
      // can't set the focus here, since the redraw hasn't happened yet
      // need to wait till componentDidUpdate
    }
  },
  componentDidUpdate: function() {
    if (this.state.editing) {
      this.editableInput.value = this.editableInput.value;
      this.editableInput.focus();
    }
  },
  handleKeyUp: function(e) {
    if (e.key === 'Enter') {
      this.props.onEditItem({ id: this.props.id, text: e.target.value })
      this.setState({ editing: false });
    } else if (e.key === 'Escape') {
      this.setState({ editing: false });
      this.setState({ editedText: this.props.text });
    }
  },
  handleBlur: function(e) {
    this.props.onEditItem({ id: this.props.id, text: e.target.value })
    this.setState({editing: false});
  },
  handleRemoveItem: function() {
    this.props.onRemoveItem(this.props.id);
  },
  handleChangeCompleted: function(e) {
    this.props.onEditItem({ id: this.props.id, completed: e.target.checked })
  },
  render: function() {
    return (
      <div className='item'>
        <input type='checkbox' checked={this.props.completed} onChange={this.handleChangeCompleted}></input>
        <div className={this.textClassName()} onDoubleClick={this.handleDoubleClick}>
          <span className='readonly'>{this.props.text}</span>
          <input type='text'
            className='editable'
            value={this.state.editedText}
            onChange={this.handleChangeEditedText}
            ref={(ref) => this.editableInput = ref}
            onKeyUp={this.handleKeyUp}
            onBlur={this.handleBlur}
          ></input>
        </div>
        <button type='button' onClick={this.handleRemoveItem}>X</button>
      </div>
    );
  }
});

var Items = React.createClass({
  handleEditItem: function() {
    this.props.onEditItem.apply(this, arguments);
  },
  handleRemoveItem: function() {
    this.props.onRemoveItem.apply(this, arguments);
  },
  render: function() {
    var filter = this.props.filter;
    var items = this.props.items.filter(filter).map(function(item) {
      return (
        <Item key={item.id} id={item.id} text={item.text} completed={item.completed}
          onEditItem={this.handleEditItem}
          onRemoveItem={this.handleRemoveItem}
        />
      )
    }.bind(this));
    return (
      <div className='items'>
        {items}
      </div>
    );
  }
});

var ItemsLeft = React.createClass({
  itemsLeftText: function() {
    if (this.props.items.active().length === 1) {
      return '1 item left';
    } else {
      return this.props.items.active().length + " items left";
    }
  },
  render: function() {
    return (
      <span className='items-left'>{this.itemsLeftText()}</span>
    )
  }
});

var ItemsFilter = React.createClass({
  filterClass: function(forFilterType) {
    if (this.props.filter === forFilterType) {
      return 'filter active';
    } else {
      return 'filter';
    }
  },
  handleFilterAll: function() {
    this.props.onChangeFilter('all');
  },
  handleFilterActive: function() {
    this.props.onChangeFilter('active');
  },
  handleFilterCompleted: function() {
    this.props.onChangeFilter('completed');
  },
  render: function() {
    return (
      <div className='filters'>
        <button type='button'
          className={this.filterClass('all')}
          onClick={this.handleFilterAll}
        >All</button>
        <button type='button'
          className={this.filterClass('active')}
          onClick={this.handleFilterActive}
        >Active</button>
        <button type='button'
          className={this.filterClass('completed')}
          onClick={this.handleFilterCompleted}
        >Completed</button>
      </div>
    )
  }
});

var ClearCompleted = React.createClass({
  handleClick: function() {
    this.props.onClearCompleted();
  },
  render: function() {
    return this.props.items.completed().length > 0 ? (
      <button type='button' onClick={this.handleClick}>Clear completed</button>
    ) : null;
  }
});

var Footer = React.createClass({
  handleChangeFilter: function() {
    this.props.onChangeFilter.apply(this, arguments);
  },
  handleClearCompleted: function() {
    this.props.onClearCompleted.apply(this, arguments);
  },
  render: function() {
    return this.props.items.all().length > 0 ? (
      <div className='footer'>
        <ItemsLeft items={this.props.items} />
        <ItemsFilter filter={this.props.filter} onChangeFilter={this.handleChangeFilter} />
        <ClearCompleted items={this.props.items} onClearCompleted={this.handleClearCompleted} />
      </div>
    ) : null;
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      items: new TodoModel([]),
      filter: 'all'
    };
  },
  handleNewItem: function(text) {
    this.setState({ items: this.state.items.add(text) });
  },
  handleChangeFilter: function(filter) {
    this.setState({ filter: filter });
  },
  handleEditItem: function(item) {
    this.setState({ items: this.state.items.merge(item) });
  },
  handleRemoveItem: function(id) {
    this.setState({ items: this.state.items.remove(id) });
  },
  handleClearCompleted: function() {
    this.setState({ items: this.state.items.removeCompleted() });
  },
  render: function() {
    return (
      <div>
        <h1>todo</h1>
        <Input onNewItem={this.handleNewItem} />
        <Items items={this.state.items} filter={this.state.filter}
          onEditItem={this.handleEditItem}
          onRemoveItem={this.handleRemoveItem}
        />
        <Footer items={this.state.items} filter={this.state.filter}
          onChangeFilter={this.handleChangeFilter}
          onClearCompleted={this.handleClearCompleted}
        />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
