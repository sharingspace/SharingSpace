import { observable, action, computed, toJS } from 'mobx';
import "wrld.js";

class MapStore {

  constructor() {
    mapElem: null;
    mapObject: null;
    this.initLat = 34.342501;
    this.initLng = -112.100465;
    this.initZoom = 17;
    this.apiKey = 'dd208c3425464e703d197ef3cbbd6736';
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


  generatePopUp(data) {
    console.log('popup data', data)
    // var popup = L.popup()
    // .setLatLng([37.7952, -122.4028])
    // .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    // .openOn(map);

  }


  addMarkers() {
    console.log('generate markers');

    let title = 'Test title';

    let markerOptions = {
      elevation: 0.0,
      title: title,
      alt: title,
      riseOnHover: true,
      riseOffset: 250,
    }

    let popupOptions = {
      className: 'each-wrld3d-popup',
      elevation: 0.0,
    }

    let thisPopup = L.popup(popupOptions)
    .setLatLng([this.initLat, this.initLng])
    .setContent("Transamerica Pyramid")
    // .addTo(this.mapObject);


    let thisMarker = L.marker([this.initLat, this.initLng], markerOptions)
    // .bindPopup(thisPopup)

    thisMarker.on('click', (data) => {
      console.log('-- click', data)
    })

    thisMarker.bindPopup(thisPopup).openPopup();

    thisMarker.addTo(this.mapObject);


  }

  markerClicked() {
    console.log('marker clicked');

  }

}

let mapMobx = new MapStore();
export default mapMobx;
