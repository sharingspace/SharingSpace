import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import {
  FaTh,
  FaClone,
  FaShareAlt
} from 'react-icons/fa';

const style = {
  container: {
    margin: '2rem 5rem 2rem 2rem',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '0.5rem'
  },
  listContent: {
    paddingBottom: '0.5rem'
  },
  firstIcon: {
    paddingLeft: '0px',
    paddingRight: '0px'
  },
  title: {
    width: '8rem',
    paddingRight: '2rem'
  }
};

class DrawerLeft extends React.Component<Props, {}> {
  renderDomains() {
    const otherIconsSize = 15;
    const temporaryList = [
      'Age of Solar',
      'Arcosanti',
      'Phx Makers',
      'Cat Lovers',
    ];

    return (
      <div style={style.container}>
        <div style={style.header}>Spaces</div>
        {temporaryList.map(temporaryWord => (
          <div key={temporaryWord} className="each-sharing-network-container" style={style.listContent}>
            <div className="each-drawer-icon-container" style={style.firstIcon}>
              <FaTh />
            </div>
            <div className="each-drawer-title-container" style={style.title}>
              {temporaryWord}
            </div>
            <div className="each-drawer-icon-container">
              <FaShareAlt size={otherIconsSize} />
            </div>
            <div className="each-drawer-icon-container">
              <FaClone size={otherIconsSize} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div className="drawer-left-container">
        {this.renderDomains()}
      </div>
    );
  }
}

export default observer(DrawerLeft);
