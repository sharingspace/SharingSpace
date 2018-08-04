import AuthStore from './Domain/AuthStore';
import NavStore from './View/NavStore';
import DrawerStore from './View/DrawerStore';
import SizeStore from './View/SizeStore';
import ListStore from './Domain/ListStore';

const authStore = new AuthStore();
const navStore = new NavStore();
const drawerStore = new DrawerStore();
const sizeStore = new SizeStore();
const listStore = new ListStore();


export {
  authStore,
  navStore,
  drawerStore,
  sizeStore,
  listStore
};
