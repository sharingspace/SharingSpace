import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export default class TileView extends React.Component<Props, {}> {
  render() {
    return (
      <div className="">
        <div>Tile view</div>
      </div>
    );
  }
}
