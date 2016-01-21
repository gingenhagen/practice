var items = [
  {text: 'asdf'},
  {text: 'qwer'}
];

var Input = React.createClass({
  render: function() {
    return (
      <input type='text'></input>
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
  render: function() {
    return (
      <div>
        <h1>todo</h1>
        <Input />
        <Items items={this.props.items} />
        <Footer items={this.props.items} />
      </div>
    );
  }
});

ReactDOM.render(
  <App items={items} />,
  document.getElementById('app')
);
