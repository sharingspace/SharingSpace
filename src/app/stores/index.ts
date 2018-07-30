import AuthStore from './Domain/AuthStore';
import NavStore from './View/NavStore';
import RefreshControl from './View/refreshControl';
import DrawerStore from './View/DrawerStore';

const authStore = new AuthStore();
const navStore = new NavStore();
const refreshControl = new RefreshControl();
const drawerStore = new DrawerStore();

export {
  authStore,
  navStore,
  refreshControl,
  drawerStore
};
