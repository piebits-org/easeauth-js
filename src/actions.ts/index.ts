import axios, { AxiosInstance } from "axios";
import { STORE } from "../store";
import { remove_tokens, set_tokens } from "../utils/tokens";

export class ACTIONS {
  public store: STORE
  public axios_instance: AxiosInstance

  constructor (store: STORE) {
    this.store = store
    this.axios_instance = axios.create({
      baseURL: 'https://easeauth.cloud.piebits.org',
      timeout: 10000
    })
  }

  public async getuser(): Promise<void> {
    try {
      const { data } = await this.axios_instance.get('/actions/fetch/user', {
        headers: {
          'Authorization': `Bearer ${this.store.tokens.access_token}`,
          'x-pc-app': this.store._config?.app_uname
        }
      })
      const obj = {
        id: data._id,
        provider: data.provider,
        status: data.status,
        ...data.data
      }
      this.store.user = obj
    } catch (e) {
      if (e.response.status === 401) {
        await this.refresh()
      } else {
        Promise.reject(e)
      }
    }
  }

  public async refresh(): Promise<void> {
    try {
      const { data } = await this.axios_instance.post('/actions/refresh', { refreshToken: this.store.tokens.refresh_token }, {
        headers: {
          'Authorization': `Bearer ${this.store.tokens.access_token}`,
          'x-pc-app': this.store._config?.app_uname
        }
      })
      set_tokens(data)
      this.store.tokens = data
      await this.getuser()
    } catch (e) {
      Promise.reject(e)
    }
  }

  public async logout(): Promise<void> {
    try {
      await this.axios_instance.post('/actions/logout', { refreshToken: this.store.tokens.refresh_token }, {
        headers: {
          'Authorization': `Bearer ${this.store.tokens.access_token}`,
          'x-pc-app': this.store._config?.app_uname
        }
      })
      await remove_tokens()
      this.store.user = undefined
      this.store.tokens.access_token = undefined
      this.store.tokens.refresh_token = undefined
      this.store.loggedin = false
    } catch (e) {
      Promise.reject(e)
    }
  }
}