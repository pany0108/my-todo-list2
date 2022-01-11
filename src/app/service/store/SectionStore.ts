/* eslint-disable no-nested-ternary */
import { action, observable } from 'mobx';

interface SectionType {
  index: number;
  id: string;
  title: string;
}

class SectionStore {
  @observable
  sectionList: Array<SectionType>;

  @observable
  sectionTitle: string;

  constructor() {
    this.sectionList = [
      // { index: 1, id: '1', title: 'Work' },
      // { index: 2, id: '2', title: 'Home' },
    ];
    this.sectionTitle = '';
  }

  @action
  loadItem = () => {
    const sectionList = window.localStorage.getItem('sectionList');

    if (sectionList !== null) {
      this.sectionList = JSON.parse(sectionList!);
    }
  };

  @action
  saveItem = () => {
    const { sectionList } = this;

    window.localStorage.setItem('sectionList', JSON.stringify(sectionList));
  };

  @action
  initSection = () => {
    this.sectionTitle = '';
  };

  @action
  addSection = (index:number) => {
    const result = this.sectionList.concat({
      index,
      id: index.toString(),
      title: this.sectionTitle,
    });

    this.sectionList = result;
  }

  @action
  deleteSection = (index: number) => {
    const result = this.sectionList.filter((item: any) => item.index !== index);

    this.sectionList = result;
  };
}

export default new SectionStore();
