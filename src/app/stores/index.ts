import AuthStore from './Domain/AuthStore';
import NavStore from './View/NavStore';
import DrawerStore from './View/DrawerStore';
import SizeStore from './View/SizeStore';

console.log('DRawer store', DrawerStore)

const authStore = new AuthStore();
const navStore = new NavStore();
const drawerStore = new DrawerStore();
const sizeStore = new SizeStore();


export {
  authStore,
  navStore,
  drawerStore,
  sizeStore
};
