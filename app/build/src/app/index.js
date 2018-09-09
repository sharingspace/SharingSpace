var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { useStrict } from 'mobx';
import { Router, Route, Switch, Redirect } from 'react-router';
import { observer } from 'mobx-react';
import { Root } from './containers/Root';
import { Login } from './containers/login';
import { Campaigns } from './containers/Dashboard/Campaigns';
import { CampaignDetail } from './containers/Dashboard/CampaignDetail';
import { Keywords } from './containers/Dashboard/Keywords';
import { ASINs } from './containers/Dashboard/ASINs';
import { ASINDetail } from './containers/Dashboard/ASINDetail';
import { KeywordDetail } from './containers/Dashboard/KeywordDetail';
import RouteHOC from './containers/routeHOC';
import { navStore, authStore } from 'stores';
useStrict(true);
var history = createBrowserHistory();
navStore.saveHistory(history);
var routeToLogin = function () {
    if (history.location.pathname !== '/' && history.location.pathname !== '/login') {
        history.push('/login');
    }
};
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        if (!authStore.checkingToken) {
            return (React.createElement("div", { className: 'app' },
                React.createElement(Router, { history: history },
                    React.createElement(Root, { history: history },
                        React.createElement(Switch, null,
                            React.createElement(Route, { exact: true, path: "/profile/:profile_id/dashboard/campaigns", component: RouteHOC(Campaigns) }),
                            React.createElement(Route, { exact: true, path: "/profile/:profile_id/dashboard/keywords", component: RouteHOC(Keywords) }),
                            React.createElement(Route, { exact: true, path: "/profile/:profile_id/dashboard/asins", component: RouteHOC(ASINs) }),
                            React.createElement(Route, { exact: true, path: "/profile/:profile_id/dashboard/campaign/:campaign_id", component: RouteHOC(CampaignDetail) }),
                            React.createElement(Route, { exact: true, path: "/profile/:profile_id/dashboard/keyword/:keyword", component: RouteHOC(KeywordDetail) }),
                            React.createElement(Route, { exact: true, path: "/profile/:profile_id/dashboard/asin/:asin_id", component: RouteHOC(ASINDetail) }),
                            React.createElement(Route, { exact: true, path: "/login", component: RouteHOC(Login) }),
                            React.createElement(Redirect, { from: '/*', to: '/profile/0/dashboard/campaigns' }))))));
        }
        return null;
    };
    App = __decorate([
        observer
    ], App);
    return App;
}(React.Component));
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=index.js.map