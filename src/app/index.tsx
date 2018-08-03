// Dependencies
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router';
import { observer } from 'mobx-react';
import { IconContext } from 'react-icons';
// Containers
import Root from './containers/Root';
import ListView from './containers/ListView';
import TileView from './containers/TileView';
import MapView from './containers/MapView';
// HOC
import RouteHOC from './containers/routeHOC';
// Stores
import { navStore, authStore, sizeStore } from 'stores';
// Utilities
import _ from 'lodash'


import mapStorage from './containers/MapView/mapStorage';

// creat history
const history = createBrowserHistory();

class App extends React.Component<any, any> {

  resizeThrottleTime: number;

  constructor(props) {
    super(props);
    this.resizeThrottleTime = 500;
  }

  componentDidMount() {

    this.setSize();
    // set size explicitly on resize
    window.onresize = _.throttle((data) => {
      setInterval(() => {
        this.setSize();
      }, 100)
    }, this.resizeThrottleTime, {
      leading: true,
      trailing: true
    });
  }

  setSize() {
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    sizeStore.setSize(h, w);
  }

  render() {
    const { width, height } = sizeStore;
    let appMasterStyle = {
      height: height,
      width: width
    }

    return (
      <div className={'app_master_container'} style={appMasterStyle}>
        <Router history={history}>
          <Root>
            <Switch>
              <Route exact={true} path="/list" component={ListView} />
              <Route exact={true} path="/grid" component={TileView} />
              <Route exact={true} path="/map" component={MapView} />
              <Redirect from='*' to='/list'/>
            </Switch>
          </Root>
        </Router>
      </div>
    );
  }
}

const ObsevingApp = observer(App);

// render react DOM
ReactDOM.render(
  <ObsevingApp />,
  document.getElementById('root')
);
