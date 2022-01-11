import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import { Section, Todo } from '~/app/pages';

class App extends Component {
  render() {
    return (
      <>
        <Container>
          <Section />
          <Todo />
        </Container>
      </>
    );
  }
}

export default App;
