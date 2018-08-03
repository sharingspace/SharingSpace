class MapStorage {

  constructor() {
    mapElem: null;
    mapObject: null;
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
