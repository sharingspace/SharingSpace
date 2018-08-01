import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import GridLayout from 'react-grid-layout';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Tile from './tile';

@observer
export default class TileView extends React.Component<Props, {}> {

  itemList: any;
  sharedKey: string;
  breakpoints: object;
  columnConfig: any;
  rowHeight: number;

  constructor(props) {
    super(props);
    this.itemList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    this.sharedKey = 'grid_elem_';
    this.breakpoints = {
      lg: 800,
      sm: 700
    }
    this.columnConfig = {
      lg: 8,
      sm: 1
    }
    this.rowHeight = 90;
  }

  generateLayouts() {
    let results = {
      lg: [],
      sm: []
    };

    this.itemList.forEach((elem, i) => {
      results.lg.push({
        i: this.sharedKey + i,
        x: i % this.columnConfig.lg,
        y: Math.floor(i / this.columnConfig.lg),
        w: 1,
        h: 1,
        static: false,
      })
      results.sm.push({
        i: this.sharedKey + i,
        x: 0,
        y: i,
        w: 2,
        h: 1,
        static: false,
      })
    })
    return results;
  }

  renderGrid() {
    const ResponsiveGridLayout = WidthProvider(Responsive);
    return (
      <ResponsiveGridLayout
        className="layout"
        layouts={this.generateLayouts()}
        cols={this.columnConfig}
        rowHeight={this.rowHeight}
        breakpoints={this.breakpoints}
      >
        {this.itemList.map((elem, i) => {
          return <div key={this.sharedKey + i} className="each-grid-container">
            <Tile data={elem} />
          </div>
        })}
      </ResponsiveGridLayout>
    )
  }

  render() {
    return (
      <div className="">
        <div>Tile view</div>
        {this.renderGrid()}
      </div>
    );
  }
}
