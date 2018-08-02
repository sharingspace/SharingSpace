import * as React from 'react';
import Header from '../Header';
import config from 'config';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { drawerStore } from '../../stores';
import { observer } from 'mobx-react';
import DrawerRight from '../DrawerRight';
import DrawerLeft from '../DrawerLeft';
import { withRouter } from 'react-router';


const devTool = () => {
  return null;
  if ( config.appEnv === 'dev' ) {
    const DevTools = require('mobx-react-devtools').default;
    return (<DevTools />);
  }
  return null;
};

export interface Props {
  children: any;
}

@observer
class Root extends React.Component<Props, any> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="root-container">
        <SwipeableDrawer
          onOpen={() => drawerStore.openDrawerRight()}
          onClose={() => drawerStore.closeDrawerRight()}
          open={drawerStore.drawerRightVisible}
          anchor="right"
        >
          <DrawerRight {...this.props}/>
        </SwipeableDrawer>

        <SwipeableDrawer
          onOpen={() => drawerStore.openDrawerLeft()}
          onClose={() => drawerStore.closeDrawerLeft()}
          open={drawerStore.drawerLeftVisible}
          anchor="left"
        >
          <DrawerLeft {...this.props}/>
        </SwipeableDrawer>

        <div className={'root-header-container'}>
          <Header/>
        </div>

        <div className={'root-children'}>
            {this.props.children}
        </div>

        {devTool()}

      </div>
    );
  }
}

export default withRouter(Root);
