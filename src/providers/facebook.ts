import axios, { AxiosInstance } from "axios"
import { ACTIONS } from "../actions.ts"
import { STORE } from "../store"
import { set_tokens } from "../utils/tokens"
import { FACEBOOK_SIGNIN_CONFIG } from "./types"

export class FACEBOOK {
  private store: STORE
  private axios_instance: AxiosInstance = axios.create({
    baseURL: 'https://easeauth.cloud.piebits.org',
    timeout: 10000
  })

  constructor(store: STORE) {
    this.store = store
    this.axios_instance = axios.create({
      baseURL: 'https://easeauth.cloud.piebits.org',
      timeout: 10000,
      headers: {
        'x-pc-app': this.store._config?.app_uname
      }
    })
  }

  public async sigin(config: FACEBOOK_SIGNIN_CONFIG): Promise<void> {
    const { data } = await this.axios_instance.post('/provider/facebook', config)
    await set_tokens(data)
    this.store.tokens = data
    const actions = new ACTIONS(this.store)
    await actions.getuser()
    this.store.loggedin = true
  }
}