import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import { sizeStore, listStore, mapStore } from '../../stores';
import LoadingWheel from '../LoadingWheel';

class MapView extends React.Component<any, {}> {

  constructor(props) {
    super(props);
  }

  componentWillReact() {
    const { listJS } = listStore;
    this.resizeMapElem();
    mapStore.addMarkers(listJS);
  }

  resizeMapElem() {
    const { width, height } = sizeStore;
    mapStore.resizeMapElem(width);
  }

  appendMapElemToParent(elemToAdd) {
    const { width, height } = sizeStore;
    let containerElem = document.querySelector('.map-view-container');
    containerElem.appendChild(elemToAdd);
    this.resizeMapElem();
  }

  componentDidMount() {
    const { mapElem } = mapStore;

    console.log('== component did mount', mapElem)

    setTimeout(() => {
      if(mapElem) {
        this.appendMapElemToParent(mapElem)
      } else {
        mapStore.initMapElemAndObject();
        this.appendMapElemToParent(mapElem);
      }
    }, 0)

  }

  renderLoadingWheel() {
    const { mapReadyToView } = mapStore;
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
    if(listLoading || !mapReadyToView) {
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
