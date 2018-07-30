import * as React from 'react';
import Header from '../Header';
import config from 'config';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { drawerStore } from '../../stores';
import { observer } from 'mobx-react';
import DrawerRight from '../DrawerRight';
import DrawerLeft from '../DrawerLeft';

const devTool = () => {
  if ( config.appEnv === 'dev' ) {
    const DevTools = require('mobx-react-devtools').default;
    return (<DevTools />);
  }
  return null;
};

export interface Props {
  history: any;
  children: any;
}

@observer
export default class Root extends React.Component<any, {}> {

  render() {
    return (
      <div className="root-container">
        <SwipeableDrawer
          onOpen={() => drawerStore.openDrawerRight()}
          onClose={() => drawerStore.closeDrawerRight()}
          open={drawerStore.drawerRightVisible}
          anchor="right"
        >
          <DrawerRight />
        </SwipeableDrawer>

        <SwipeableDrawer
          onOpen={() => drawerStore.openDrawerLeft()}
          onClose={() => drawerStore.closeDrawerLeft()}
          open={drawerStore.drawerLeftVisible}
          anchor="left"
        >
          <DrawerLeft />
        </SwipeableDrawer>

        <Header history={this.props.history}/>
        <div className={'root-children'}>
            {this.props.children}
        </div>
        {devTool()}
      </div>
    );
  }
}
