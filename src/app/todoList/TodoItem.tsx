import React, { Component } from 'react';
import { Checkbox, Button } from 'semantic-ui-react';

import './todoItem.css';

interface Props {
  index: number;
  title: string;
  checked: boolean;
  deleteItem: any;
}

interface State {
  itemChecked: boolean;
}

class TodoItem extends Component<Props> {
  state: State = {
    itemChecked: this.props.checked,
  };

  checkItem = () => {
    const { itemChecked } = this.state;

    console.log('Item checked');

    this.setState({ itemChecked: !itemChecked });
  };

  delete = () => {
    this.props.deleteItem(this.props.index);
  };

  render() {
    const { title } = this.props;
    const { itemChecked } = this.state;

    return (
      <>
        <div className={itemChecked ? 'todo-item checked' : 'todo-item'}>
          <Checkbox
            className="checkbox-item"
            label={title}
            checked={itemChecked ? true : false}
            onClick={this.checkItem}
          />
          <Button
            icon="close"
            basic
            circular
            compact
            onClick={this.delete}
          ></Button>
        </div>
      </>
    );
  }
}

export default TodoItem;
