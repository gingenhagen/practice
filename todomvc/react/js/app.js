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
      <input type='text' value={this.state.newItem} onKeyUp={this.handleKeyUp} onChange={this.handleChange}></input>
    );
  }
});

var Item = React.createClass({
  render: function() {
    return (
      <div className='item'>
        <input type='checkbox'></input>
        <span className='text'>{this.props.text}</span>
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

var Footer = React.createClass({
  render: function() {
    return (
      <div className='footer'>Footer</div>
    )
  }
});

var App = React.createClass({
  getInitialState: function() {
    return { items: [] };
  },
  handleNewItem:
  function(newItemText) {
    this.setState({items: this.state.items.concat({ text: newItemText })});
  },
  render: function() {
    return (
      <div>
        <h1>todo</h1>
        <Input onNewItem={this.handleNewItem} />
        <Items items={this.state.items} />
        <Footer items={this.state.items} />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
