import { ACTIONS } from './actions.ts'
import { EMAILPASS } from './providers/emailpass'
import { FACEBOOK } from './providers/facebook'
import { GOOGLE } from './providers/google'
import { STORE } from './store'
import { CONFIG } from './types'
import { get_tokens } from './utils/tokens'

export class EA {
  public emailpass: EMAILPASS | undefined
  public google: GOOGLE | undefined
  public facebook: FACEBOOK | undefined
  public store: STORE
  public actions: ACTIONS

  constructor() {
    this.store = new STORE()
    this.actions = new ACTIONS(this.store)
  }

  public async configure(config: CONFIG): Promise<void> {
    this.store._config = config
    this.emailpass = new EMAILPASS(this.store)
    this.google = new GOOGLE(this.store)
    this.facebook = new FACEBOOK(this.store)
    try {
      this.store.tokens = await get_tokens()
      await this.actions.getuser()
      this.store.loggedin = true
    } catch (e) {
      this.store.loggedin = false
    }
  }
}

export const ea = new EA()