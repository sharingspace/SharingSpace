import { observable, action, computed, toJS, decorate } from 'mobx';
import ExitIndoorButton from '../../containers/MapView/mapComponents/exitIndoorButton';
import { sizeStore } from '../index';

// prevent typescript error because of how we're importing
declare let L: any

class MapStore {

  mapReadyToView: boolean;
  mapElem: any;
  mapObject: any;
  markersList: any;
  initLat: number;
  initLng: number;
  initZoom: number;
  apiKey: string;
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

    this.mapReadyToView = false;

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


    // finally, start initiating the elem and object
    this.initMapElemAndObject();
  }

  initMapElemAndObject() {
    this.initMapElem();
    this.initMapObject();
  }

  initMapElem() {
    const { width } = sizeStore;
    let mapElem = document.createElement('div');
    mapElem.setAttribute('id', 'map_elem_id');
    mapElem.style.width = width + 'px';
    mapElem.style.height = '100%';
    // save elem to class
    this.mapElem = mapElem;
  }

  initMapObject() {
    console.log('=========== INIT MAP OBJECT', this.mapElem)
    let mapObject = L.Wrld.map(this.mapElem, this.apiKey, {
      center: [ this.initLat, this.initLng ],
      zoom: this.initZoom,
      indoorsEnabled: true,
    });
    // setup indoor enter / exit buttons
    mapObject.indoors.on('indoormapenter', (event: any) => this.onEnterIndoors(event));
    mapObject.indoors.on('indoormapexit', (event: any) => this.onExitIndoors(event));
    mapObject.on('initialstreamingcomplete', (data: any) => {
      console.log('on initialstreamingcomplete', data)
      this.mapReadyToView = true;
    })
    // save to class
    this.mapObject = mapObject;
  }

  resizeMapElem(newWidth) {
    this.mapElem.style.width = newWidth + 'px';
  }

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
      // handling junk data with these if cathces
      // just don't render this marker at all if it's data is invalid
      if(elem == null) { return }
      if(elem.lat === null) { return }
      if(elem.lng === null) { return }

      let params = {
        title: `${elem.display_name} ${elem.natural_post_type} ${elem.title}`,

        // old randomizer settings for debugging
        // lat: ( (Math.random() - .5) * multiplyFactor ) + this.initLat,
        // lng: ( (Math.random() - .5) * multiplyFactor ) + this.initLng

        lat: elem.lat,
        lng: elem.lng
      }

      this.addSingleMarker(params);
    })

  }

}

decorate(MapStore, {
  mapReadyToView: observable,
  mapViewHasBeenNavigatedToOnce: observable
})

export default MapStore;
