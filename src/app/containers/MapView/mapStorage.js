import { observable, action, computed, toJS } from 'mobx';

class MapStore {

  constructor() {
    mapElem: null;
    mapObject: null;
    this.initLat = 34.342501;
    this.initLng = -112.100465;
    this.initZoom = 17;
    this.apiKey = 'dd208c3425464e703d197ef3cbbd6736';
  }

  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////
  // deals with saving and retriving of map elements for react component
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

  resizeMapElem(newWidth) {
    this.mapElem.style.width = newWidth + 'px';
  }

  /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////


  exitIndoors() {
    this.mapObject.indoors.exit();
  }


  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////

  addSingleMarker(params) {
    let title = params.title;
    // create popup
    let popupOptions = {
      className: 'each-wrld3d-popup',
      elevation: 0.0,
    }
    let thisPopup = L.popup(popupOptions)
    .setLatLng([this.initLat, this.initLng])
    .setContent("Transamerica Pyramid")
    // create marker
    let markerOptions = {
      elevation: 0.0,
      title: title,
      alt: title,
      riseOnHover: true,
      riseOffset: 250,
    }
    let thisMarker = L.marker([this.initLat, this.initLng], markerOptions)
    // bind popup to marker
    thisMarker.bindPopup(thisPopup).openPopup();
    // add to map
    thisMarker.addTo(this.mapObject);
  }

  addMarkers() {
    let params = {
      title: 'Marker title'
    }
    this.addSingleMarker(params);
  }

}

let mapMobx = new MapStore();
export default mapMobx;
