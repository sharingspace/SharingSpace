var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { observable, action, runInAction } from 'mobx';
import { login, checkToken } from 'apiCalls';
import { saveToken, deleteToken } from '../../services/tokenHandlers';
var AuthStore = (function () {
    function AuthStore() {
        var _this = this;
        this.authenticated = false;
        this.loggingIn = false;
        this.isStaff = false;
        this.isAdmin = false;
        this.checkingToken = false;
        this.saveToken = function (token) {
            saveToken(token);
        };
        this.checkToken = function (cb) {
            _this.checkingToken = true;
            checkToken()
                .then(function (res) {
                runInAction(function () {
                    _this.checkingToken = false;
                    if (res.ok) {
                        _this.authenticated = true;
                    }
                    else {
                        _this.authenticated = false;
                    }
                    if (cb) {
                        cb(_this.authenticated);
                    }
                });
            })
                .catch(function (err) {
                runInAction(function () {
                    _this.authenticated = false;
                    _this.checkingToken = false;
                });
                deleteToken();
                if (cb) {
                    cb();
                }
            });
        };
        this.login = function (params) {
            return new Promise((function (resolve) {
                var loginData = {
                    username: params.userName,
                    password: params.password
                };
                login(loginData)
                    .then(function (res) {
                    if (res.ok) {
                        console.log("res is ok in login action", res);
                        resolve(res);
                    }
                    else {
                        console.log('res is not ok in login action', res);
                        resolve(res);
                    }
                })
                    .catch(function (err) {
                    console.log('we have a fail', err);
                    console.warn(err);
                    resolve(err);
                });
            }));
        };
        this.logout = function () {
            deleteToken();
            _this.authenticated = false;
            _this.isAdmin = false;
        };
    }
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], AuthStore.prototype, "authenticated", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], AuthStore.prototype, "loggingIn", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], AuthStore.prototype, "isStaff", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], AuthStore.prototype, "isAdmin", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], AuthStore.prototype, "checkingToken", void 0);
    __decorate([
        action,
        __metadata("design:type", Object)
    ], AuthStore.prototype, "saveToken", void 0);
    __decorate([
        action,
        __metadata("design:type", Object)
    ], AuthStore.prototype, "checkToken", void 0);
    __decorate([
        action,
        __metadata("design:type", Object)
    ], AuthStore.prototype, "login", void 0);
    __decorate([
        action,
        __metadata("design:type", Object)
    ], AuthStore.prototype, "logout", void 0);
    return AuthStore;
}());
export default AuthStore;
//# sourceMappingURL=AuthStore.js.map