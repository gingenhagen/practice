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
