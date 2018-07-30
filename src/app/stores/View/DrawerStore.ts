import { authStore } from 'stores';
import { observable, action } from 'mobx';


export default class DrawerStore {

  @observable public drawerVisible: boolean = false;

  @action openDrawer = () => {
    this.drawerVisible = true;
  }

  @action closeDrawer = () => {
    this.drawerVisible = false;
  }

  @action public toggleDrawerStore = () => {
    this.drawerVisible = !this.drawerVisible;
  }

}
