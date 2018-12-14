import { observable, decorate, action, toJS, computed } from 'mobx';
import testData from '../../services/testData';

let parseImageUrl = (elem) => {
  let rootUrl = 'https://arcoop.anyshare.coop/';
  if(elem.image_url) {
    return rootUrl + elem.image_url
  } else {
    return null;
  }
}

class ListStore {

  constructor() {
    this.list = null;
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
    this.list = null;
  }

  formatListData(list) {
    let formattedList = list.map((elem, i) => {
      return {
        ...elem,
        parsedImageUrl: parseImageUrl(elem)
      }
    })
    return formattedList;
  }

  get listJS() {
    if(!this.list) {
      return [];
    } else {
      console.log('this.list', this.list)
      return this.formatListData( toJS(this.list.rows) );
    }
  }

  getList() {
    let thisQueryCallTime = Date.now();
    this.lastQueryTime = thisQueryCallTime;

    this.clearList();

    console.log('Get list');
    this.listLoading = true;



    // experimenting with API calls here

    // let url = 'https://arcoop.anyshare.coop/entry/json.browse';
    // let reqListener = () => {
    //   console.log(this.responseText);
    // }
    //
    // console.log(document.cookie);
    //
    // var req = new XMLHttpRequest();
    // req.addEventListener("load", reqListener);
    // req.withCredentials = true;
    // req.open("GET", url);
    // req.send();


    // axios.get('', {withCredentials: true})
    // .then((res) => {
    //   console.log('res', res);
    // })
    // .catch((err) => {
    //   console.log('err', err)
    // })

    setTimeout(() => {
      if(thisQueryCallTime >= this.lastQueryTime) {
        this.listLoading = false;
        // Only handle the query if it's the most recent
        // ignore all others

        // testing using fake list data
        // this.list = new Array( this.query.length );

        // write list data to store
        this.list = testData;
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
