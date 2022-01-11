import React, { Component } from 'react';
import {
  Checkbox, Button, Input, Item, Grid,
} from 'semantic-ui-react';
import {
  DesktopDatePicker, LocalizationProvider, TimePicker,
} from '@mui/lab';
import { TextField } from '@mui/material';
import moment from 'moment';
import { observer } from 'mobx-react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TodoListStore } from '~/app/service';
import '~/app/style/todoItem.css';

interface Props {
  index: number;
}

interface State {
  isMoreBtnClicked: boolean;
  isEditBtnClicked: boolean;
}

@observer
class TodoItem extends Component<Props> {
  private readonly moreBtnRef: React.RefObject<any>;

  private readonly editInputRef: React.RefObject<any>;

  state: State = {
    isMoreBtnClicked: false,
    isEditBtnClicked: false,
  };

  constructor(props: Props) {
    super(props);

    this.moreBtnRef = React.createRef();
    this.editInputRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.initMoreBtn);
  }

  componentDidUpdate() {
    TodoListStore.saveItem();

    // console.log('item updated');
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.initMoreBtn);
  }

  /**
   * Item Check
   */
  checkItem = () => {
    const { index } = this.props;

    TodoListStore.checkItem(index);

    // console.log('Item checked');
  };

  /**
   * Item Edit
   */
  editItem = () => {
    this.setState({ isEditBtnClicked: false });

    // console.log('item edited');
  };

  /**
   * Item Edit: Key = Enter
   */
  handleEditKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      this.editItem();
    }
  };

  /**
   * Item Delete
   */
  deleteItem = () => {
    const { index } = this.props;

    TodoListStore.deleteItem(TodoListStore.todoItemList[index].index);
  };

  /**
   * Initialize More Button
   */
  initMoreBtn = (event: any) => {
    if (!this.moreBtnRef.current.contains(event.target)) {
      this.setState({ isMoreBtnClicked: false });
    }
  };

  render() {
    const { index } = this.props;
    const { todoItemList } = TodoListStore;
    const {
      isMoreBtnClicked, isEditBtnClicked,
    } = this.state;

    return (
      <>
        <Grid.Row className={ `todo-item ${todoItemList[index].checked ? 'checked' : ''}` }>
          <Input
            className={ `edit-input title action ${isEditBtnClicked ? '' : 'hide'}` }
          >
            <input
              value={ todoItemList[index].title }
              onChange={ (e: any) => {
                todoItemList[index].title = e.target.value;
              } }
              onKeyPress={ this.handleEditKeyPress }
              ref={ this.editInputRef }
            />
          </Input>

          <div>
            <Grid.Column width={ 16 }>
              <Checkbox
                className={ `checkbox-item ${isEditBtnClicked ? 'hide' : ''}` }
                label={ todoItemList[index].title }
                checked={ todoItemList[index].checked }
                onClick={ this.checkItem }
              />

              <Grid.Column style={ { margin: '-0.2rem 1rem -0.2rem auto' } }>
                <Item.Meta className="remaining-days">
                  { /* { todoItemList[index].date } */ }
                  { TodoListStore.remainingDays(index) }
                </Item.Meta>

                { todoItemList[index].time === '' ? ''
                  : (
                    <Item.Meta>
                      { moment(todoItemList[index].time).format('hh:mm a') }
                    </Item.Meta>
                  ) }

              </Grid.Column>

              <div ref={ this.moreBtnRef }>
                <Button.Group>
                  <Button
                    className="more-btn"
                    icon="ellipsis horizontal"
                    compact
                    onClick={ () => {
                      this.setState({ isMoreBtnClicked: !isMoreBtnClicked });
                    } }
                  />

                  <Button
                    className={ `del-btn ${isMoreBtnClicked ? 'shown' : ''}` }
                    icon="trash alternate outline"
                    compact
                    onClick={ this.deleteItem }
                  />
                  <Button
                    className={ `edit-btn ${isMoreBtnClicked ? 'shown' : ''}` }
                    icon="edit"
                    compact
                    onClick={ () => {
                      this.setState({
                        isEditBtnClicked: true,
                        isMoreBtnClicked: !isMoreBtnClicked,
                      });
                      this.editInputRef.current.focus();
                    } }
                  />
                </Button.Group>
              </div>
            </Grid.Column>

            { isEditBtnClicked
              ? (
                <Grid.Column width={ 16 }>
                  <div className="edit-input-wrapper">
                    <LocalizationProvider dateAdapter={ AdapterDateFns }>
                      <div className="edit-input">
                        <DesktopDatePicker
                          inputFormat="MM/dd/yyyy"
                          value={ todoItemList[index].date }
                          allowSameDateSelection
                          onChange={ (newDateValue: any) => {
                            todoItemList[index].date = moment(newDateValue).format('MM/DD/yyyy');
                          } }
                          PopperProps={ { placement: 'bottom' } }
                          renderInput={ (params: any) => (
                            <TextField
                              { ...params }
                              style={ { width: '150px' } }
                            />
                          ) }
                        />
                      </div>
                      { todoItemList[index].time === '' ? ''
                        : (
                          <div className="edit-input">
                            <TimePicker
                              value={ todoItemList[index].time }
                              onChange={ (newTimeValue: any) => {
                                todoItemList[index].time = moment(newTimeValue).toLocaleString();
                              } }
                              renderInput={ (params: any) => (
                                <TextField
                                  { ...params }
                                  style={ { width: '130px' } }
                                />
                              ) }
                            />
                          </div>
                        ) }
                    </LocalizationProvider>
                  </div>

                  <Button
                    className="btn-orange btn-edit"
                    inverted
                    circular
                    onClick={ this.editItem }
                    style={ { padding: '0.7rem 3.2rem ', marginLeft: 'auto' } }
                  >Edit
                  </Button>
                </Grid.Column>
              )
              : '' }
          </div>
        </Grid.Row>
      </>
    );
  }
}

export default TodoItem;
