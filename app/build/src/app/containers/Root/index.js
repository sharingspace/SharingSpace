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
import * as React from 'react';
import Header from '../Header';
import config from 'config';
var devTool = function () {
    if (config.appEnv === 'dev') {
        var DevTools = require('mobx-react-devtools').default;
        return (React.createElement(DevTools, null));
    }
    return null;
};
var Root = (function (_super) {
    __extends(Root, _super);
    function Root() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Root.prototype.render = function () {
        return (React.createElement("div", { className: "root-container" },
            React.createElement(Header, { history: this.props.history }),
            React.createElement("div", { className: 'root-children' }, this.props.children),
            devTool()));
    };
    return Root;
}(React.Component));
export { Root };
//# sourceMappingURL=index.js.map