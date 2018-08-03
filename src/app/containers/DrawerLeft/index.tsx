import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import {
  FaThLarge,
  FaShare,
  FaClone,
  FaTrash,
  FaSquare
} from 'react-icons/fa';

@observer
export default class DrawerLeft extends React.Component<Props, {}> {

  renderDomains() {
    let list = [1, 2, 3, 4, 5];
    return (<div>
      {list.map((elem, i) => {
        return <div key={i} className='each-sharing-network-container'>
          <div className='each-drawer-icon-container'>
            <FaThLarge />
          </div>
          <div className='each-drawer-title-container'>
            Sharing Network {i}
          </div>
          <div className='each-drawer-icon-container'>
            <FaShare />
          </div>
          <div className='each-drawer-icon-container'>
            <FaClone />
          </div>
          <div className='each-drawer-icon-container'>
            <FaTrash />
          </div>
        </div>
      })}
    </div>)
  }

  renderMyChannels() {
    let list = [1, 2, 3, 4, 5];
    return (<div>
      {list.map((elem, i) => {
        return <div key={i} className='each-channel-container'>
          <div className='each-drawer-icon-container'>
            <FaSquare />
          </div>
          <div className='each-drawer-title-container'>
            My Channel {i}
          </div>

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
      <div className="drawer-left-container">
        {this.renderDomains()}
        {this.renderLineBreak()}
        {this.renderMyChannels()}
      </div>
    );
  }
}
