import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import mapStorage from './mapStorage';
import { sizeStore, listStore } from '../../stores';
import LoadingWheel from '../LoadingWheel';

// prevent typescript error because of how we're importing
declare let L: any

class MapView extends React.Component<any, {}> {

  constructor(props) {
    super(props);
  }

  componentWillReact() {
    const { listJS } = listStore;
    const { width, height } = sizeStore;
    console.log('- map will react', listJS)
    mapStorage.resizeMapElem(width);
    mapStorage.addMarkers(listJS);
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


  appendMapElemToParent(elemToAdd) {
    let containerElem = document.querySelector('.map-view-container');
    containerElem.appendChild(elemToAdd);
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
    // mapStorage.addMarkers();
  }

  renderLoadingWheel() {
    const { listLoading } = listStore;
    let containerStyle = {
      // border: '1px solid red',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, .8)',
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      display: 'flex'
    }
    let innerDivStyle = {
      // border: '1px solid red',
      fontWeight: 'bold',
      fontSize: '1.5rem'
    }
    if(listLoading) {
      return <div style={containerStyle as any}>
        <div style={innerDivStyle as any}>
          <LoadingWheel />
        </div>
      </div>
    } else {
      return null;
    }
  }

  render() {
    // leave this in here so the component responds to it with new renders
    const { width, height } = sizeStore;
    const { listLoading, listJS } = listStore;

    let containerStyle = {
      display: 'flex',
      flex: 1,
      position: 'relative'
    }
    return (
      <div style={containerStyle as any}>
        <div className="map-view-container">
        </div>
        {this.renderLoadingWheel()}
      </div>

    );
  }
}

export default observer(MapView);
