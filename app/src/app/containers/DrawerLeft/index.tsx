import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import {
  FaTh,
  FaClone,
  FaShareAlt
} from 'react-icons/fa';

const style: any = {
  mainRenderContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flex: 1,
    backgroundColor: '#333333'
  },
  topStatic: { flex: 0 },
  middleStatic: { flex: 1 },
  bottomStatic: { 
    flex: 0,
    padding: '2rem 2rem 1rem 2rem',
  },
  domainContainer: { margin: '0.5rem 5rem 2rem 2rem' },
  header: {
    fontSize: '2rem',
    margin: '2rem 5rem 0rem 2rem',
    color: '#f3f3f3'
  },
  listContent: {
    paddingBottom: '1rem'
  },
  firstIcon: {
    color: '#6a6a6a',
    paddingLeft: '0px',
    paddingRight: '0px'
  },
  title: {
    color: '#6a6a6a',
    width: '8rem',
    paddingRight: '2rem'
  },
  otherIcons: {
    color: '#979797'
  },
  button: {
    
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
      <div style={style.domainContainer}>
        {temporaryList.map(temporaryWord => (
          <div key={temporaryWord} className="each-sharing-network-container" style={style.listContent}>
            <div className="each-drawer-icon-container" style={style.firstIcon}>
              <FaTh />
            </div>
            <div className="each-drawer-title-container" style={style.title}>
              {temporaryWord}
            </div>
            <div className="each-drawer-icon-container" style={style.otherIcons}>
              <FaShareAlt size={otherIconsSize} />
            </div>
            <div className="each-drawer-icon-container" style={style.otherIcons}>
              <FaClone size={otherIconsSize} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div style={style.mainRenderContainer} className="drawer-left-container">
        <div style={style.topStatic}>
          <div style={style.header}>Spaces</div>
        </div>
        <div style={style.middleStatic}>
          {this.renderDomains()}
        </div>
        <div style={style.bottomStatic}>
          <button className="add-space-button">
            New Space
          </button>
        </div>
      </div>
    );
  }
}

export default observer(DrawerLeft);
