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
        if (communities.length) {
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
      return response.data
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
      return response.data;
    } catch (e) {
      console.log('[!] getmembers error', e.message)
      throw e
    }
  }

  // @action('Getting members from laravel api')
  async fetchMembers() {
    this.fetchingData = true;
    const token = await this.checkToken()
    const communities = await this.getCommunities(token) // format: [ true, "", [{ id, name, ... }]]

    const combineMembers = async () => {
      let members = []
      await this.asyncForEach(communities[2], async (community) => { // see communities format for `communities[2]` explanation
        const communityMembers = await this.getMembers(community.id, token)
        members = members.concat(communityMembers[2])
      });

      console.log('[!] COMBINED MEMBERS', members)
      runInAction('Update state after fetching members', () => {
        this.members = toJS(members);
        this.fetchingData = false;
      });
    }

    combineMembers();
  };
}

decorate(MembersStore, {
  members: observable,
  fetchingData: observable,
  fetchMembers: action
})

export default MembersStore