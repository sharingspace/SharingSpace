import { observable, action, runInAction, decorate, toJS } from 'mobx';

class MembersStore {
  constructor() {
    this.members = [];
    this.fetchingData = false;
  }

  async getMembers() {
    const url = 'https://app.sharing.space/api/v1/members?per_page=10'
    const accept = 'application/json'
    const authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc1NDFhNWE5N2QzNzJjZTUwNTU5ODQ1NjlkOTMxNGViYjFhNmE1YTI5NTkxZDc3ZGM1NjBjYWMzZDhhMDliYjRjOGI2YjRjNzRkYTkxNTFkIn0.eyJhdWQiOiIyIiwianRpIjoiNzU0MWE1YTk3ZDM3MmNlNTA1NTk4NDU2OWQ5MzE0ZWJiMWE2YTVhMjk1OTFkNzdkYzU2MGNhYzNkOGEwOWJiNGM4YjZiNGM3NGRhOTE1MWQiLCJpYXQiOjE1NDQ4MDgzNDksIm5iZiI6MTU0NDgwODM0OSwiZXhwIjoxNTc2MzQ0MzQ5LCJzdWIiOiIiLCJzY29wZXMiOltdLCJjb21tdW5pdHkiOnsiY29tbXVuaXR5X2lkIjoyMDAwMCwidXNlcl9pZCI6Mn19.E5Rk9GSQENLhejGaZwHLyvCm1aMKLdKUzhZ0-xKDjaIv7bhuLy2j6dSdSehDBIm2xISt0IYeOdU7Cmsc708jpf4m6gj6Iu9B9lx2DLB-g5_UY79ZZoo9NRKT1PIUX6Td3L44fzrhXkswptVWQ9zxaRFHOC5FIjHAPkdtQOeJn_EeL-BzxvcjoZOnmhhZCfspz4QwFy9kzb4dTszo0vBMMoBt_9pXyQI2JPwX1tooCxJpN6gLRo9q1-XMvEZv_30k2qLhuSPGsk8eZPr6I_wuoHwKUFnShnzFpU6GtbkvzSgE3aYVWYGPn2htT7dJA01-690-q7G6opHbCaHEMbRtohYo1HwSNaNYH4Plif3KDGlH5KlFaLQ7pNBHr9EA0d6dQqivG_fBTMoP_zCmnaXE5ZLU7TWi6QnXlfc83TpksUMaJdBIfbEHIGSTnEi60_pLyYGGYFYZZ4ZryqoW9uQuMR0erp42LxgKujTfU3R8Pn5GoWZLul5v_4gMwx2zvJMmAhtmk_Cd8HR0ccpAM9j_7nduScgOj8kkARMj6L_XUylExjEYan8mvOzA_eRMknYg5rmU8xjWe0HJ9DTM9PHCEn5NpCOwfgtcmJ-XtrHqRL1lhhGcQWDzGeBUPlLe_2xsiQ2-56ulIDSqPHluYSIB78ooNzGNG2mhomOYB6xCCis'
    const response = await fetch(url, {
      headers: {
        Accept: accept,
        Authorization: authorization,
        "Cache-Control": "no-cache"
      }
    })
    return await response.json();
  }

  // @action('Getting members from laravel api')
  async fetchMembers() {
    this.fetchingData = true;
    const members = await this.getMembers()

    runInAction('Update state after fetching members', () => {
      this.members = toJS(members);
      this.fetchingData = false;
    });
  };
}

decorate(MembersStore, {
  members: observable,
  fetchingData: observable,
  fetchMembers: action
})

export default MembersStore