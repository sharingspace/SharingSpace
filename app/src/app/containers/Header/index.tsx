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
import ExpandableDropdown from '../ExpandableDropdown';

import {
  NavToMapIcon,
  NavToListIcon,
  NavToGridIcon,
  NavToMembersIcon,
  HamburgerIcon,
  SharingSpaceIcon,
  TriangleDownIcon,
  NavToShapesIcon
} from '../NavIcons';

class Header extends React.Component<any, any> {

  iconSize: number;

  constructor(props) {
    super(props);
    this.iconSize = 40;
  }

  navToUserList() {
    console.log('====== NAV TO USERS LIST');
  }

  renderRightMembers() {
    return <NavToMembersIcon onClick={() => this.navToUserList()} />;
  }

  navTo(route) {
    this.props.history.push(route);
  }

  navToNewEntry() {
    console.log('===== NEW ENTRY');
  }

  renderRightHamburger() {
    return <HamburgerIcon onClick={() => drawerStore.openDrawerRight()} />;
  }

  renderLeftHamburger() {
    return <HamburgerIcon onClick={() => drawerStore.openDrawerLeft()} />;
  }

  renderNewEntry() {
    return (
      <div className="header-icon-container" onClick={() => this.navToNewEntry()}>
        <FaPlusSquare size={this.iconSize} />
      </div>
    );
  }

  renderRightMobile() {
    return (
      <div className={'header-right-mobile'}>
        {this.renderRightHamburger()}
      </div>
    );
  }

  renderRightDesktop() {
    const viewsList = [
      <NavToGridIcon key="grid" onClick={() => this.navTo('/grid')} />,
      <NavToMapIcon key="map" onClick={() => this.navTo('/map')} />,
      <NavToListIcon key="list" onClick={() => this.navTo('/list')} />,
    ];
    const membersList = [
      <NavToShapesIcon key="shapes" onClick={() => console.log('[!] shapes icon tba')} />,
      <NavToMembersIcon key="members" onClick={() => this.navToUserList()} />
    ];

    return (
      <div className={'header-right-desktop'}>
        <ExpandableDropdown objectList={viewsList} isHeader={true} icon={'FaMapMarkerAlt'} />
        <ExpandableDropdown objectList={membersList} isHeader={true} icon={'FaUserFriends'} />
        {this.renderNewEntry()}
        {this.renderRightHamburger()}
      </div>
    );
  }

  renderLeftMobile() {
    return (
      <div className="header-left-mobile">
        <SearchInput />
      </div>
    );
  }

  renderLeftDesktop() {
    return (
      <div className="header-left-desktop">
        <SharingSpaceIcon onClick={() => this.navTo('/')} />
        <TriangleDownIcon onClick={() => drawerStore.openDrawerLeft()} />
        <SearchInput />
      </div>
    );
  }

  render() {
    return (
      <div className={'header-container'}>
        {this.renderLeftMobile()}
        {this.renderLeftDesktop()}
        {this.renderRightMobile()}
        {this.renderRightDesktop()}
      </div>
    );
  }
}

export default withRouter(observer(Header));
