import * as React from 'react';
import { observer } from 'mobx-react';
import { navStore } from 'stores';
import { Button } from 'antd';
import { FaBars } from 'react-icons/fa';
import { drawerStore } from '../../stores';


@observer
export class Header extends React.Component<any, any> {

  menuButtonPressed() {
    drawerStore.openDrawerRight();
  }

  renderRightMembers() {
    return <div>
      members icon
    </div>
  }

  renderRightViewSelect() {
    return <div>
      View select
    </div>
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
    const { history } = this.props;
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

export default Header;
