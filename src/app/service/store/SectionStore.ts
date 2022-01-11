/* eslint-disable no-nested-ternary */
import { action, observable } from 'mobx';

interface SectionType {
  index: number;
  id: string;
  title: string;
}

class SectionStore {
  @observable
  sectionItemList: Array<SectionType>;

  @observable
  sectionTitle: string;

  constructor() {
    this.sectionItemList = [
      // { index: 1, id: '1', title: 'Work' },
      // { index: 2, id: '2', title: 'Home' },
    ];
    this.sectionTitle = '';
  }

  @action
  loadItem = () => {
    const sectionItemList = window.localStorage.getItem('SectionItemList');

    if (sectionItemList !== null) {
      this.sectionItemList = JSON.parse(sectionItemList!);
    }
  };

  @action
  saveItem = () => {
    const { sectionItemList } = this;

    window.localStorage.setItem('SectionItemList', JSON.stringify(sectionItemList));
  };

  @action
  initSection = () => {
    this.sectionTitle = '';
  };

  @action
  addSection = (index:number) => {
    const result = this.sectionItemList.concat({
      index,
      id: index.toString(),
      title: this.sectionTitle,
    });

    this.sectionItemList = result;
  }

  @action
  deleteSection = (index: number) => {
    const result = this.sectionItemList.filter((item: any) => item.index !== index);

    this.sectionItemList = result;
  };
}

export default new SectionStore();
