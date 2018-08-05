import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import GridLayout from 'react-grid-layout';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Tile from './tile';
import Packery from 'packery';
import LoadingWheel from '../LoadingWheel';
import { listStore } from '../../stores';
import packeryStorage from './packeryStorage';

class TileView extends React.Component<Props, {}> {

  packeryElem: any;
  packeryObject: any;
  packeryGridRef: any;
  unregisterLeaveHook: any;

  constructor(props) {
    super(props);
    this.packeryGridRef = React.createRef();

  }

  routerWillLeave(nextLocation) {
    return false;
  }

  componentDidMount() {
    const { listLoading, listJS } = listStore;
    setTimeout(() => {
      let list = listJS;
      packeryStorage.initPackeryElem(this.packeryGridRef);
      packeryStorage.initPackeryObject();
      packeryStorage.populatePackery(list);
    }, 0);
  }

  componentWillReact() {
    const { listLoading, listJS } = listStore;
    packeryStorage.populatePackery(listJS);
  }

  renderGrid() {
    const { listJS, listLoading } = listStore;
    return (
      <div ref={this.packeryGridRef} className='packery-grid'></div>
    )
  }

  renderLoadingOrContent() {
    const { listLoading } = listStore;
    if(listLoading) {
      return <LoadingWheel />
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
