class MapStorage {

  constructor() {
    mapElem: null;
    mapObject: null;
    this.apiKey = 'dd208c3425464e703d197ef3cbbd6736';
    this.initLat = 34.342501;
    this.initLng = -112.100465;
    this.initZoom = 17;
  }

  initMap() {

    let mapElem = document.createElement('div');
    console.log('init map---------------- ', mapElem)
    mapElem.style.cssText = 'width: 100%; height: 100%';


    mapElem.setAttribute('id', 'map_elem_id');

    let mapObject =  L.Wrld.map(mapElem, this.apiKey, {
      center: [ this.initLat, this.initLng ],
      zoom: this.initZoom
    });

    this.mapElem = mapElem;
    this.mapObject = mapObject;
  }

  saveMapElem(newMapElem) {
    this.mapElem = newMapElem;
  }
  retrieveMapElem() {
    return this.mapElem;
  }

  saveMapObject(newMapObject) {
    this.mapObject = newMapObject;
  }

  retrieveMapObject() {
    return this.mapObject;
  }

  isMapElemSaved() {
    if(!this.mapElem) {
      return false;
    } else {
      return true;
    }
  }
}

let mapStorage = new MapStorage();

export default mapStorage;
