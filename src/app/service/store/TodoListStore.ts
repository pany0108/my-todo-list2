/* eslint-disable no-nested-ternary */
import { action, observable } from 'mobx';
import moment from 'moment';

interface ItemType {
  index: number;
  id: number;
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
      id: index,
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
    // const year = newDateValue.getFullYear();
    // let month = newDateValue.getMonth() + 1;
    // let date = newDateValue.getDate();

    // month = month < 10 ? `0${month}` : month;
    // date = date < 10 ? `0${date}` : date;

    // this.date = `${month}/${date}/${year}`;
    this.date = moment(newDateValue).format('MM/DD/yyyy');
  };

  @action
  getTime = (newTimeValue: any) => {
    // let hours = newTimeValue.getHours();
    // let minutes = newTimeValue.getMinutes();
    // const ampm = hours >= 12 ? 'pm' : 'am';

    // hours %= 12;
    // hours = hours || 12;
    // minutes = minutes < 10 ? `0${minutes}` : minutes;

    // this.time = `${hours}:${minutes} ${ampm}`;
    this.time = moment(newTimeValue).toLocaleString();
  };
}

export default new TodoListStore();
