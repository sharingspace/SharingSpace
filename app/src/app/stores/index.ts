import NavStore from './View/NavStore';
import DrawerStore from './View/DrawerStore';
import SizeStore from './View/SizeStore';
import ListStore from './Domain/ListStore';
import PackeryStorage from './View/PackeryStorage';
import MapStorage from './View/MapStorage';
import MembersStore from './Domain/MemberStore';

const navStore = new NavStore();
const drawerStore = new DrawerStore();
const sizeStore = new SizeStore();
const listStore = new ListStore();
const packeryStore = new PackeryStorage();
const mapStore = new MapStorage();
const membersStore = new MembersStore();

export {
  navStore,
  drawerStore,
  sizeStore,
  listStore,
  packeryStore,
  mapStore,
  membersStore
};
