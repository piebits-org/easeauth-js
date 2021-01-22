import { ACTIONS } from './actions'
import { EMAILPASS } from './providers/emailpass'
import { FACEBOOK } from './providers/facebook'
import { GOOGLE } from './providers/google'
import { STORE } from './store'
import { CONFIG } from './types'
import { get_tokens } from './utils/tokens'

import { EventEmitter } from 'events'

export class EA {
  public emailpass: EMAILPASS | undefined
  public google: GOOGLE | undefined
  public facebook: FACEBOOK | undefined
  public store: STORE
  public actions: ACTIONS
  public events: EventEmitter

  constructor() {
    this.store = new STORE()
    this.events = new EventEmitter()
    this.actions = new ACTIONS(this.store, this.events)
  }

  public async configure(config: CONFIG): Promise<void> {
    this.store._config = config
    this.emailpass = new EMAILPASS(this.store, this.events)
    this.google = new GOOGLE(this.store, this.events)
    this.facebook = new FACEBOOK(this.store, this.events)
    try {
      this.store.tokens = await get_tokens()
      await this.actions.getuser()
      this.store.loggedin = true
    } catch (e) {
      this.store.loggedin = false
    }
    this.events.emit('AUTH_STATE_CHANGE', {loggedin: this.store.loggedin})
  }
}

export const ea = new EA()