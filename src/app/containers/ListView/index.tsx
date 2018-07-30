import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export class ListView extends React.Component<Props, {}> {
  render() {
    return (
      <div className="">
        <div>List view</div>
      </div>
    );
  }
}
