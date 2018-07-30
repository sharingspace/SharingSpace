import * as React from 'react';
import { observer } from 'mobx-react';
import { navStore } from 'stores';
import { Button } from 'antd';
import { IconContext } from 'react-icons';
import { FaBars } from 'react-icons/fa';
import { drawerStore } from '../../stores';


declare let VERSION: any;

@observer
export class Header extends React.Component<any, any> {

  menuButtonPressed() {
    drawerStore.openDrawer();
  }

  render() {
    const { history } = this.props;
    return (
      <IconContext.Provider value={{ className: "global-icon-classname" }}>
        <div className={'header-container'}>
          <div className={'header-left'}>

            <div
              onClick={() => navStore.routeToHome()}
              className='header-title-container'
            >
              TITLE
            </div>

          </div>


          <div className={'header-right'}>
            <div style={{padding: '.5rem', fontSize: '.7rem'}}>
              V.{VERSION}
            </div>
            <div className='header-hamburger-menu-container' onClick={() => this.menuButtonPressed()}>
              <FaBars size={45} />
            </div>
          </div>
        </div>
      </IconContext.Provider>
    );
  }
}

export default Header;
