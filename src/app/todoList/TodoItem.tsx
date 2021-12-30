import React, { Component } from 'react';
import {
  Checkbox, Button, Input, Item,
} from 'semantic-ui-react';
import { observer } from 'mobx-react';
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
  private readonly moreRef: React.RefObject<any>;

  private readonly editRef: React.RefObject<any>;

  state: State = {
    isMoreBtnClicked: false,
    isEditBtnClicked: false,
  };

  constructor(props: Props) {
    super(props);

    this.moreRef = React.createRef();
    this.editRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.initMoreBtn);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.initMoreBtn);
  }

  checkItem = () => {
    const { index } = this.props;

    // console.log('Item checked');

    TodoListStore.checkItem(TodoListStore.itemList[index].index);
  };

  editItem = () => {
    this.setState({ isEditBtnClicked: false });

    // console.log('item edited');
  };

  handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      this.editItem();
    }
  };

  deleteItem = () => {
    const { index } = this.props;

    TodoListStore.deleteItem(TodoListStore.itemList[index].index);
  };

  initMoreBtn = (event: any) => {
    if (!this.moreRef.current.contains(event.target)) {
      this.setState({ isMoreBtnClicked: false });
    }
  };

  render() {
    const { index } = this.props;
    const { itemList } = TodoListStore;
    const { isMoreBtnClicked, isEditBtnClicked } = this.state;

    return (
      <>
        <div
          className={ `todo-item ${itemList[index].checked ? 'checked' : ''}` }
        >
          <Checkbox
            className={ `checkbox-item ${isEditBtnClicked ? 'hide' : ''}` }
            label={ itemList[index].title }
            checked={ itemList[index].checked }
            onClick={ this.checkItem }
          />

          <Input
            className={ `edit-input action ${isEditBtnClicked ? '' : 'hide'}` }
          >
            <input
              value={ itemList[index].title }
              onChange={ (e: any) => {
                itemList[index].title = e.target.value;
              } }
              onKeyPress={ this.handleKeyPress }
              ref={ this.editRef }
            />
            <Button icon="check" onClick={ this.editItem } />
          </Input>

          <Item.Meta>{ itemList[index].time }</Item.Meta>
          <div ref={ this.moreRef }>
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
                  this.editRef.current.focus();
                } }
              />
            </Button.Group>
          </div>
        </div>
      </>
    );
  }
}

export default TodoItem;
