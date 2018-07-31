import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export default class DrawerLeft extends React.Component<Props, {}> {

  renderDomains() {
    let list = [1, 2, 3, 4, 5];
    return (<div>
      {list.map((elem, i) => {
        return <div key={i}>
          sharing network {i}
        </div>
      })}
    </div>)
  }

  renderMyChannels() {
    let list = [1, 2, 3, 4, 5];
    return (<div>
      {list.map((elem, i) => {
        return <div key={i}>
          my channel {i}
        </div>
      })}
    </div>)
  }

  renderLineBreak() {
    return (<div>
      <hr />
    </div>)
  }


  render() {
    return (
      <div className="drawer-container">
        {this.renderDomains()}
        {this.renderLineBreak()}
        {this.renderMyChannels()}
      </div>
    );
  }
}
