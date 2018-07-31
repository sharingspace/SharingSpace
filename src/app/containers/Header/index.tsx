import * as React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { FaBars } from 'react-icons/fa';
import { drawerStore, navStore } from '../../stores';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router';


@observer
export class Header extends React.Component<any, any> {

  constructor(props) {
    super(props);
  }

  menuButtonPressed() {
    drawerStore.openDrawerRight();
  }

  renderRightMembers() {
    return <div>
      members icon
    </div>
  }

  navTo(route) {
    this.props.history.push(route);
  }

  renderRightViewSelect() {
    return (
      <Switch>
        <Route path="/list" >
          <div className='view-select-button-container' onClick={() => this.navTo('/grid')}>
            Grid
          </div>
        </Route>
        <Route path="/grid" >
          <div className='view-select-button-container' onClick={() => this.navTo('/map')}>
            Map
          </div>
        </Route>
        <Route path="/map" >
          <div className='view-select-button-container' onClick={() => this.navTo('/list')}>
            List
          </div>
        </Route>
      </Switch>)
  }

  renderRightHamburger() {
    return <div className='header-hamburger-menu-container' onClick={() => this.menuButtonPressed()}>
      <FaBars size={45} />
    </div>
  }

  renderRightPlusButton() {
    return <div>
      Plus button
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
              Channel name here??
            </div>

          </div>


          <div className={'header-right'}>
            {this.renderRightMembers()}
            {this.renderRightViewSelect()}
            {this.renderRightHamburger()}
          </div>
        </div>
    );
  }
}

export default withRouter(Header);
