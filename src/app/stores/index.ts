import AuthStore from './Domain/AuthStore';
import NavStore from './View/NavStore';
import RefreshControl from './View/refreshControl';
import DrawerStore from './View/DrawerStore';
import SizeStore from './View/SizeStore';

const authStore = new AuthStore();
const navStore = new NavStore();
const refreshControl = new RefreshControl();
const drawerStore = new DrawerStore();
const sizeStore = new SizeStore();


export {
  authStore,
  navStore,
  refreshControl,
  drawerStore,
  sizeStore
};
