import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import {
  FaChevronDown,
  FaChevronUp
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
    if(this.state.dropdownOpen) {
      return <FaChevronUp />;
    } else {
      return <FaChevronDown />;
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

  // render components given as array of objects
  renderObjectList() {
    const { objectList } = this.props;
    const { dropdownOpen } = this.state;

    if (!objectList || !objectList.length) {
      return;
    }
    return dropdownOpen 
      ? (
        <div>
          { objectList.map(component => (
            <div>{component}</div>
          ))}
        </div>
      )
      : null;
  }

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
      // border: '1px solid red',
      padding: '.3rem',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    };
    return (
      <div style={titleStyle as any} className="expandable-dropdown-title-container" onClick={() => this.titlePressed()}>
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
