import React, { Component } from 'react';
import {
  Segment, Grid, Input, Icon, Checkbox, Button,
} from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { TodoListStore } from '~/app/service';
import { ModalNoContents, ModalNoTime } from './modal';
import TimeSet from './TimeSet';
import '~/app/style/todoForm.css';

interface State {
  modalOpenNoContents: boolean;
  modalOpenSetTime: boolean;
}

@observer
class TodoForm extends Component {
  state:State = {
    modalOpenNoContents: false,
    modalOpenSetTime: false,
  }

  addItem = () => {
    const index = TodoListStore.itemList.length > 0 ? TodoListStore.itemList[TodoListStore.itemList.length - 1].index + 1 : 1;

    // 할일 X
    if (TodoListStore.title === '') {
      this.setState({ modalOpenNoContents: true });
    }
    // 할일 O , 시간 X
    if (TodoListStore.title !== '' && TodoListStore.time === '') {
      this.setState({ modalOpenSetTime: true });
    }
    // 할일 O, 시간 O
    if (TodoListStore.title !== '' && TodoListStore.time !== '') {
      TodoListStore.addItem(index);
      TodoListStore.title = '';
      TodoListStore.time = '';
      TodoListStore.allDay = false;
    }
    // 할일 O, 종일 O
    if (TodoListStore.title !== '' && TodoListStore.allDay) {
      this.setState({ modalOpenSetTime: false });
      TodoListStore.addItem(index);
      TodoListStore.title = '';
      TodoListStore.time = '';
      TodoListStore.allDay = false;
    }

    // console.log('Item added');
  };

  handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      this.addItem();
    }
  };

  resetInput = () => {
    TodoListStore.title = '';
  };

  render() {
    const { modalOpenNoContents, modalOpenSetTime } = this.state;
    const { title, allDay } = TodoListStore;

    return (
      <>
        <Segment className="todolist-form">
          <Grid>
            <Grid.Row>
              <Grid.Column width={ 16 }>
                <Input
                  fluid
                  value={ title }
                  onChange={ (e: any) => {
                    TodoListStore.title = e.target.value;
                  } }
                  onKeyPress={ this.handleKeyPress }
                  action={ {
                    className: TodoListStore.title === '' ? 'hide' : '',
                    content: <Icon name="delete" fitted />,
                    onClick: this.resetInput,
                  } }
                  placeholder="할 일을 입력해주세요"
                />
              </Grid.Column>

              <Grid.Column
                width={ 16 }
                style={ { display: 'flex', alignItems: 'center' } }
              >
                <TimeSet />
                <Checkbox
                  className="all-day"
                  label="종일"
                  checked={ allDay }
                  onChange={ (e: any) => {
                    TodoListStore.allDay = !e.target.previousSibling.checked;
                  } }
                  toggle
                />

                <Button
                  className="add-btn"
                  inverted
                  circular
                  onClick={ () => {
                    this.addItem();
                  } }
                  style={ { padding: '1.4rem 2rem', marginLeft: 'auto' } }
                >
                  <Icon name="add" /> ADD
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <ModalNoContents
          modalOpen={ modalOpenNoContents }
          handleClose={ () => {
            this.setState({ modalOpenNoContents: false });
          } }
        />
        <ModalNoTime
          modalOpen={ modalOpenSetTime }
          handleClose={ () => {
            this.setState({ modalOpenSetTime: false });
          } }
        />
      </>
    );
  }
}

export default TodoForm;
