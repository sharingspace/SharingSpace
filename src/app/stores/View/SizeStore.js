import { observable } from 'mobx';

class SizeStore {

  @observable height = 0;
  @observable width = 0;

  @action setSize = (height, width) => {
    this.height = height;
    this.width = width;
  }

}
