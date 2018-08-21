import { authStore, profileStore } from 'stores';
var NavStore = (function () {
    function NavStore() {
        var _this = this;
        this.currentPath = '';
        this.history = null;
        this.currentMatch = null;
        this.setCurrentPath = function (newPath) {
            _this.currentPath = newPath;
        };
        this.saveCurrentMatch = function (newMatch) {
            _this.currentMatch = newMatch;
        };
        this.replaceUrlWithoutReloading = function (newUrl) {
            console.warn('replace without reloading', newUrl);
            _this.history.push(newUrl);
        };
        this.saveHistory = function (historyFromHOC) {
            console.log('Saving history', historyFromHOC);
            _this.history = historyFromHOC;
        };
        this.appendProfileToRoute = function () {
            console.log('append to route');
            var profileIDInRoute = profileStore.profileIDInRoute;
            var currentProfileID = 'undefined';
            if (profileIDInRoute) {
                currentProfileID = profileIDInRoute + '';
            }
            return '/profile/' + currentProfileID;
        };
        this.routeToDashboard = function () {
            _this.route(true, _this.appendProfileToRoute() + '/dashboard/campaigns');
        };
        this.routeToCampaigns = function () {
            _this.route(true, _this.appendProfileToRoute() + '/dashboard/campaigns');
        };
        this.routeToKeywords = function () {
            _this.route(true, _this.appendProfileToRoute() + '/dashboard/keywords');
        };
        this.routeToASINS = function () {
            _this.route(true, _this.appendProfileToRoute() + '/dashboard/asins');
        };
        this.routeToCampaignDetail = function (campiagnID) {
            var newUrl = _this.appendProfileToRoute() + '/dashboard/campaign/' + campiagnID;
            console.warn('----- to campaign detail', newUrl);
            _this.route(true, newUrl);
        };
        this.routeToKeywordDetail = function (keyword) {
            _this.route(true, _this.appendProfileToRoute() + '/dashboard/keyword/' + keyword);
        };
        this.routeToASINDetail = function (asin) {
            _this.route(true, _this.appendProfileToRoute() + '/dashboard/asin/' + asin);
        };
        this.routeToHome = function () {
            _this.route(true, '/home');
        };
        this.routeToLogin = function () {
            _this.route(false, '/login');
        };
    }
    NavStore.prototype.route = function (isPrivate, route) {
        var _this = this;
        if (isPrivate) {
            authStore.checkToken(function (res) {
                console.log('Check token!!', res);
                if (res) {
                    _this.history.push(route);
                }
                else {
                    _this.history.push('/login');
                }
            });
        }
        else {
            this.history.push(route);
        }
    };
    return NavStore;
}());
export default NavStore;
//# sourceMappingURL=NavStore.js.map