import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import mapStorage from './mapStorage';
import { sizeStore } from '../../stores';

// prevent typescript error because of how we're importing
declare let L: any

class MapView extends React.Component<any, {}> {

  constructor(props) {
    super(props);
  }

  initMap() {
    const { width } = sizeStore;
    let mapElem = document.createElement('div');
    mapElem.setAttribute('id', 'map_elem_id');
    mapElem.style.width = width + 'px';
    mapElem.style.height = '100%';
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

  componentWillReact() {
    const { width, height } = sizeStore;
    mapStorage.resizeMapElem(width);
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
    // leave this in here so the component responds to it with new renders
    const { width, height } = sizeStore;
    return (
      <div className="map-view-container">
      </div>
    );
  }
}

export default observer(MapView);
