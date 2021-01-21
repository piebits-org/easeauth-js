export interface EMAILPASS_SIGNUP_CONFIG {
  email: string;
  password: string;
  providerData?: any;
  customData?: any;
}

export interface EMAILPASS_SIGNIN_CONFIG {
  email: string;
  password: string;
}

export interface GOOGLE_SIGNIN_CONFIG {
  code: string;
  customData?: any;
}

export interface FACEBOOK_SIGNIN_CONFIG {
  token: string;
  customData?: any;
}