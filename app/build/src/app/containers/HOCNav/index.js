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
import React from 'react';
import { navStore } from '../../stores';
var higherOrderComponent = function (WrappedComponent) {
    var HOC = (function (_super) {
        __extends(HOC, _super);
        function HOC() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HOC.prototype.componentWillMount = function () {
            navStore.saveHistory(this.props.history);
        };
        HOC.prototype.render = function () {
            return React.createElement(WrappedComponent, null);
        };
        return HOC;
    }(React.Component));
    return HOC;
};
export default higherOrderComponent;
//# sourceMappingURL=index.js.map