/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import {
  Container,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { TodoListStore } from '~/app/service';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import '~/app/style/todo.css';

interface ItemType {
  index: number;
  title: string;
  checked: boolean;
}

@observer
class TodoList extends Component {
  componentDidMount() {
    TodoListStore.loadItem();

    // console.log('first rendered');
  }

  componentDidUpdate() {
    TodoListStore.saveItem();

    // console.log('item updated');
  }

  getCurrentDay = () => {
    const dateObj = new Date();

    const dayNames = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    const day = dayNames[dateObj.getDay() - 1];

    return day;
  };

  getCurrentDate = () => {
    const dateObj = new Date();
    const date = dateObj.getDate().toString();
    const value = date[date.length - 1] === '1'
      ? 'st'
      : date[date.length - 1] === '2'
        ? 'nd'
        : 'th';

    return date + value;
  };

  getCurrentMonth = () => {
    const dateObj = new Date();

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = monthNames[dateObj.getMonth()];

    return month;
  };

  render() {
    const { itemList } = TodoListStore;

    return (
      <>
        <Container>
          <Segment.Group>
            <Segment className="todolist-header" padded>
              <Header textAlign="center" size="huge" inverted>
                Todo List
              </Header>
            </Segment>
            <Segment
              className="todolist-info"
              textAlign="center"
              size="massive"
              padded
            >
              <Grid>
                <Grid.Row>
                  <Grid.Column width={ 10 } textAlign="left">
                    <div>
                      <div className="day">{ this.getCurrentDay() }</div>
                      <div className="date">{ this.getCurrentDate() }</div>
                    </div>
                    <div>
                      <div className="month">{ this.getCurrentMonth() }</div>
                    </div>
                  </Grid.Column>
                  <Grid.Column floated="right" width={ 6 } textAlign="right">
                    <div className="tasks">
                      <span className="task-cnt">{ itemList.length }</span> Tasks
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            <TodoForm />
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
          </Segment.Group>
        </Container>
      </>
    );
  }
}

export default TodoList;
