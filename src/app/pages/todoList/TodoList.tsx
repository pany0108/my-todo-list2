import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { TodoItem } from '~/app/pages';
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
  /**
   * on Item Drag End
   */
  onDragEnd = (result:any) => {
    if (!result.destination) {
      return null;
    }

    const reorderItem = TodoListStore.reorderItem(
      result.source.index,
      result.destination.index,
    );

    return reorderItem;
  }

  /**
   * Drag Animation
   */
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
    const { todoItemList } = TodoListStore;

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
                    { todoItemList.length > 0 ? (

                      todoItemList.map((data: ItemType, index: number) => (
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
      </>
    );
  }
}

export default TodoList;
