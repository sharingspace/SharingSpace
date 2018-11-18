import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import {
  FaEnvelope,
  FaCogs,
  FaCog,
  FaInfoCircle,
  FaLocationArrow,
  FaList,
  FaTh,
  FaUserPlus
} from 'react-icons/fa';
import SearchInput from '../SearchInput';
import ExpandableDropdown from '../ExpandableDropdown';
import { drawerStore, mapStore } from '../../stores';

interface LineItemProps {
  title: string;
  icon: any;
  onClick: any;
  disabled: boolean;
}

class LineItem extends React.Component<LineItemProps, any> {
  render() {
    let inlineStyle: any = {};
    let functionToFire = this.props.onClick;

    // this is to prevent map nav from working until map is loaded
    // if(this.props.disabled) {
    //   functionToFire = (e) => {
    //     // do nothing with the function
    //   };
    //   inlineStyle.color = 'lightgrey';
    // }

    let Icon = this.props.icon;
    return (
      <div style={inlineStyle as any} className="each-right-entry-container" onClick={(e) => functionToFire(e)}>
        <div className="each-drawer-title-container">
          {this.props.title}
        </div>
        <div className="each-drawer-icon-container">
          <Icon />
        </div>
      </div>
    );
  }
}

class DrawerRight extends React.Component<any, {}> {
  navTo(route: string) {
    const { push } = this.props.history;
    push(route);
    drawerStore.closeDrawerRight();

  }

  renderNavItems() {
    const { mapReadyToView } = mapStore;
    let mapItemDisabled = false;
    if(!mapReadyToView) {
      mapItemDisabled = true;
    }
    return (
      <div>
        <LineItem disabled={false} title={'Grid View'} icon={FaTh} onClick={() => this.navTo('/grid')}/>
        <LineItem disabled={false} title={'List View'} icon={FaList} onClick={() => this.navTo('/list')}/>
        <LineItem disabled={mapItemDisabled} title={'Map View'} icon={FaLocationArrow} onClick={() => this.navTo('/map')}/>
      </div>
    );
  }

  renderProfile() {
    const name = 'My Name';
    const profileImgUrl = 'http://www.person.hu/data/upload/pics/mate_original.png';
    const imageSize = 4;
    const inlineImageStyle = {
      background: 'url(' + profileImgUrl + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: imageSize + 'rem',
      width: imageSize + 'rem',
      borderRadius: imageSize / 2 + 'rem',
      border: '3px solid #353535',
      flex: '0 auto ' + imageSize + 'rem',
      margin: '.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
    const profileContainer = {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    };
    const nameStyle = {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      flex: 1,
      marginRight: '.5rem'
    };
    const iconStyle = {
      marginLeft: '.5rem'
    };

    return (
      <div className="drawer-right-profile-container">
        <div style={profileContainer as any}>
          <div style={inlineImageStyle as any}>
            <FaUserPlus size={40} />
          </div>
          <div style={nameStyle as any} className="each-right-entry-container" onClick={() => console.log('do something')}>
            {name} <FaCog style={iconStyle} />
          </div>
        </div>
        <LineItem disabled={false} title={'Messages'} icon={FaEnvelope} onClick={() => console.log('on click')}/>
      </div>
    );
  }

  renderLineBreak() {
    let style = {
      marginTop: '.1rem',
      marginBottom: '.1rem',
    };
    let lineStyle = {
      height: '1px',
      backgroundColor: 'lightgrey',
    };
    return (
      <div style={style}>
        <div style={lineStyle} />
      </div>
    );
  }

  renderThisChannelData() {
    const aboutStyle = {
      color: 'slategrey',
      fontSize: '1rem'
    };
    return (
      <div>
        <div className="each-right-entry-container">
          <div className="each-drawer-title-container">
            <span style={aboutStyle}>About this Space</span>
          </div>
        </div>

        <LineItem disabled={false} title={'Information'} icon={FaInfoCircle} onClick={() => console.log('on click')}/>
      </div>
    );
  }

  renderOptionsBottom() {
    return (
      <div>
        <LineItem disabled={false} title={'Settings'} icon={FaCogs} onClick={() => console.log('on click')}/>
      </div>
    );
  }

  renderViewDropdown() {
    return <ExpandableDropdown title={'View'} childComponent={this.renderNavItems()} />;
  }

  render() {
    let masterContainerStyle = {
      zIndex: 102, // 100: map overlay, 101: view dropdown
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      flex: 1,
      // width: '10rem'
    };

    let topStaticStyle = {
      flex: 0,
      // border: '1px solid green'
    };

    let middleScrollStyle = {
      flex: 1,
      // border: '1px solid blue',
      overflowY: 'scroll'
    };

    let bottomStaticStyle = {
      flex: 0,
      // border: '1px solid orange'
    };

    return (
      <div style={masterContainerStyle as any} className="drawer-right-container">
        <div style={topStaticStyle as any}>
          <div className="drawer-right-mobile">
            {this.renderViewDropdown()}
            {this.renderLineBreak()}
          </div>
          {this.renderProfile()}
          {this.renderLineBreak()}
          {this.renderThisChannelData()}
          {this.renderOptionsBottom()}
        </div>
      </div>
    );
  }
}

export default observer(DrawerRight);
