import axios, { AxiosInstance} from "axios";
import { EventEmitter } from "events";
import { ACTIONS } from "../actions";
import { STORE } from "../store";
import { set_tokens } from "../utils/tokens";
import { EMAILPASS_SIGNIN_CONFIG, EMAILPASS_SIGNUP_CONFIG } from "./types";

export class EMAILPASS {
  private store: STORE
  private events: EventEmitter
  private axios_instance: AxiosInstance = axios.create({
    baseURL: 'https://easeauth.cloud.piebits.org',
    timeout: 10000
  })

  constructor(store: STORE, events: EventEmitter) {
    this.store = store
    this.events = events
    this.axios_instance = axios.create({
      baseURL: 'https://easeauth.cloud.piebits.org',
      timeout: 10000,
      headers: {
        'x-pc-app': this.store._config?.app_uname
      }
    })
  }

  public async signup(config: EMAILPASS_SIGNUP_CONFIG): Promise<void> {
    const { data } = await this.axios_instance.post('/provider/emailpass/signup', config)
    await set_tokens(data)
    this.store.tokens = data
    const actions = new ACTIONS(this.store, this.events)
    await actions.getuser()
    this.store.loggedin = true
    this.events.emit('AUTH_STATE_CHANGE', {loggedin: this.store.loggedin})
  }

  public async signin(config: EMAILPASS_SIGNIN_CONFIG): Promise<void> {
    const { data } = await this.axios_instance?.post('/provider/emailpass/signin', config)
    await set_tokens(data)
    this.store.tokens = data
    const actions = new ACTIONS(this.store, this.events)
    await actions.getuser()
    this.store.loggedin = true
    this.events.emit('AUTH_STATE_CHANGE', {loggedin: this.store.loggedin})
  }
}