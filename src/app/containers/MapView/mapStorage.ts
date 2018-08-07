import { observable, action, computed, toJS } from 'mobx';
import ExitIndoorButton from './mapComponents/exitIndoorButton';

class MapStore {

  mapElem: any;
  mapObject: any;
  markersList: any;
  initLat: any;
  initLng: any;
  initZoom: any;
  apiKey: any;
  exitControl: any;
  floorUpControl: any;
  floorDownControl: any;

  constructor() {
    this.mapElem = null;
    this.mapObject = null;
    this.markersList = [];
    this.initLat = 34.342501;
    this.initLng = -112.100465;
    this.initZoom = 17;
    this.apiKey = 'dd208c3425464e703d197ef3cbbd6736';
    this.exitControl = new ExitIndoorButton({
      title: 'Exit',
      onClick: (classThis) => {
        classThis._map.indoors.exit();
      }
    });
    this.floorUpControl = new ExitIndoorButton({
      title: 'Up',
      onClick: (classThis) => {
        classThis._map.indoors.moveUp();
      }
    });
    this.floorDownControl = new ExitIndoorButton({
      title: 'Down',
      onClick: (classThis) => {
        classThis._map.indoors.moveDown();
      }
    });
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
    // saved map object
    this.mapObject = newMapObject;
    // set up listeners
    this.mapObject.indoors.on('indoormapenter', (event: any) => this.onEnterIndoors(event));
    this.mapObject.indoors.on('indoormapexit', (event: any) => this.onExitIndoors(event));
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

  onEnterIndoors(event) {
    this.displayIndoorControls();
  }

  onExitIndoors() {
    this.hideIndoorControls();
  }


  displayIndoorControls() {
    this.mapObject.addControl( this.exitControl );
    this.mapObject.addControl( this.floorUpControl );
    this.mapObject.addControl( this.floorDownControl );
  }

  hideIndoorControls() {
    this.exitControl.remove();
    this.floorUpControl.remove();
    this.floorDownControl.remove();
  }

  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////

  // for each item, add one of these
  addSingleMarker(params) {
    let title = params.title;
    // create popup
    let popupOptions = {
      className: 'each-wrld3d-popup',
      elevation: 0.0,
    }
    let thisPopup = L.popup(popupOptions)
    .setLatLng([params.lat, params.lng])
    .setContent(params.title)
    // create marker
    let inactiveOpacity = .8;
    let activeOpacity = 1;
    let markerOptions = {
      elevation: 0.0,
      title: title,
      alt: title,
      opacity: inactiveOpacity
    }
    let thisMarker = L.marker([params.lat, params.lng], markerOptions)
    thisMarker.on('mouseover', (data) => {
      thisMarker.setOpacity(activeOpacity);
    })
    thisMarker.on('mouseout', (data) => {
      thisMarker.setOpacity(inactiveOpacity);
    })

    // bind popup to marker
    thisMarker.bindPopup(thisPopup).openPopup();
    // add to map
    thisMarker.addTo(this.mapObject);
    this.markersList.push(thisMarker);
  }

  clearAllMarkers() {
    this.markersList.forEach((elem, i) => {
      elem.remove();
    })
    this.markersList = [];
  }

  addMarkers(list) {
    if(!list) {
      return;
    }

    // clear map
    this.clearAllMarkers();

    // loop through list and add markers
    let multiplyFactor = .001;
    list.forEach((elem, i) => {
      // handling junk data
      // just don't render it
      if(elem == null) {
        return;
      }
      if(elem.lat === null) {
        return;
      }
      if(elem.lng === null) {
        return;
      }

      let params = {
        title: `${elem.display_name} ${elem.natural_post_type} ${elem.title}`,
        // old randomizer
        // lat: ( (Math.random() - .5) * multiplyFactor ) + this.initLat,
        // lng: ( (Math.random() - .5) * multiplyFactor ) + this.initLng
        lat: elem.lat,
        lng: elem.lng
      }

      this.addSingleMarker(params);
    })

  }

}

let mapMobx = new MapStore();
export default mapMobx;
