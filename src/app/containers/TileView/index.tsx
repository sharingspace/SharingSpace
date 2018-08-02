import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import GridLayout from 'react-grid-layout';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Tile from './tile';
import Packery from 'packery';

@observer
export default class TileView extends React.Component<Props, {}> {

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
    setTimeout(() => {
      this.generatePackeryGrid();
    }, 0);
  }

  generatePackeryGrid() {
    let packeryElem = this.packeryGridRef.current;
    packeryElem.style.cssText = `height: 10rem`;

    // init packery
    let packeryObject = new Packery( packeryElem, {
      // options
      itemSelector: '.grid-item',
      gutter: 10,
      originLeft: true,
      originTop: true,
    });

    let list = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    list.forEach((listElem, i) => {
      let elem = document.createElement('div');
      elem.className = 'grid-item';

      let height = Math.random() * 5 + 3;
      let width = Math.random() * 5 + 3;

      elem.style.cssText = `height: ${height}rem; width: ${width}rem`;

      let textNode = document.createTextNode("box: " + i);
      elem.appendChild(textNode);

      packeryElem.appendChild( elem );
      packeryObject.appended( elem );
      packeryObject.layout();
    })
  }

  renderGrid() {
    return (
      <div ref={this.packeryGridRef} className='packery-grid'></div>
    )
  }

  render() {
    return (
      <div className="grid-container">
        {this.renderGrid()}
      </div>
    );
  }
}
