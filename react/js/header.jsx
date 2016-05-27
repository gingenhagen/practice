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
