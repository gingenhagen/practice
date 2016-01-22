var Input = React.createClass({
  handleKeyUp: function(e) {
    if (e.key === 'Enter') {
      this.props.onNewItem(e.target.value.trim());
      e.target.value = '';
    }
  },
  render: function() {
    return (
      <input type='text' className='input' onKeyUp={this.handleKeyUp} />
    );
  }
});

var Item = React.createClass({
  getInitialState: function() {
    return { editing: false, editedText: this.props.text };
  },
  handleDoubleClick: function() {
    if (!this.state.editing) {
      this.setState({ editing: true });
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
  handleChangeEditedText: function(e) {
    this.setState({ editedText: e.target.value })
  },
  handleKeyUp: function(e) {
    if (e.key === 'Enter') {
      this.props.onEditItem({ id: this.props.id, text: e.target.value })
      this.setState({ editing: false });
    } else if (e.key === 'Escape') {
      this.setState({ editedText: this.props.text });
      this.setState({ editing: false });
    }
  },
  handleBlur: function(e) {
    this.props.onEditItem({ id: this.props.id, text: e.target.value })
    this.setState({ editing: false });
  },
  handleRemoveItem: function() {
    this.props.onRemoveItem(this.props.id);
  },
  handleChangeCompleted: function(e) {
    this.props.onEditItem({ id: this.props.id, completed: e.target.checked });
  },
  render: function() {
    return (
      <div className='item'>
        <input type='checkbox' checked={this.props.completed} onChange={this.handleChangeCompleted} />
        <div className={classNames('text', {'editing': this.state.editing})} onDoubleClick={this.handleDoubleClick}>
          <span className='readonly'>{this.props.text}</span>
          <input type='text' className='editable' value={this.state.editedText}
            ref={(ref) => this.editableInput = ref}
            onChange={this.handleChangeEditedText}
            onKeyUp={this.handleKeyUp}
            onBlur={this.handleBlur} />
        </div>
        <button type='button' onClick={this.handleRemoveItem}>X</button>
      </div>
    );
  }
});

var Items = React.createClass({
  render: function() {
    var filter = this.props.filter;
    var items = this.props.items.filter(filter).map(function(item) {
      return (
        <Item {...this.props} key={item.id} id={item.id} text={item.text} completed={item.completed} />
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
    var count = this.props.items.active().length;
    return count === 1 ?  '1 item left' : (count + ' items left');
  },
  render: function() {
    return (
      <span className='items-left'>{this.itemsLeftText()}</span>
    )
  }
});

var Filter = React.createClass({
  handleChangeFilter: function() {
    this.props.onChangeFilter(this.props.filterType);
  },
  render: function() {
    return (
      <button type='button'
        className={classNames('filter', {'active': this.props.filter === this.props.filterType})}
        onClick={this.handleChangeFilter}
      >{_.capitalize(this.props.filterType)}</button>
    )
  }
});

var ItemsFilter = React.createClass({
  render: function() {
    return (
      <div className='filters'>
        <Filter {...this.props} filterType='all' />
        <Filter {...this.props} filterType='active' />
        <Filter {...this.props} filterType='completed' />
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
  render: function() {
    return this.props.items.all().length > 0 ? (
      <div className='footer'>
        <ItemsLeft {...this.props} />
        <ItemsFilter {...this.props} />
        <ClearCompleted {...this.props} />
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
