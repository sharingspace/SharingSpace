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

@observer
export class Header extends React.Component<any, any> {

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
    return <div className='header-icon-container' onClick={() => this.navToUserList()}>
      <FaUserFriends size={this.iconSize} />
    </div>
  }

  navTo(route) {
    this.props.history.push(route);
  }

  navToNewEntry() {
    console.log('===== NEW ENTRY');
  }

  renderRightViewSelect() {
    return (
      <Switch>
        <Route path="/list" >
          <div className='view-select-button-container' onClick={() => this.navTo('/grid')}>
            <FaTh size={this.iconSize}/>
          </div>
        </Route>
        <Route path="/grid" >
          <div className='view-select-button-container' onClick={() => this.navTo('/map')}>
            <FaLocationArrow size={this.iconSize}/>
          </div>
        </Route>
        <Route path="/map" >
          <div className='view-select-button-container' onClick={() => this.navTo('/list')}>
            <FaList size={this.iconSize}/>
          </div>
        </Route>
      </Switch>)
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

  render() {
    return (
        <div className={'header-container'}>
          <div className={'header-left'}>

            <div
              onClick={() => drawerStore.openDrawerLeft()}
              className='header-title-container'
            >
              Channel name
            </div>

          </div>


          <div className={'header-right'}>
            {this.renderRightMembers()}
            {this.renderRightViewSelect()}
            {this.renderNewEntry()}
            {this.renderRightHamburger()}
          </div>
        </div>
    );
  }
}

export default withRouter(Header);
