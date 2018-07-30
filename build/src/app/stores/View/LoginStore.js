var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { observable, action } from 'mobx';
import { authStore, navStore, profileStore } from '../../stores/index';
var LoginStore = (function () {
    function LoginStore() {
        var _this = this;
        this.loggingIn = false;
        this.errorMessage = '';
        this.setErrorMessage = function (errMessage) {
            _this.errorMessage = errMessage;
        };
        this.setLoggingIn = function (value) {
            _this.loggingIn = value;
        };
        this.login = function (loginValues) {
            _this.setLoggingIn(true);
            authStore.login(loginValues)
                .then(function (res) {
                if (res.ok) {
                    authStore.saveToken(res.json.auth_token);
                    _this.setLoggingIn(false);
                    profileStore.getProfiles();
                    navStore.routeToHome();
                }
                else {
                    _this.setLoggingIn(false);
                    if (res.json.non_field_errors) {
                        _this.setErrorMessage(res.json.non_field_errors);
                    }
                }
            });
        };
    }
    __decorate([
        observable,
        __metadata("design:type", Boolean)
    ], LoginStore.prototype, "loggingIn", void 0);
    __decorate([
        observable,
        __metadata("design:type", String)
    ], LoginStore.prototype, "errorMessage", void 0);
    __decorate([
        action,
        __metadata("design:type", Object)
    ], LoginStore.prototype, "setErrorMessage", void 0);
    __decorate([
        action,
        __metadata("design:type", Object)
    ], LoginStore.prototype, "setLoggingIn", void 0);
    __decorate([
        action,
        __metadata("design:type", Object)
    ], LoginStore.prototype, "login", void 0);
    return LoginStore;
}());
export default LoginStore;
//# sourceMappingURL=LoginStore.js.map