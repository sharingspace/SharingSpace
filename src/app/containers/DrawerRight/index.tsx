import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import {
  FaEnvelope,
  FaCog,
  FaInfoCircle,
  FaLocationArrow,
  FaList,
  FaTh
} from 'react-icons/fa';
import SearchInput from '../SearchInput';
import ExpandableDropdown from '../ExpandableDropdown';
import { drawerStore } from '../../stores';

interface LineItemProps {
  title: string,
  icon: any,
  onClick: any
}

class LineItem extends React.Component<LineItemProps, any> {
  render() {
    let Icon = this.props.icon;
    return <div className='each-right-entry-container' onClick={(e) => this.props.onClick(e)}>
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

  navTo(route: string) {
    const { push } = this.props.history;
    push(route);
    drawerStore.closeDrawerRight();

  }

  renderNavItems() {

    return <div>
      <LineItem title={'Grid View'} icon={FaLocationArrow} onClick={() => this.navTo('/grid') }/>
      <LineItem title={'List View'} icon={FaList} onClick={() => this.navTo('/list') }/>
      <LineItem title={'Map View'} icon={FaTh} onClick={() => this.navTo('/map') }/>
    </div>
  }

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
        <div style={profileContainer as any}>
          <div style={inlineImageStyle as any}></div>
          <div style={nameStyle as any}>{name}</div>
        </div>

        <LineItem title={'Messages'} icon={FaEnvelope} onClick={() => console.log('on click')}/>

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

      <LineItem title={'Information'} icon={FaInfoCircle} onClick={() => console.log('on click')}/>
      <LineItem title={'Controls'} icon={FaCog} onClick={() => console.log('on click')}/>

    </div>
  }

  renderOptionsBottom() {
    return (<div>
      <LineItem title={'Settings'} icon={FaCog} onClick={() => console.log('on click')}/>
    </div>)
  }

  renderChannelDropdown() {
    let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return <ExpandableDropdown title={'Channels'} list={list} >
    </ExpandableDropdown >
  }

  renderNetworksDropdown() {
    let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return <ExpandableDropdown title={'Networks'} list={list} >
    </ExpandableDropdown >
  }

  renderScrollableMiddle() {
    let scrollableStyle = {
      // border: '1px solid red',
      flex: 1,
      overflowY: 'scroll'
    }
    return <div style={scrollableStyle as any}>
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
      <div style={masterContainerStyle as any} className='drawer-right-container'>
        <div style={topStaticStyle as any}>
          {this.renderNavItems()}
          {this.renderProfile()}
          {this.renderThisChannelData()}
          {this.renderLineBreak()}
        </div>
        <div style={middleScrollStyle as any}>
        {this.renderScrollableMiddle()}
        </div>
        <div style={bottomStaticStyle as any}>
          {this.renderOptionsBottom()}
        </div>
      </div>
    );
  }
}

export default observer(DrawerRight);
