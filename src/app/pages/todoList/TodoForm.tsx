import React, { Component } from 'react';
import {
  Segment, Grid, Input, Icon, Checkbox, Button,
} from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { TodoListStore } from '~/app/service';
import {
  NativePicker, ModalNoTime, ModalNoContents, ModalNoDate,
} from '~/app/pages';
import '~/app/style/todoForm.css';

interface Props{}

interface State {
  modalOpenNoContents: boolean;
  modalOpenSetDate: boolean;
  modalOpenSetTime: boolean;
}

@observer
class TodoForm extends Component<Props> {
  private readonly todoInputRef: React.RefObject<any>;

  state:State = {
    modalOpenNoContents: false,
    modalOpenSetDate: false,
    modalOpenSetTime: false,
  }

  constructor(props: Props) {
    super(props);

    this.todoInputRef = React.createRef();
  }

  /**
   * Add Item to the List
   */
  addItem = () => {
    const index = TodoListStore.todoItemList.length > 0 ? TodoListStore.todoItemList[TodoListStore.todoItemList.length - 1].index + 1 : 1;

    // 할일 X
    if (TodoListStore.title === '') {
      this.setState({ modalOpenNoContents: true });
    }
    // 할일 O , 날짜 X
    if (TodoListStore.title !== '' && TodoListStore.date === '') {
      this.setState({ modalOpenSetDate: true });
    }
    // 할일 O, 날짜 O, 종일 X, 시간 X
    if (TodoListStore.title !== '' && TodoListStore.date !== '' && !TodoListStore.allDay && TodoListStore.time === '') {
      this.setState({ modalOpenSetTime: true });
    }
    // 할일 O, 날짜 O, 종일 O
    if (TodoListStore.title !== '' && TodoListStore.date !== '' && TodoListStore.allDay) {
      TodoListStore.addItem(index);
      TodoListStore.initItem();
    }
    // 할일 O, 날짜 O, 시간 O
    if (TodoListStore.title !== '' && TodoListStore.date !== '' && TodoListStore.time !== '') {
      TodoListStore.addItem(index);
      TodoListStore.initItem();
    }

    // console.log('Item added');
  };

  /**
   * Add Item to the List: Key=Enter
   */
  handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      this.addItem();
    }
  };

  /**
   * Reset Title Input
   */
  resetInput = () => {
    TodoListStore.title = '';
  };

  render() {
    const { modalOpenNoContents, modalOpenSetDate, modalOpenSetTime } = this.state;
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
                  ref={ this.todoInputRef }
                />
              </Grid.Column>

              <Grid.Column
                width={ 16 }
                style={ { display: 'flex', alignItems: 'center' } }
              >
                <NativePicker />
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
                  className="btn-orange"
                  inverted
                  circular
                  onClick={ () => {
                    this.addItem();
                    this.todoInputRef.current.focus();
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
        <ModalNoDate
          modalOpen={ modalOpenSetDate }
          handleClose={ () => {
            this.setState({ modalOpenSetDate: false });
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
