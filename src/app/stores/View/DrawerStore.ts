import { authStore } from 'stores';
import { observable, action, decorate } from 'mobx';

class DrawerStore {

  drawerRightVisible: boolean;
  drawerLeftVisible: boolean;

  constructor() {
    this.drawerRightVisible = false;
    this.drawerLeftVisible = false;
  }

  openDrawerRight() {
    this.drawerRightVisible = true;
  }

  closeDrawerRight() {
    this.drawerRightVisible = false;
  }

  /////////////////////////////

  openDrawerLeft() {
    this.drawerLeftVisible = true;
  }

  closeDrawerLeft() {
    this.drawerLeftVisible = false;
  }
}

decorate(DrawerStore, {
  drawerRightVisible: observable,
  openDrawerRight: action,
  closeDrawerRight: action,
  drawerLeftVisible: observable,
  openDrawerLeft: action,
  closeDrawerLeft: action
})

export default DrawerStore;
