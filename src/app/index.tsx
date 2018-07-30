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

// enable MobX strict mode
useStrict(true);

const history = createBrowserHistory();
navStore.saveHistory(history);

@observer
class App extends React.Component {
  render() {
    return (
      <IconContext.Provider value={{ className: "global-icon-classname" }}>
        <div className={'app'}>
          <Router history={history}>
            <Root history={history}>
              <Switch>
                <Route exact={true} path="/list" component={RouteHOC(ListView)} />
                <Route exact={true} path="/tile" component={RouteHOC(TileView)} />
                <Route exact={true} path="/map" component={RouteHOC(MapView)} />
                <Redirect from='*' to='/list'/>
              </Switch>
            </Root>
          </Router>
        </div>
      </IconContext.Provider>
    );
  }
}

// render react DOM
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
