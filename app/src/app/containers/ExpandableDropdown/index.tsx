import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import {
  FaChevronDown,
  FaChevronUp,
  FaCaretUp,
  FaCaretDown,
  FaMapMarkerAlt,
  FaUserFriends
} from 'react-icons/fa';

const style: any = {
  headerIcon: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  dropdownContainer: {
    position: 'absolute',
    zIndex: 101, // 100: map overlay
    backgroundColor: 'white', 
    border: '2px solid white',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)'
  },
  dropdownItem: { 
    display: 'block', 
    paddingTop: '.5rem', 
    paddingBottom: '.5rem' 
  },
  title: {
    padding: '.3rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  mainContainer: {
    margin: '0rem -1.5rem 1.25rem 0rem'
  }
};

class ExpandableDropdown extends React.Component<any, any> {
  title: string;
  icon: any;

  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  titlePressed() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  renderDropdownIcon() {
    // isHeader: if the user sets it to the header
    // icon: FaMapMarkerAlt or FaUserFriends for the dropdowns on right header
    const { isHeader, icon } = this.props; 
    const { dropdownOpen } = this.state;
    const caretSize = 15;

    let StaticIcon;
    if (icon === 'FaMapMarkerAlt') {
      StaticIcon = FaMapMarkerAlt;
    } else if (icon === 'FaUserFriends') {
      StaticIcon = FaUserFriends;
    }

    const headerOpenIcon: any = (
      <div style={style.headerIcon}>
        <StaticIcon size={40} />
        <FaCaretDown size={caretSize} />
      </div>
    );
    const headerCloseIcon: any = (
      <div style={style.headerIcon}>
        <StaticIcon size={40} />
        <FaCaretUp size={caretSize} />
      </div>
    );

    if (dropdownOpen) {
      return isHeader ? headerCloseIcon : <FaChevronUp size={15} />;
    } else {
      return isHeader ? headerOpenIcon : <FaChevronDown size={15} />;
    }
  }

  renderList() {
    const { list } = this.props;
    const { dropdownOpen } = this.state;

    if (!list || !list.length) {
      return;
    }
    return dropdownOpen
      ? (
        <div>
          {list.map((elem, i) => {
            return <div key={i}>Each elem {i}</div>;
          })}
        </div>
      )
      : null;
  }

  closeDropdown() {
    this.setState({ dropdownOpen: false });
  }

  // currently using on header views dropdown
  // render components given as array of objects
  renderObjectList() {
    const { objectList } = this.props;
    const { dropdownOpen } = this.state;

    if (!objectList || !objectList.length) {
      return;
    }
    return dropdownOpen 
      ? (
        <div style={style.dropdownContainer}>
          { objectList.map(component => (
            <div onClick={this.closeDropdown} key={component.key} style={style.dropdownItem}>{component}</div>
          ))}
        </div>
      )
      : null;
  }

  // currently using on right nav bar views dropdown
  // render child component 
  // passed inside expandabledropdown
  renderChildComponent() {
    const { childComponent } = this.props;
    const { dropdownOpen } = this.state;

    if (!childComponent) {
      return;
    }
    return dropdownOpen ? (childComponent) : null;
  }

  renderTitle() {
    const { isHeader } = this.props;
    const className: string = isHeader ? 'expandable-dropdown-title-container' : 'expandable-dropdown-title-container-sidebar';
    return (
      <div className={className} style={style.title} onClick={() => this.titlePressed()}>
        <div>{this.props.title}</div>
        {this.renderDropdownIcon()}
      </div>
    );
  }

  render() {
    const { isHeader } = this.props;
    return (
      <div style={!isHeader ? style.mainContainer : {}}>
        {this.renderTitle()}
        {this.renderList()}
        {this.renderObjectList()}
        {this.renderChildComponent()}
      </div>
    );
  }
}

export default observer(ExpandableDropdown);
