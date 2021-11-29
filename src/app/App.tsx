import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import TodoList from './todoList/TodoList';

class App extends Component {
  render() {
    return (
      <>
        <TodoList />
      </>
    );
  }
}

export default App;
