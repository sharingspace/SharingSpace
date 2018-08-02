import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import "wrld.js";
import sizeMe from 'react-sizeme';

@observer
class MapView extends React.Component<any, {}> {

  _map: any;
  apiKey: string;
  initLat: number;
  initLng: number;
  initZoom: number;

  constructor(props) {
    super(props);
    this.apiKey = 'dd208c3425464e703d197ef3cbbd6736';
    this._map = null;
    this.initLat = 34.342501;
    this.initLng = -112.100465;
    this.initZoom = 17;
  }

  componentDidMount() {
    this._map = L.Wrld.map("map", this.apiKey, {
      center: [this.initLat, this.initLng],
      zoom: this.initZoom
    });
  }

  render() {
    let inlineMapViewStyle = {
      height: '100%',
      width: '100%'
    }

    return (
      <div className="map-view-container">
        <div style={inlineMapViewStyle} id="map"></div>
      </div>
    );
  }
}

export default sizeMe({ monitorHeight: true })(MapView);
