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
import { drawerStore, navStore } from '../../stores';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router';
import SearchInput from '../SearchInput';


class NavIconParentClass extends React.Component<any, any> {
  iconSize: number;
  constructor(props) {
    super(props);
    this.iconSize = 40;
  }
}

export class NavToMapIcon extends NavIconParentClass<any, any> {
  render() {
    return <div className='view-select-button-container' onClick={() => this.props.onClick()}>
      <FaLocationArrow size={this.iconSize}/>
    </div>
  }
}

export class NavToListIcon extends NavIconParentClass<any, any> {
  render() {
    return <div className='view-select-button-container' onClick={() => this.props.onClick()}>
      <FaList size={this.iconSize}/>
    </div>
  }
}

export class NavToGridIcon extends NavIconParentClass<any, any> {
  render() {
    return <div className='view-select-button-container' onClick={() => this.props.onClick()}>
      <FaTh size={this.iconSize}/>
    </div>
  }
}

export class NavToMembersIcon extends NavIconParentClass<any, any> {
  render() {
    return <div className='header-icon-container' onClick={() => this.props.onClick()}>
      <FaUserFriends size={this.iconSize} />
    </div>
  }
}
