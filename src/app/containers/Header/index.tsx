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

import {
  NavToMapIcon,
  NavToListIcon,
  NavToGridIcon,
  NavToMembersIcon
} from '../NavIcons';

class Header extends React.Component<any, any> {

  iconSize: number;

  constructor(props) {
    super(props);
    this.iconSize = 40;
  }

  menuButtonPressed() {
    drawerStore.openDrawerRight();
  }

  navToUserList() {
    console.log('====== NAV TO USERS LIST');
  }

  renderRightMembers() {
    return <NavToMembersIcon onClick={() => this.navToUserList()} />
  }

  navTo(route) {
    this.props.history.push(route);
  }

  navToNewEntry() {
    console.log('===== NEW ENTRY');
  }

  renderRightHamburger() {
    return <div className='header-hamburger-menu-container' onClick={() => this.menuButtonPressed()}>
      <FaBars className='active-icon' size={this.iconSize} />
    </div>
  }

  renderNewEntry() {
    return <div className='header-icon-container' onClick={() => this.navToNewEntry()}>
      <FaPlusSquare size={this.iconSize} />
    </div>
  }

  renderRightMobile() {
    return <div className={'header-right-mobile'}>
      {this.renderRightHamburger()}
    </div>
  }

  renderRightDesktop() {
    return <div className={'header-right-desktop'}>
      {this.renderRightMembers()}
      <NavToGridIcon onClick={() => this.navTo('/grid')} />
      <NavToMapIcon onClick={() => this.navTo('/map')} />
      <NavToListIcon onClick={() => this.navTo('/list')} />
      {this.renderNewEntry()}
      {this.renderRightHamburger()}
    </div>
  }

  render() {
    return (
        <div className={'header-container'}>
          <div className={'header-left'}>
            <SearchInput />
          </div>

          {this.renderRightMobile()}
          {this.renderRightDesktop()}

        </div>
    );
  }
}

export default withRouter(observer(Header));
