// Dependencies
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { useStrict } from 'mobx';
import { Router, Route, Switch, Redirect } from 'react-router';
import { observer } from 'mobx-react';

// Containers

import { Root } from './containers/Root';
import { ListView } from './containers/ListView';

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
      <div className={'app'}>
        <Router history={history}>
          <Root history={history}>
              <Switch>
                  <Route exact={true} path="/" component={RouteHOC(ListView)} />
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
