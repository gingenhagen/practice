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
