var Input = React.createClass({
  getInitialState: function() {
    return { newItem: '' };
  },
  handleChange: function(e) {
    this.setState({ newItem: e.target.value });
  },
  handleKeyUp: function(e) {
    if (e.key === 'Enter') {
      this.props.onNewItem(this.state.newItem.trim());
      this.setState({ newItem: '' });
    }
  },
  render: function() {
    return (
      <input type='text' className='input' value={this.state.newItem} onKeyUp={this.handleKeyUp} onChange={this.handleChange}></input>
    );
  }
});

var Item = React.createClass({
  render: function() {
    return (
      <div className='item'>
        <input type='checkbox'></input>
        <div className='text'>
          <span className='readonly'>{this.props.text}</span>
          <input type='text' className='editable' value={this.props.text}></input>
        </div>
        <button type='button'>X</button>
      </div>
    );
  }
});

var Items = React.createClass({
  render: function() {
    var items = this.props.items.map(function(item) {
      return (
        <Item text={item.text} />
      )
    });
    return (
      <div className='items'>
        {items}
      </div>
    );
  }
});

var ItemsLeft = React.createClass({
  itemsLeftText: function() {
    if (this.props.items.length === 1) {
      return '1 item left';
    } else {
      return this.props.items.length + " items left";
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
        <button type='button' className={this.filterClass('all')} onClick={this.handleFilterAll}>All</button>
        <button type='button' className={this.filterClass('active')} onClick={this.handleFilterActive}>Active</button>
        <button type='button' className={this.filterClass('completed')} onClick={this.handleFilterCompleted}>Completed</button>
      </div>
    )
  }
});

var ClearCompleted = React.createClass({
  render: function() {
    return (
      <button type='button'>Clear completed</button>
    )
  }
});

var Footer = React.createClass({
  handleChangeFilter: function() {
    this.props.onChangeFilter.apply(this, arguments);
  },
  render: function() {
    return (
      <div className='footer'>
        <ItemsLeft items={this.props.items} />
        <ItemsFilter onChangeFilter={this.handleChangeFilter} filter={this.props.filter} />
        <ClearCompleted items={this.props.items} />
      </div>
    )
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      items: [],
      filter: 'all'
    };
  },
  handleNewItem: function(newItemText) {
    this.setState({items: this.state.items.concat({ text: newItemText })});
  },
  handleChangeFilter: function(filter) {
    this.setState({filter: filter});
  },
  render: function() {
    return (
      <div>
        <h1>todo</h1>
        <Input onNewItem={this.handleNewItem} />
        <Items items={this.state.items} />
        <Footer items={this.state.items} onChangeFilter={this.handleChangeFilter} filter={this.state.filter} />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
