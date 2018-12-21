import { observable, action, runInAction, decorate, toJS } from 'mobx';
import axios from 'axios'

class MembersStore {
  constructor() {
    this.members = [];
    this.fetchingData = false;
  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  async getToken() {
    const response = await axios({
      method: 'post',
      url: 'https://app.sharing.space/oauth/token',
      data: {
        grant_type: 'password',
        client_id: '3',
        client_secret: '7q17kc3DonY0d2nlVCytFkrmFqI9bJL5GPRo2k4t',
        username: 'dhaval48@gmail.com',
        password: '123456'
      }
    })
    return response.data.access_token
  }

  async generateToken() {
    const tokenName = 'bearer_tkn'
    const token = await this.getToken()
    localStorage.setItem(tokenName, `Bearer ${token}`)

    return localStorage.getItem(tokenName)
  }

  async checkToken() {
    const tokenName = 'bearer_tkn'
    const existingToken = localStorage.getItem(tokenName)
    if (existingToken) { // if a token exists, check expiration
      try {
        const communities = await this.getCommunities(existingToken) // try to query communities
        const { meta, data } = communities

        if (meta.code === 200 && data.length) {
          console.log('[!] token not expired, returning')
          return existingToken
        } else {
          console.log('[! inside if] token might be expired, regenerate. error:', e.message)
          return await this.generateToken()
        }
      } catch(e) {
        console.log('[! caught e] token might be expired, regenerate. error:', e.message)
        return await this.generateToken()
      }
    } else {
      console.log('[!] no existing token, generate')
      return await this.generateToken()
    }
  }

  async getCommunities(token) {
    try {
      const url = 'https://app.sharing.space/api/v1/allcommunities'
      const response = await axios({
        headers: {
          Authorization: token,
          Accept: 'application/json'
        },
        method: 'get',
        url
      })

      if (response.status === 200) {
        console.log('[!] getCommunities response', response)
        return response.data
      }
    } catch (e) {
      console.log('[!] getcommunities error', e.message)
      throw e
    }
  }

  async getMembers(communityId, token) {
    try {
      const url = `https://app.sharing.space/api/v1/members/${communityId}`
      const response = await axios({
        method: 'get',
        url,
        headers: {
          Authorization: token,
          Accept: 'application/json'
        }
      })

      if (response.status === 200) {
        console.log('[!] getMembers response', response)
        return response.data;
      }
    } catch (e) {
      console.log('[!] getmembers error', e.message)
      throw e
    }
  }

  // @action('Getting members from laravel api')
  async fetchMembers() {
    try {
      this.fetchingData = true;
      const token = await this.checkToken()
      const communities = await this.getCommunities(token) // format: { meta: { code, message }, data }
  
      if (communities.meta.code === 200) {
        const combineMembers = async () => {
          let allMembers = []
          await this.asyncForEach(communities.data, async (community) => {
            const members = await this.getMembers(community.id, token)
            if (members.meta.code === 200) {
              allMembers = allMembers.concat(members.data)
            }
          });

          console.log('[!] COMBINED MEMBERS', allMembers)
          runInAction('Update state after fetching members', () => {
            this.members = toJS(allMembers);
            this.fetchingData = false;
          });
        }
    
        combineMembers();
      } else {
        this.fetchingData = false;
        return;
      }
    } catch(e) {
      console.log('[!] failed to fetchMembers', e.message)
      this.fetchingData = false
      throw e
    }
  };
}

decorate(MembersStore, {
  members: observable,
  fetchingData: observable,
  fetchMembers: action
})

export default MembersStore