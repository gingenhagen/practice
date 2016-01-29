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
