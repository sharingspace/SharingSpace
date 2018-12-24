import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router';
import { observer } from 'mobx-react';
import { IconContext } from 'react-icons';

import Root from './containers/Root';
import ListView from './containers/ListView';
import TileView from './containers/TileView';
import MapView from './containers/MapView';
import HomeView from './containers/HomeView';
import MembersView from './containers/MembersView';

import RouteHOC from './containers/routeHOC';
import { navStore, sizeStore, mapStore } from 'stores';
import { throttle } from './services/utils';
const history = createBrowserHistory();

const style: any = {
  mapContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    border: '1px solid red',
    height: 1,
    width: 1,
    display: 'none'
  }
}

class App extends React.Component<any, any> {
  resizeThrottleTime: number;

  constructor(props) {
    super(props);
    this.resizeThrottleTime = 500;
  }

  componentDidMount() {
    this.setSize();
    // set size explicitly on resize
    window.onresize = throttle((data) => {
      setInterval(() => {
        this.setSize();
      }, 100);
    }, this.resizeThrottleTime, this);
  }

  setSize() {
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    sizeStore.setSize(h, w);
  }

  renderHiddenMapView() {
    // there's a crazy little bug with the Wrld3D plugin
    // I'm rendering it as a dom element but not rendered to the page
    // everything works great, but it gets stuck in a loading cycle
    // the only way to fix this is by rendering visibly on the page
    // at first load
    // no matter what page we navigat to, it will always render this view
    // as soon as the map is ready, this will be removed
    //
    // css values are set to hide it visibly even though it's 'visible' in the inspector
    // ie: it's on the dom and it's on the page, but users can't see it
    //
    // this solves my problem... don't ask why...

    const { mapReadyToView } = mapStore;
    if (mapReadyToView) {
      return null;
    }

    return (
      <div style={style.mapContainer}>
        <MapView />
      </div>
    );
  }

  render() {
    const { width, height } = sizeStore;
    const appMasterStyle = { height, width };

    return (
      <div className={'app_master_container'} style={appMasterStyle}>
        <Router history={history}>
          <Root>
            <Switch>
              <Route exact={true} path="/" component={HomeView} />
              <Route exact={true} path="/list" component={ListView} />
              <Route exact={true} path="/grid" component={TileView} />
              <Route exact={true} path="/map" component={MapView} />
              <Route exact={true} path="/members" component={MembersView} />
              <Redirect from="*" to="/"/>
            </Switch>
          </Root>
        </Router>
        {this.renderHiddenMapView()}
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
