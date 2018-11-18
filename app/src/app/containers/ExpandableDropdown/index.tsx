import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import {
  FaChevronDown,
  FaChevronUp,
  FaCaretUp,
  FaMapMarkerAlt
} from 'react-icons/fa';

class ExpandableDropdown extends React.Component<any, any> {
  title: string;
  icon: any;

  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }

  titlePressed() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  renderDropdownIcon() {
    const { isHeader } = this.props; // if the user sets it to the header
    const { dropdownOpen } = this.state;

    const CloseIcon: any = isHeader 
      ? FaMapMarkerAlt 
      : FaChevronDown;

    const OpenIcon: any = isHeader
      ? FaCaretUp
      : FaChevronUp;

    const openStyle = isHeader ? { size: 40 } : {};
    const closeStyle = isHeader ? { size: 40 } : {};

    if (dropdownOpen) {
      return <OpenIcon {...openStyle} />;
    } else {
      return <CloseIcon {...closeStyle} />;
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

  // currently using on header views dropdown
  // render components given as array of objects
  renderObjectList() {
    const { objectList } = this.props;
    const { dropdownOpen } = this.state;

    const containerStyle: any = {
      position: 'absolute', 
      zIndex: 101, // 100: map overlay
      backgroundColor: 'white', 
      border: '2px solid white',
      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)'
    };

    const itemStyle: any = { 
      display: 'block', 
      paddingTop: '.5rem', 
      paddingBottom: '.5rem' 
    };

    if (!objectList || !objectList.length) {
      return;
    }
    return dropdownOpen 
      ? (
        <div style={containerStyle}>
          { objectList.map(component => (
            <div key={component.key} style={itemStyle}>{component}</div>
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
    let titleStyle = {
      padding: '.3rem',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    };
    return (
      <div className="expandable-dropdown-title-container" style={titleStyle as any} onClick={() => this.titlePressed()}>
        <div>{this.props.title}</div>
        {this.renderDropdownIcon()}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderTitle()}
        {this.renderList()}
        {this.renderObjectList()}
        {this.renderChildComponent()}
      </div>
    );
  }
}

export default observer(ExpandableDropdown);
