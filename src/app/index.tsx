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

// navStore.saveHistory(history);

// {/* <IconContext.Provider value={{ className: "global-icon-classname" }}> */}
    // </IconContext.Provider>

@observer
class App extends React.Component {
  render() {
    return (
      <div className={'app'}>
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
