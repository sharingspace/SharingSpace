// example code on how to handle models in typescript
// these can be used when pulling data from the backend
// models should match the backend

// class Campaign {
//   campaign_id: number;
//   campaign_type: string;
//   daily_budget: number;
//   name: string;
//   premium_bid_adjustment: boolean;
//   start_date: string;
//   state: string;
//
//   constructor(campaign_id: number,
//               campaign_type: string,
//               daily_budget: number,
//               name: string,
//               premium_bid_adjustment: boolean,
//               start_date: string,
//               state: string) {
//     this.campaign_id = campaign_id;
//     this.campaign_type = campaign_type;
//     this.daily_budget = daily_budget;
//     this.name = name;
//     this.premium_bid_adjustment = premium_bid_adjustment;
//     this.start_date = start_date;
//     this.state = state;
//   }
// }
//
// class Keyword {
//   bid: number;
//   branded: boolean;
//   campaign_id: number;
//   campaign_name: string;
//   keyword_id: number;
//   keyword_text: string;
//   match_type: string;
//   state: string;
//
//   constructor(bid: number,
//     branded: boolean,
//     campaign_id: number,
//     campaign_name: string,
//     keyword_id: number,
//     keyword_text: string,
//     match_type: string,
//     state: string
//   ) {
//
//     this.bid = bid;
//     this.branded = branded;
//     this.campaign_id = campaign_id;
//     this.campaign_name = campaign_name;
//     this.keyword_id = keyword_id;
//     this.keyword_text = keyword_text;
//     this.match_type = match_type;
//     this.state = state;
//
//   }
// }
//
// class ProductAd {
//   ad_group_id: number;
//   asin: string;
//   campaign_name: string;
//   state: string;
//
//   constructor(ad_group_id: number,
//               asin: string,
//               campaign_name: string,
//               state: string) {
//
//     this.ad_group_id = ad_group_id;
//     this.asin = asin;
//     this.campaign_name = campaign_name;
//     this.state = state;
//   }
// }
//
// class NegativeKeyword {
//   id: string
//
//   constructor(id) {
//     this.id = id;
//   }
// }
//
// class AdGroup {
//   id: string
//
//   constructor(id) {
//     this.id = id;
//   }
// }
//
// class Profile {
//   accountInfo: any;
//   countryCode: string;
//   currencyCode: string;
//   profileId: number;
//   timezone: string;
//
//   constructor(
//     accountInfo,
//     countryCode,
//     currencyCode,
//     profileId,
//     timezone,
//   ) {
//     this.accountInfo = accountInfo;
//     this.countryCode = countryCode;
//     this.currencyCode = currencyCode;
//     this.profileId = profileId;
//     this.timezone = timezone;
//   }
// }
//
// export {
//   AdGroup,
//   Campaign,
//   Keyword,
//   ProductAd,
//   NegativeKeyword,
//   Profile
// }
