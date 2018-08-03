import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import "wrld.js";
import mapStorage from './mapStorage';

@observer
class MapView extends React.Component<any, {}> {

  constructor(props) {
    super(props);
  }

  appendMapElemToParent(mapElem) {
    let containerElem = document.querySelector('.map-view-container');
    containerElem.appendChild(mapElem);
  }

  componentDidMount() {
    if(!mapStorage.isMapElemSaved()) {
      mapStorage.initMap();
      this.appendMapElemToParent(mapStorage.retrieveMapElem());
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

export default MapView;
