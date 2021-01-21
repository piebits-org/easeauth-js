import AsyncStorage from '@react-native-async-storage/async-storage'
import { TOKENS } from "../types"

export async function get_tokens(): Promise<TOKENS> {
  try {
    const access_token = await AsyncStorage.getItem('ea_access_token')
    const refresh_token = await AsyncStorage.getItem('ea_refresh_token')
    if (access_token && refresh_token) {
      return Promise.resolve({
        access_token,
        refresh_token
      })
    } else {
      return Promise.reject(new Error('unable to fetch tokens'))
    }
  } catch (e) {
    return Promise.reject(new Error('unable to fetch tokens'))
  }
}

export async function set_tokens(tokens: TOKENS): Promise<void> {
  if (tokens.access_token && tokens.refresh_token) {
    await AsyncStorage.setItem('ea_access_token', tokens.access_token)
    await AsyncStorage.setItem('ea_refresh_token', tokens.refresh_token)
  }
}

export async function remove_tokens(): Promise<void> {
  try {
    await AsyncStorage.removeItem('ea_access_token');
    await AsyncStorage.removeItem('ea_refresh_token');
  } catch {
    return Promise.reject(new Error('Unable to remove tokens'))
  }
}
