// Dependencies
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { useStrict } from 'mobx';
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
import { navStore, authStore } from 'stores';
// Utilities
import { throttle } from 'throttle-debounce';

// enable MobX strict mode
useStrict(true);

import mapStorage from './containers/MapView/mapStorage';

// creat history
const history = createBrowserHistory();

@observer
class App extends React.Component<any, any> {

  resizeThrottleTime: number;

  constructor(props) {
    super(props);
    this.state = {
      h: 0,
      w: 0
    };
    this.resizeThrottleTime = 500;
  }

  componentDidMount() {

    this.setSize();
    // set size explicitly on resize
    window.onresize = throttle(this.resizeThrottleTime, (data) => {
      this.setSize();
    });
  }

  setSize() {
    this.setState({
      w: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      h: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    })
  }

  render() {
    const { h, w } = this.state;
    let appMasterStyle = {
      height: h,
      width: w
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

// render react DOM
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
