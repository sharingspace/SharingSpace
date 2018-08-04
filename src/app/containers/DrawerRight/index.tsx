import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import {
  FaEnvelope,
  FaCog,
  FaInfoCircle
} from 'react-icons/fa';
import SearchInput from '../SearchInput';
import ExpandableDropdown from '../ExpandableDropdown';


class LineItem extends React.Component<any, any> {
  render() {
    let Icon = this.props.icon;
    return <div className='each-right-entry-container'>
      <div className='each-drawer-title-container'>
        {this.props.title}
      </div>
      <div className='each-drawer-icon-container'>
        <Icon />
      </div>
    </div>
  }
}

class DrawerRight extends React.Component<any, {}> {

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
      border: '3px solid #353535',
      flex: '0 auto ' + imageSize + 'rem',
      margin: '.5rem'
    }

    let profileContainer = {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      // border: '1px solid green',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    }

    let nameStyle = {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      flex: 1
    }

    return (
      <div className="drawer-right-profile-container">
        <div style={profileContainer}>
          <div style={inlineImageStyle}></div>
          <div style={nameStyle}>{name}</div>
        </div>

        <LineItem title={'Messages'} icon={FaEnvelope} />

      </div>
    )
  }

  renderLineBreak() {
    return (<div>
      <hr />
    </div>)
  }

  renderThisChannelData() {
    return <div>

      <div className='each-right-entry-container'>
        <div className='each-drawer-title-container'>
          Age Of Solar / Name
        </div>
      </div>

      <LineItem title={'Information'} icon={FaInfoCircle} />
      <LineItem title={'Controls'} icon={FaCog} />

    </div>
  }

  renderOptionsBottom() {
    return (<div>
      <LineItem title={'Settings'} icon={FaCog} />
    </div>)
  }

  renderChannelDropdown() {
    let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return <ExpandableDropdown title={'Channels'} list={list} />
  }

  renderNetworksDropdown() {
    let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return <ExpandableDropdown title={'Networks'} list={list} />
  }

  renderScrollableMiddle() {
    let scrollableStyle = {
      // border: '1px solid red',
      flex: 1,
      overflowY: 'scroll'
    }
    return <div style={scrollableStyle}>
      {this.renderChannelDropdown()}
      {this.renderLineBreak()}
      {this.renderNetworksDropdown()}
    </div>
  }

  render() {

    let masterContainerStyle = {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      flex: 1,
      // width: '10rem'
    }

    let topStaticStyle = {
      flex: 0,
      // border: '1px solid green'
    }

    let middleScrollStyle = {
      flex: 1,
      // border: '1px solid blue',
      overflowY: 'scroll'
    }

    let bottomStaticStyle = {
      flex: 0,
      // border: '1px solid orange'
    }

    return (
      <div style={masterContainerStyle} className='drawer-right-container'>
        <div style={topStaticStyle}>
          {this.renderProfile()}
          {this.renderThisChannelData()}
          {this.renderLineBreak()}
        </div>
        <div style={middleScrollStyle}>
        {this.renderScrollableMiddle()}
        </div>
        <div style={bottomStaticStyle}>
          {this.renderOptionsBottom()}
        </div>
      </div>
    );
  }
}

export default observer(DrawerRight);
