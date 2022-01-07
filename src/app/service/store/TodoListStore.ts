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
  itemList: Array<ItemType>;

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
    this.itemList = [
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
    const result = window.localStorage.getItem('arr');

    if (result !== null) {
      this.itemList = JSON.parse(result!);
    }
  };

  @action
  saveItem = () => {
    const result = this.itemList;

    window.localStorage.setItem('arr', JSON.stringify(result));
  };

  @action
  addItem = (index: number) => {
    const result = this.itemList.concat({
      index,
      id: index.toString(),
      title: this.title,
      checked: false,
      date: this.date,
      time: this.allDay ? '' : this.time,
    });

    this.itemList = result;
  };

  @action
  deleteItem = (index: number) => {
    const result = this.itemList.filter((item: any) => item.index !== index);

    this.itemList = result;
  };

  @action
  checkItem = (index: number) => {
    this.itemList[index].checked = !this.itemList[index].checked;
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
    const eventday = moment(this.itemList[index].date);
    const diff = eventday.diff(today, 'days');

    if (today.date() === eventday.date()) return 'Today';
    if (tomorrow.date() === eventday.date()) return 'Tomorrow';

    const remain = `D${diff > 0 ? '+' : ''}${diff}`;

    return remain;
  }

  @action
  reorder = (startIndex: number, endIndex: number) => {
    const list = this.itemList;
    const [removed] = list.splice(startIndex, 1);

    list.splice(endIndex, 0, removed);
  }
}

export default new TodoListStore();
