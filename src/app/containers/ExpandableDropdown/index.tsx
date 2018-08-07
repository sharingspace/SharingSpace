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
    }
  }

  titlePressed() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  renderDropdownIcon() {
    if(this.state.dropdownOpen) {
      return <FaChevronUp />
    } else {
      return <FaChevronDown />
    }
  }

  renderList() {
    let list = this.props.list;
    if(this.state.dropdownOpen) {
      return <div>
        {list.map((elem, i) => {
          return <div key={i}>Each elem {i}</div>
        })}
      </div>
    } else {
      return null;
    }

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
    }
    return <div style={titleStyle as any} className='expandable-dropdown-title-container' onClick={() => this.titlePressed()}>
      <div>{this.props.title}</div>
      {this.renderDropdownIcon()}
    </div>
  }

  render() {
    return <div>
      {this.renderTitle()}
      {this.renderList()}
    </div>
  }
}

export default observer(ExpandableDropdown);
