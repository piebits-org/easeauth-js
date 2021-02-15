import axios, { AxiosInstance } from "axios";
import { EventEmitter } from "events";
import { STORE } from "../store";
import { remove_tokens, set_tokens } from "../utils/tokens";

export class ACTIONS {
  private store: STORE
  private events: EventEmitter
  private axios_instance: AxiosInstance

  constructor (store: STORE, events: EventEmitter) {
    this.store = store
    this.events = events
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
      this.events.emit('AUTH_STATE_CHANGE', {loggedin: this.store.loggedin})
    } catch (e) {
      this.events.emit('AUTH_STATE_CHANGE', {loggedin: this.store.loggedin})
      Promise.reject(e)
    }
  }

  public async resetpass(old_password: string, new_password: string): Promise<void> {
    try {
      await this.axios_instance.post('/actions/resetpass', { old_password, new_password }, {
        headers: {
          'Authorization': `Bearer ${this.store.tokens.access_token}`,
          'x-pc-app': this.store._config?.app_uname
        }
      })
    } catch (e) {
      Promise.reject(e)
    }
  }
}