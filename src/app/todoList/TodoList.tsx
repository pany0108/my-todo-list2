import React, { Component } from 'react';
import { Container, Grid, Input, Segment } from 'semantic-ui-react';
import TodoItem from './TodoItem';

import './todo.css';

interface ItemType {
  index: number;
  title: string;
  checked: boolean;
}

interface State {
  itemList: Array<ItemType>;
  title: string;
}

class TodoList extends Component {
  state: State = {
    itemList: [
      { index: 1, title: '리액트 공부하기', checked: false },
      { index: 2, title: '복습하기', checked: false },
    ],
    title: '',
  };

  getCurrentDay = () => {
    var dateObj = new Date();

    const dayNames = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    var day = dayNames[dateObj.getDay() - 1];

    return day;
  };

  getCurrentDate = () => {
    var dateObj = new Date();
    var date = dateObj.getDate().toString();
    var value =
      date[date.length - 1] === '1'
        ? 'st'
        : date[date.length - 1] === '2'
        ? 'nd'
        : 'th';

    return date + value;
  };

  getCurrentMonth = () => {
    var dateObj = new Date();

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
    var month = monthNames[dateObj.getMonth()];

    return month;
  };

  addItem = () => {
    const { itemList, title } = this.state;

    // console.log('Item added');

    this.setState({
      itemList: itemList.concat({
        index:
          itemList.length > 0 ? itemList[itemList.length - 1].index + 1 : 1,
        title,
        checked: false,
      }),
      title: '',
    });
  };

  handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      this.addItem();
    }
  };

  deleteItem = (index: number) => {
    const { itemList } = this.state;

    console.log('Item deleted');

    this.setState({
      itemList: itemList.filter((item: ItemType) => item.index !== index),
    });
  };

  render() {
    const { itemList, title } = this.state;

    return (
      <>
        <Container>
          <Segment.Group raised>
            <Segment
              className="todolist-header"
              textAlign="center"
              size="massive"
              padded
            >
              <Grid>
                <Grid.Row>
                  <Grid.Column width={10} textAlign="left">
                    <div>
                      <div className="day">{this.getCurrentDay()}</div>
                      <div className="date">{this.getCurrentDate()}</div>
                    </div>
                    <div>
                      <div className="month">{this.getCurrentMonth()}</div>
                    </div>
                  </Grid.Column>
                  <Grid.Column floated="right" width={6} textAlign="right">
                    <div className="tasks">
                      <span className="task-cnt">{itemList.length}</span> Tasks
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            <Segment className="todolist-form">
              <Input
                fluid
                value={title}
                onChange={(e: any) => this.setState({ title: e.target.value })}
                onKeyPress={this.handleKeyPress}
                action={{
                  content: 'Add',
                  onClick: this.addItem,
                }}
                placeholder="뭐할까?"
              />
            </Segment>
            <Segment className="todolist">
              {itemList.length > 0 ? (
                itemList.map((data: ItemType) => (
                  <TodoItem
                    key={data.index}
                    index={data.index}
                    title={data.title}
                    checked={data.checked}
                    deleteItem={this.deleteItem}
                  />
                ))
              ) : (
                <div className="no-data">
                  <span>아직 할일을 등록하지 않았어요 ◡̈</span>
                </div>
              )}
            </Segment>
          </Segment.Group>
        </Container>
      </>
    );
  }
}

export default TodoList;
