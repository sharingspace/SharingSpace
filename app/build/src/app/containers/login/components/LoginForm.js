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
import { Form, Button, Input, Icon } from 'antd';
var FormItem = Form.Item;
import * as React from 'react';
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(function (field) { return fieldsError[field]; });
}
var HorizontalLoginForm = (function (_super) {
    __extends(HorizontalLoginForm, _super);
    function HorizontalLoginForm(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSubmit = function (e) {
            e.preventDefault();
            _this.props.form.validateFields(function (err, values) {
                if (!err) {
                    var loginResponse = _this.props.login(values);
                    if (loginResponse) {
                        _this.props.history.navigate('/dashboard');
                    }
                }
            });
        };
        console.log('show me props after super', _this.props);
        return _this;
    }
    HorizontalLoginForm.prototype.componentDidMount = function () {
        this.props.form.validateFields();
    };
    HorizontalLoginForm.prototype.render = function () {
        var _a = this.props.form, getFieldDecorator = _a.getFieldDecorator, getFieldsError = _a.getFieldsError, getFieldError = _a.getFieldError, isFieldTouched = _a.isFieldTouched;
        var userNameError = isFieldTouched('userName') && getFieldError('userName');
        var passwordError = isFieldTouched('password') && getFieldError('password');
        var loginError = this.props.errorMessage;
        return (React.createElement(Form, { layout: "inline", onSubmit: this.handleSubmit },
            React.createElement(FormItem, { validateStatus: 'error', help: userNameError || '' }, getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
                initialValue: '',
            })(React.createElement(Input, { prefix: React.createElement(Icon, { type: "user", style: { color: 'rgba(0,0,0,.25)' } }), placeholder: "Username", value: "" }))),
            React.createElement(FormItem, { validateStatus: 'error', help: passwordError || '' }, getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
                initialValue: '',
            })(React.createElement(Input, { prefix: React.createElement(Icon, { type: "lock", style: { color: 'rgba(0,0,0,.25)' } }), type: "password", placeholder: "Password", value: "" }))),
            React.createElement(FormItem, null,
                React.createElement(Button, { type: "primary", htmlType: "submit", disabled: hasErrors(getFieldsError()) }, "Log in")),
            React.createElement("p", null, loginError)));
    };
    return HorizontalLoginForm;
}(React.Component));
var WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);
export default WrappedHorizontalLoginForm;
//# sourceMappingURL=LoginForm.js.map