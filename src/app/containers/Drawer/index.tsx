import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export default class Drawer extends React.Component<Props, {}> {

  renderProfile() {
    return (
      <div>
        Profile
      </div>
    )
  }

  renderOptions() {
    return (<div>
      <div>Messages</div>
      <div>Settings</div>
    </div>)
  }

  renderLineBreak() {
    return (<div>
      <hr />
    </div>)
  }

  renderOptions2() {
    return (<div>
      <div>Age Of Solar</div>
      <div>Search input</div>
      <div>Information</div>
      <div>Controls</div>
    </div>)
  }

  render() {
    return (
      <div className="drawer-container">
        {this.renderProfile()}
        {this.renderOptions()}
        {this.renderLineBreak()}
        {this.renderOptions2()}
      </div>
    );
  }
}
