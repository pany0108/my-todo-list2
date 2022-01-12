/* eslint-disable no-nested-ternary */
import { action, observable } from 'mobx';
import moment from 'moment';

interface ItemType {
  index: number;
  id: string;
  title: string;
  checked: boolean;
  date: any;
  time: any;
}

class TodoListStore {
  @observable
  todoItemList: Array<ItemType>;

  @observable
  title: string;

  @observable
  checked: boolean;

  @observable
  date: any;

  @observable
  time: any;

  @observable
  allDay: boolean;

  constructor() {
    this.todoItemList = [
      // {
      //   index: 0,
      //   title: '리액트 공부하기',
      //   checked: false,
      //   time: '',
      // },
      // {
      //   index: 1,
      //   title: '리액트 복습하기',
      //   checked: false,
      //   time: '6:00 pm',
      // },
    ];
    this.title = '';
    this.checked = false;
    this.date = moment().format('MM/DD/yyyy');
    this.time = moment().toLocaleString();
    this.allDay = true;
  }

  @action
  initItem = () => {
    this.title = '';
    this.date = moment().format('MM/DD/yyyy');
    this.time = moment().toLocaleString();
    this.allDay = true;
  };

  @action
  loadItem = () => {
    const todoItemList = window.localStorage.getItem('TodoItemList');

    if (todoItemList !== null) {
      this.todoItemList = JSON.parse(todoItemList!);
    }
  };

  @action
  saveItem = () => {
    const { todoItemList } = this;

    window.localStorage.setItem('TodoItemList', JSON.stringify(todoItemList));
  };

  @action
  addItem = (index: number) => {
    const result = this.todoItemList.concat({
      index,
      id: index.toString(),
      title: this.title,
      checked: false,
      date: this.date,
      time: this.allDay ? '' : this.time,
    });

    this.todoItemList = result;
  };

  @action
  deleteItem = (index: number) => {
    const result = this.todoItemList.filter((item: any) => item.index !== index);

    this.todoItemList = result;
  };

  @action
  checkItem = (index: number) => {
    this.todoItemList[index].checked = !this.todoItemList[index].checked;
  };

  @action
  getToday = (newDateValue: any) => {
    this.date = moment(newDateValue).format('MM/DD/yyyy');
  };

  @action
  getTime = (newTimeValue: any) => {
    this.time = moment(newTimeValue).toLocaleString();
  };

  @action
  remainingDays=(index: number) => {
    const today = moment();
    const tomorrow = moment().add(1, 'days');
    const eventday = moment(this.todoItemList[index].date);
    const diff = eventday.diff(today, 'days') + 1;

    if (today.date() === eventday.date()) return 'Today';
    if (tomorrow.date() === eventday.date()) return 'Tomorrow';

    const remain = `D${diff > 0 ? '+' : ''}${diff}`;

    return remain;
  }

  @action
  reorderItem = (startIndex: number, endIndex: number) => {
    const list = this.todoItemList;
    const [removed] = list.splice(startIndex, 1);

    list.splice(endIndex, 0, removed);

    for (let i = 0; i < this.todoItemList.length; i++) {
      this.todoItemList[i].index = this.todoItemList.indexOf(this.todoItemList[i]);
      this.todoItemList[i].id = this.todoItemList.indexOf(this.todoItemList[i]).toString();
    }
  }
}

export default new TodoListStore();
