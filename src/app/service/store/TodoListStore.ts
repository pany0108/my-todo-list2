import { action, observable, toJS } from 'mobx';

interface ItemType {
  index: number;
  title: string;
  checked: boolean;
  time: any;
  // allDay: boolean;
}

class TodoListStore {
  @observable
  itemList: Array<ItemType>;

  @observable
  title: string;

  @observable
  checked: boolean;

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
    this.time = '';
    this.allDay = false;
  }

  @action
  loadItem = () => {
    const result = window.localStorage.getItem('arr');
    if (result !== null) {
      this.itemList = JSON.parse(result!);
    }
  }

  @action
  saveItem = () => {
    const result = this.itemList;

    window.localStorage.setItem('arr', JSON.stringify(result));
  }

  @action
  addItem = (index: number) => {
    const result = this.itemList.concat({
      index,
      title: this.title,
      checked: false,
      time: this.allDay ? '' : this.time,
    });

    this.itemList = result;
  };

  @action
  deleteItem = (index:number) => {
    const result = this.itemList.filter((item: any) => item.index !== index);

    this.itemList = result;
  }

  @action
  checkItem = (index: number) => {
    this.itemList[index].checked = !this.itemList[index].checked;
  }

  @action
  getTime = (newTimeValue: any) => {
    let hours = newTimeValue.getHours();
    let minutes = newTimeValue.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    this.time = `${hours}:${minutes} ${ampm}`;
  };
}

export default new TodoListStore();
