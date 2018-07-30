import * as React from 'react';
import Header from '../Header';
import config from 'config';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { drawerStore } from '../../stores';
import { observer } from 'mobx-react';
import Drawer from '../Drawer';

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
export class Root extends React.Component<any, {}> {

  render() {
    return (
      <div className="root-container">

        <SwipeableDrawer
          onOpen={() => drawerStore.openDrawer()}
          onClose={() => drawerStore.closeDrawer()}
          open={drawerStore.drawerVisible}
        >
          <Drawer />
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
