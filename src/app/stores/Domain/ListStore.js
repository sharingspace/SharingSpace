import { observable, decorate, action } from 'mobx';

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

  getList() {

    let thisQueryCallTime = Date.now();
    this.lastQueryTime = thisQueryCallTime;

    console.log('Get list');
    this.listLoading = true;

    setTimeout(() => {

      if(thisQueryCallTime >= this.lastQueryTime) {
        this.listLoading = false;
        // Only handle the query if it's the most recent
        // ignore all others
        console.log('======== handle it')
      }

    }, 300)
  }
}

decorate(ListStore, {
  getList: action,
  list: observable,
  query: observable,
  listLoading: observable
})

export default ListStore;
