import axiosWrapper from './axiosWrapper';
var apicalls = axiosWrapper.apicalls;
var login = function (params) { return apicalls.post('auth/token/create/', params); };
var checkToken = function () { return apicalls.get('auth/me/'); };
var getCampaigns = function (params) { return apicalls.post('ams/get_campaign_reports/', params); };
var getCampaign = function (params) { return apicalls.post('ams/get_campaign_report/', params); };
var getKeywords = function (params) { return apicalls.post('ams/get_keyword_reports/', params); };
var getKeyword = function (params) { return apicalls.post('ams/get_keyword_report/', params); };
var getProductAds = function (params) { return apicalls.post('ams/get_product_ad_reports/', params); };
var getASINDetail = function (params) { return apicalls.post('ams/get_product_ad_report/', params); };
var getProfiles = function (params) { return apicalls.get('ams/get_profiles/', params); };
var adjustBids = function (params) { return apicalls.post('ams/keywords/adjust_bids/', params); };
export { login, checkToken, getCampaigns, getKeywords, getProductAds, getASINDetail, getCampaign, getKeyword, getProfiles, adjustBids, };
//# sourceMappingURL=apiCalls.js.map