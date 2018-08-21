import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import GridLayout from 'react-grid-layout';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Tile from './tile';
import Packery from 'packery';
import LoadingWheel from '../LoadingWheel';
import { listStore, packeryStore } from '../../stores';

class TileView extends React.Component<Props, {}> {

  packeryElem: any;
  packeryObject: any;
  unregisterLeaveHook: any;

  constructor(props) {
    super(props);
  }

  routerWillLeave(nextLocation) {
    return false;
  }

  appendPackeryElemToDom(packeryElem) {
    let containerElem = document.querySelector('.packery-grid-react-container');
    containerElem.appendChild(packeryElem);
  }

  componentDidMount() {
    const { listLoading, listJS } = listStore;
    const { packeryElem, initPackeryElemAndObject } = packeryStore;

    // check if elem exists
    if(packeryElem) {
      // if it does, append it to dom
      this.appendPackeryElemToDom(packeryElem)
    } else {
      // else create it and then append it
      initPackeryElemAndObject();
      this.appendPackeryElemToDom(packeryElem)
    }

  }

  componentWillReact() {
    const { listLoading, listJS } = listStore;
    packeryStore.populatePackery(listJS);
  }

  renderGrid() {
    const { listJS, listLoading } = listStore;
    return (
      <div className='packery-grid-react-container'></div>
    )
  }

  renderLoadingOrContent() {
    const { listLoading, listJS } = listStore;
    if(listLoading) {
      return <LoadingWheel />
    } else if(listJS.length === 0) {
      let style = {
        display: 'flex',
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }
      return <div style={style}>
        No Content
      </div>
    }
  }

  render() {
    return (
      <div className="grid-container">
        {this.renderLoadingOrContent()}
        {this.renderGrid()}
      </div>
    );
  }
}

export default observer(TileView)
