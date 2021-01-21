import { makeAutoObservable } from "mobx";
import { CONFIG, TOKENS } from "./types";

export class STORE {
  public _config: CONFIG | undefined = undefined
  public loggedin = false
  public tokens: TOKENS = {
    access_token: undefined,
    refresh_token: undefined
  }
  public user: any = undefined

  constructor() {
    makeAutoObservable(this)
  }
}