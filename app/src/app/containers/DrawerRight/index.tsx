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
import ExpandableDropdown from '../ExpandableDropdown';
import { drawerStore, mapStore } from '../../stores';

const style: any = {
  topStatic: {
    flex: 0,
  },
  middleStatic: {
    flex: 1
  },
  bottomStatic: {
    flex: 0,
  },
  profileContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
  },
  profileImageContainer: {
    marginRight: '0.5rem'
  },
  profileImage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '2.5rem',
    width: '2.5rem',
    borderRadius: '1.25rem',
    border: '1px solid #ffffff',
  },
  profileName: {
    fontSize: '28px',
    flex: 1,
  }
};

interface LineItemProps {
  title: string;
  icon: any;
  onClick: any;
  disabled: boolean;
}

class LineItem extends React.Component<LineItemProps, any> {
  render() {
    const functionToFire = this.props.onClick;
    const Icon = this.props.icon;

    // this is to prevent map nav from working until map is loaded
    // if(this.props.disabled) {
    //   functionToFire = (e) => {
    //     // do nothing with the function
    //   };
    //   inlineStyle.color = 'lightgrey';
    // }

    return (
      <div className="each-right-entry-container" onClick={(e) => functionToFire(e)}>
        <div className="each-drawer-icon-container"><Icon /></div>
        <div className="each-drawer-title-container">{this.props.title}</div>
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
    if (!mapReadyToView) {
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
    const defaultName = 'Keira Deane';
    return (
      <div className="drawer-right-profile-container">
        <div style={style.profileContainer}>
          <div style={style.profileImageContainer}>
            <div style={style.profileImage}> {/* this is the circle */}
              <FaUserPlus size={25} />
            </div>
          </div>
          <div style={style.profileName} onClick={() => console.log('tba')}>{defaultName}</div>
        </div>
      </div>
    );
  }

  renderMenu() {
    return (
      <div>
        <LineItem 
          disabled={false} 
          title={'Messages'} 
          icon={FaEnvelope} 
          onClick={() => console.log('tba')}
        />
        <LineItem 
          disabled={false} 
          title={'Controls'} 
          icon={FaCog} 
          onClick={() => console.log('tba')}
        />
        <LineItem 
          disabled={false} 
          title={'Information'} 
          icon={FaInfoCircle} 
          onClick={() => console.log('tba')}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="drawer-right-container">
        <div style={style.topStatic}>
          <div className="drawer-right-mobile">
            <ExpandableDropdown title={'View'} childComponent={this.renderNavItems()} />
          </div>
        </div>
        <div style={style.middleStatic}>
          {this.renderProfile()}
          {this.renderMenu()}
          <LineItem disabled={false} title={'Settings'} icon={FaCogs} onClick={() => console.log('[!] on click')}/>
        </div>
      </div>
    );
  }
}

export default observer(DrawerRight);
