import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export default class MapView extends React.Component<Props, {}> {
  render() {
    return (
      <div className="">
        <div>Map view</div>
      </div>
    );
  }
}
