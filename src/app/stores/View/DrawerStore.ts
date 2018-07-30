import { authStore } from 'stores';
import { observable, action } from 'mobx';


export default class DrawerStore {

  @observable public drawerRightVisible: boolean = false;

  @action openDrawerRight = () => {
    this.drawerRightVisible = true;
  }

  @action closeDrawerRight = () => {
    this.drawerRightVisible = false;
  }

  /////////////////////////////

  @observable public drawerLeftVisible: boolean = false;

  @action openDrawerLeft = () => {
    this.drawerLeftVisible = true;
  }

  @action closeDrawerLeft = () => {
    this.drawerLeftVisible = false;
  }


}
