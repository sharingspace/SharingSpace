import NavStore from './View/NavStore';
import DrawerStore from './View/DrawerStore';
import SizeStore from './View/SizeStore';
import ListStore from './Domain/ListStore';

const navStore = new NavStore();
const drawerStore = new DrawerStore();
const sizeStore = new SizeStore();
const listStore = new ListStore();


export {
  navStore,
  drawerStore,
  sizeStore,
  listStore
};
