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
import { observer } from 'mobx-react';
import { authStore, navStore } from 'stores';
import SearchNurtureBlack from '../../../assets/images/search-nurture-black.png';
import { Button } from 'antd';
var Header = (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Header.prototype.renderLoginLogout = function () {
        var history = this.props.history;
        if (authStore.authenticated) {
            return (React.createElement(Button, { onClick: function () {
                    authStore.logout();
                    history.push('/login');
                } }, "Log Out"));
        }
        else {
            return (React.createElement(Button, { onClick: function () { return history.push('/login'); } }, "Login"));
        }
    };
    Header.prototype.render = function () {
        var history = this.props.history;
        return (React.createElement("div", { className: 'header-container' },
            React.createElement("div", { className: 'header-left' },
                React.createElement("div", { className: 'header-logo', onClick: function () { return navStore.routeToDashboard(); } },
                    React.createElement("img", { src: SearchNurtureBlack, className: "logoImage" }))),
            React.createElement("div", { className: 'header-right' }, this.renderLoginLogout())));
    };
    Header = __decorate([
        observer
    ], Header);
    return Header;
}(React.Component));
export { Header };
export default Header;
//# sourceMappingURL=index.js.map