import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { TodoItem } from '~/app/todoList';
import { TodoListStore } from '~/app/service';
import '~/app/style/todolist.css';

interface ItemType {
  index: number;
  id: string;
  title: string;
  checked: boolean;
  date: any;
  time: any;
}

@observer
class TodoList extends Component {
  onDragEnd = (result:any) => {
    if (!result.destination) {
      return null;
    }

    const reorder = TodoListStore.reorder(
      result.source.index,
      result.destination.index,
    );

    return reorder;
  }

  getStyle=(style:any, snapshot:any) => {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      transitionDuration: '0.001s',
    };
  }

  render() {
    const { itemList } = TodoListStore;

    return (
      <>
        <DragDropContext onDragEnd={ this.onDragEnd }>
          <Segment className="todolist">
            <Droppable droppableId="droppable">
              { (provided) => (
                <div
                  ref={ provided.innerRef }
                  { ...provided.droppableProps }
                >
                  <Grid style={ { margin: 0 } }>
                    { itemList.length > 0 ? (

                      itemList.map((data: ItemType, index: number) => (
                        <Draggable key={ data.id } draggableId={ `item-${data.id}` } index={ index }>
                          { (provided2, snapshot) => (
                            <div
                              ref={ provided2.innerRef }
                              { ...provided2.draggableProps }
                              { ...provided2.dragHandleProps }
                              style={ this.getStyle(provided2.draggableProps.style, snapshot) }
                            >
                              <TodoItem key={ data.id } index={ index } />
                            </div>
                          ) }
                        </Draggable>
                      ))

                    ) : (
                      <div className="no-data">
                        <span>아직 할일을 등록하지 않았어요 ◡̈</span>
                      </div>
                    ) }
                    { provided.placeholder }
                  </Grid>
                </div>
              ) }
            </Droppable>
          </Segment>
        </DragDropContext>

        { /* <Segment className="todolist">
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
        </Segment> */ }
      </>
    );
  }
}

export default TodoList;
