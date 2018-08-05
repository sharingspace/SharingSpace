import { observable, decorate, action, toJS, computed } from 'mobx';

class ListStore {

  constructor() {
    this.list = [];
    this.query = '';
    this.listLoading = false;
    this.lastQueryTime = Date.now();
    this.setQuery = this.setQuery.bind(this);
    this.getList = this.getList.bind(this);
  }

  setQuery(newQuery) {
    this.query = newQuery;
    this.getList();
  }

  clearList() {
    this.list = [];
  }

  get listJS() {
    return toJS(this.list);
  }

  getList() {
    let thisQueryCallTime = Date.now();
    this.lastQueryTime = thisQueryCallTime;

    this.clearList();

    console.log('Get list');
    this.listLoading = true;

    setTimeout(() => {
      if(thisQueryCallTime >= this.lastQueryTime) {
        this.listLoading = false;
        // Only handle the query if it's the most recent
        // ignore all others
        this.list = new Array( this.query.length );
      }

    }, 300)
  }
}

decorate(ListStore, {
  getList: action,
  list: observable,
  query: observable,
  listLoading: observable,
  listJS: computed
})

export default ListStore;
