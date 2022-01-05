import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { TodoItem } from '.';
import { TodoListStore } from '~/app/service';

interface ItemType {
  index: number;
  title: string;
  checked: boolean;
}

@observer
class TodoList extends Component {
  onDragEnd = () => {
    console.log('drag ended');
  }

  render() {
    const { itemList } = TodoListStore;

    return (
      <>
        <Segment className="todolist">
          <Grid style={ { margin: 0 } }>
            { itemList.length > 0 ? (
              itemList.map((data: ItemType, index: number) => (
                <TodoItem key={ data.index } index={ index } />
              ))
            ) : (
              <div className="no-data">
                <span>아직 할일을 등록하지 않았어요 ◡̈</span>
              </div>
            ) }
          </Grid>
        </Segment>
      </>
    );
  }
}

export default TodoList;
