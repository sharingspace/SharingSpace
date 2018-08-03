import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import "wrld.js";
import sizeMe from 'react-sizeme';
import mapStorage from './mapStorage';

@observer
class MapView extends React.Component<any, {}> {

  apiKey: string;
  initLat: number;
  initLng: number;
  initZoom: number;

  constructor(props) {
    super(props);
    this.apiKey = 'dd208c3425464e703d197ef3cbbd6736';
    this.initLat = 34.342501;
    this.initLng = -112.100465;
    this.initZoom = 17;
  }

  initMap() {
    let mapElem = document.createElement('div');
    mapElem.setAttribute('id', 'map_elem_id');
    mapElem.style.cssText = 'width: 100%; height: 100%';
    this.appendMapElemToParent(mapElem)

    let mapObject =  L.Wrld.map("map_elem_id", this.apiKey, {
      center: [ this.initLat, this.initLng ],
      zoom: this.initZoom
    });

    // store on storage class
    mapStorage.saveMapElem(mapElem);
    mapStorage.saveMapObject(mapObject);
  }

  appendMapElemToParent(mapElem) {
    let containerElem = document.querySelector('.map-view-container');
    containerElem.appendChild(mapElem);
  }

  componentDidMount() {
    if(!mapStorage.isMapElemSaved()) {
      this.initMap()
    } else {
      this.appendMapElemToParent(mapStorage.retrieveMapElem());
    }
  }

  render() {
    return (
      <div className="map-view-container">
      </div>
    );
  }
}

export default sizeMe({ monitorHeight: true })(MapView);
