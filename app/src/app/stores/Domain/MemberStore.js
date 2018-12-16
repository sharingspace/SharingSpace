import { observable, action, runInAction, decorate, toJS } from 'mobx';
import axios from 'axios'

class MembersStore {
  constructor() {
    this.members = [];
    this.fetchingData = false;
  }

  async getToken() {
    const response = await axios({
      method: 'post',
      url: 'https://app.sharing.space/oauth/token',
      data: {
        grant_type: 'client_credentials',
        client_id: 2,
        client_secret: 'oyEZ2fZK48SPQizdWyIc5kPupYbxy8trumTMCerw'
      }
    })
    return response.data.access_token
  }

  async generateToken() {
    const tokenName = 'bearer_tkn'
    const token = await this.getToken()
    localStorage.setItem(tokenName, `${Bearer} ${token}`)

    return localStorage.getItem(tokenName)
  }

  async checkToken() {
    const tokenName = 'bearer_tkn'
    const existingToken = localStorage.getItem(tokenName)
    if (existingToken) { // if a token exists, check expiration
      try {
        const members = await this.getMembers(existingToken) // try to query members
        if (members.data.length) {
          console.log('[!] token not expired, returning')
          return existingToken
        } else {
          console.log('[!] token might be expired inside if, regenerate', e.message)
          return await this.generateToken()
        }
      } catch(e) {
        console.log('[!] caught e: token might be expired, regenerate', e.message)
        return await this.generateToken()
      }
    } else {
      console.log('[!] no existing token, generate')
      return await this.generateToken()
    }
  }

  async getMembers(token) {
    try {
      const url = 'https://app.sharing.space/api/v1/members?per_page=10'
      const response = await axios({
        method: 'post',
        url,
        headers: {
          Authorization: token
        }
      })
      return response.data;
    } catch (e) {
      throw e
    }
  }

  // @action('Getting members from laravel api')
  async fetchMembers() {
    this.fetchingData = true;
    const token = await this.checkToken()
    const members = await this.getMembers(token)

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