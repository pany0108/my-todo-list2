/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import {
  Container,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';
import { observer } from 'mobx-react';
import moment from 'moment';
import { TodoListStore } from '~/app/service';
import { TodoForm, TodoList } from '~/app/todoList';
import '~/app/style/todo.css';

@observer
class Todo extends Component {
  componentDidMount() {
    TodoListStore.loadItem();

    // console.log('first rendered');
  }

  componentDidUpdate() {
    TodoListStore.saveItem();

    // console.log('item updated');
  }

  /**
   * Get Day Names
   * (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday)
   */
  getCurrentDay = () => {
    const dateObj = moment();

    const dayNames = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    const day = dayNames[dateObj.day() - 1];

    return day;
  };

  /**
   * Get Current Date
   */
  getCurrentDate = () => {
    const dateObj = moment();
    const date = dateObj.date().toString();
    const value = date[date.length - 1] === '1'
      ? 'st'
      : date[date.length - 1] === '2'
        ? 'nd'
        : 'th';

    return date + value;
  };

  /**
   * Get Current Month
   * ( January, February, March, April, May, June, July, August, September, October, November, December)
   */
  getCurrentMonth = () => {
    const dateObj = moment();

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
    const month = monthNames[dateObj.month()];

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
            <TodoList />
          </Segment.Group>
        </Container>
      </>
    );
  }
}

export default Todo;
