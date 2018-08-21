import { observable, action, decorate } from 'mobx';

class SizeStore {

  height: number;
  width: number;

  constructor() {
    height: 0;
    width: 0;
  }

  setSize(height, width) {
    this.height = height;
    this.width = width;
  }
}

decorate(SizeStore, {
  height: observable,
  width: observable,
  setSize: action
})

export default SizeStore;
