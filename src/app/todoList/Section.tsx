import React, { Component } from 'react';
import {
  Header, Segment,
} from 'semantic-ui-react';
import { SectionList } from '~/app/todoList';
import '~/app/style/section.css';
import { SectionStore } from '~/app/service';

class Section extends Component {
  componentDidMount() {
    SectionStore.loadItem();

    // console.log('first rendered');
  }

  componentDidUpdate() {
    SectionStore.saveItem();

    // console.log('item updated');
  }

  render() {
    return (
      <>
        <Segment>
          <Header textAlign="center" inverted>
            Section
          </Header>
        </Segment>

        <SectionList />
      </>
    );
  }
}

export default Section;
