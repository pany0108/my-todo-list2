import React, { Component } from 'react';
import {
  Header, Segment,
} from 'semantic-ui-react';
import { SectionList } from '~/app/pages';
import { SectionStore } from '~/app/service';
import '~/app/style/section.css';

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
        <Segment.Group>
          <Segment>
            <Header textAlign="center" inverted>
              Section
            </Header>
          </Segment>

          <SectionList />
        </Segment.Group>
      </>
    );
  }
}

export default Section;
