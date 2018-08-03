import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import {
  FaEnvelope,
  FaCog,
  FaInfoCircle
} from 'react-icons/fa';

class DrawerRight extends React.Component<Props, {}> {

  renderProfile() {
    let name = 'My Name';
    let profileImgUrl = 'http://www.person.hu/data/upload/pics/mate_original.png';
    let imageSize = 4;
    let inlineImageStyle = {
      background: 'url(' + profileImgUrl + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: imageSize + 'rem',
      width: imageSize + 'rem',
      borderRadius: imageSize / 2 + 'rem',
      border: '3px solid #353535'
    }
    return (
      <div className="drawer-right-profile-container">
        <div style={inlineImageStyle}></div>
        <div className="drawer-profile-name-container">{name}</div>
      </div>
    )
  }

  renderOptions() {
    return (<div>

      <div className='each-right-entry-container'>
        <div className='each-drawer-title-container'>
          Messages
        </div>
        <div className='each-drawer-icon-container'>
          <FaEnvelope />
        </div>
      </div>

      <div className='each-right-entry-container'>
        <div className='each-drawer-title-container'>
          Settings
        </div>

        <div className='each-drawer-icon-container'>
          <FaCog />
        </div>
      </div>

    </div>)
  }

  renderLineBreak() {
    return (<div>
      <hr />
    </div>)
  }

  renderSearchInput() {
    let inlineInputStyle = {
      fontSize: '1.5rem',
      borderRadius: '1.5rem',
      border: '1px solid lightgrey',
      marginTop: '.5rem',
      marginBottom: '.5rem',
      padding: '.5rem'
    }
    return <input
      style={inlineInputStyle}
      placeholder="Search here"
    />
  }

  renderOptions2() {
    return (<div>
      <div className='each-right-entry-container'>
        <div className='each-drawer-title-container'>
          Age Of Solar / Name
        </div>
      </div>

      {this.renderSearchInput()}

      <div className='each-right-entry-container'>
        <div className='each-drawer-title-container'>
          Information
        </div>

        <div className='each-drawer-icon-container'>
          <FaInfoCircle />
        </div>
      </div>

      <div className='each-right-entry-container'>
        <div className='each-drawer-title-container'>
          Controls
        </div>

        <div className='each-drawer-icon-container'>
          <FaCog />
        </div>
      </div>

    </div>)
  }

  render() {
    return (
      <div className="drawer-right-container">
        {this.renderProfile()}
        {this.renderOptions()}
        {this.renderLineBreak()}
        {this.renderOptions2()}
      </div>
    );
  }
}

export default observer(DrawerRight);
