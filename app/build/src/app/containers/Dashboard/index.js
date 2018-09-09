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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as React from 'react';
import { observer } from 'mobx-react';
import { campaignStore } from 'stores';
import { Tabs } from 'antd';
var TabPane = Tabs.TabPane;
import Campaigns from './Campaigns';
import Keywords from './Keywords';
import ASINs from './ASINs';
var Dashboard = (function (_super) {
    __extends(Dashboard, _super);
    function Dashboard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            tabKey: '1'
        };
        return _this;
    }
    Dashboard.prototype.componentDidMount = function () {
        campaignStore.getCampaigns();
    };
    Dashboard.prototype.tabClicked = function (key) {
        this.setState({
            tabKey: key
        });
    };
    Dashboard.prototype.render = function () {
        var _this = this;
        var returnCampaigns = campaignStore.returnCampaigns;
        var tabBarStyle = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        };
        return (React.createElement("div", { className: "dashboardContainer" },
            React.createElement("div", { className: "dashboardGraphContainer" },
                React.createElement("h3", null, "Graph goes here")),
            React.createElement("div", { className: "dashboardTabsContainer" },
                React.createElement(Tabs, { key: "1", tabBarGutter: 15, animated: true, tabBarStyle: tabBarStyle, type: "card", onChange: function (key) { return _this.tabClicked(key); } },
                    React.createElement(TabPane, { forceRender: true, tab: "Campaigns", key: "1" },
                        React.createElement(Campaigns, null)),
                    React.createElement(TabPane, { forceRender: true, tab: "Keywords", key: "2" },
                        React.createElement(Keywords, null)),
                    React.createElement(TabPane, { forceRender: true, tab: "ASINs", key: "3" },
                        React.createElement(ASINs, null))))));
    };
    Dashboard = __decorate([
        observer,
        __metadata("design:paramtypes", [Object])
    ], Dashboard);
    return Dashboard;
}(React.Component));
export { Dashboard };
//# sourceMappingURL=index.js.map