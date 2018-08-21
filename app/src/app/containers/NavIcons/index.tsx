import * as React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import {
  FaBars,
  FaLocationArrow,
  FaList,
  FaUserFriends,
  FaPlusSquare,
  FaTh
} from 'react-icons/fa';
import { drawerStore, navStore, mapStore } from '../../stores';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router';
import SearchInput from '../SearchInput';


interface NavIconParentProps {
  onClick: any
}

class NavIconParentClassUbObserved extends React.Component<NavIconParentProps, any> {
  iconSize: number;
  constructor(props) {
    super(props);
    this.iconSize = 40;
  }
}
let NavIconParentClass = observer(NavIconParentClassUbObserved);


class NavToMapIconUnObserved extends NavIconParentClass {
  componentWillReact() {
    console.log('map icon reacts')
  }

  render() {
    const { mapReadyToView } = mapStore;
    let inlineStyle: any = {};
    let functionToFireOnClick = this.props.onClick;

    // this is to prevent button from working while map is loading
    // if(!mapReadyToView) {
    //   inlineStyle.color = 'lightgrey';
    //   functionToFireOnClick = () => {
    //     console.log('do nothing')
    //   }
    // }

    return <div
      className='view-select-button-container'
      style={inlineStyle}
      onClick={() => functionToFireOnClick()}
    >
      <FaLocationArrow size={this.iconSize}/>
    </div>
  }
}
export let NavToMapIcon = observer(NavToMapIconUnObserved);

export class NavToListIcon extends NavIconParentClass {
  render() {
    return <div className='view-select-button-container' onClick={() => this.props.onClick()}>
      <FaList size={this.iconSize}/>
    </div>
  }
}

export class NavToGridIcon extends NavIconParentClass {
  render() {
    return <div className='view-select-button-container' onClick={() => this.props.onClick()}>
      <FaTh size={this.iconSize}/>
    </div>
  }
}

export class NavToMembersIcon extends NavIconParentClass {
  render() {
    return <div className='header-icon-container' onClick={() => this.props.onClick()}>
      <FaUserFriends size={this.iconSize} />
    </div>
  }
}

export class HamburgerIcon extends NavIconParentClass {
  render() {
    return <div className='header-hamburger-menu-container' onClick={() => this.props.onClick()}>
      <FaBars className='active-icon' size={this.iconSize} />
    </div>
  }
}
