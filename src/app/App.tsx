import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Todo } from '~/app/todoList';

class App extends Component {
  render() {
    return (
      <>
        <Todo />
      </>
    );
  }
}

export default App;
