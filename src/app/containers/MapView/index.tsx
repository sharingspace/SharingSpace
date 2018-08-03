import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import "wrld.js";
import mapStorage from './mapStorage';

declare var L: any


class MapView extends React.Component<any, {}> {

  constructor(props) {
    super(props);
  }

  initMap() {
    let mapElem = document.createElement('div');
    mapElem.setAttribute('id', 'map_elem_id');
    mapElem.style.cssText = 'width: 100%; height: 100%';
    this.appendMapElemToParent(mapElem)

    let mapObject =  L.Wrld.map("map_elem_id", mapStorage.apiKey, {
      center: [ mapStorage.initLat, mapStorage.initLng ],
      zoom: mapStorage.initZoom,
      indoorsEnabled: true
    });

    // store on storage class
    mapStorage.saveMapElem(mapElem);
    mapStorage.saveMapObject(mapObject);
  }

  appendMapElemToParent(mapElem) {
    let containerElem = document.querySelector('.map-view-container');
    containerElem.appendChild(mapElem);
  }

  initOrRetrieveMap() {
    if(!mapStorage.isMapElemSaved()) {
      this.initMap()
    } else {
      this.appendMapElemToParent(mapStorage.retrieveMapElem());
    }
  }

  componentDidMount() {
    this.initOrRetrieveMap();
    mapStorage.addMarkers();
  }

  render() {
    return (
      <div className="map-view-container">
      </div>
    );
  }
}

export default observer(MapView);
