import { SessionKey } from '@enums';
import { Session } from '@interfaces';
import Cookies from 'js-cookie';

export class SessionUtil {
  static checkIfSessionExists(): Session | null {
    let token = Cookies.get(SessionKey.Token);
    let username = Cookies.get(SessionKey.Username);
    if (token && username) {
      return {
        username,
        token,
        persisted: true,
      };
    } else {
      let token = sessionStorage.getItem(SessionKey.Token);
      let username = sessionStorage.getItem(SessionKey.Username);
      if (token && username) {
        return {
          username,
          token,
          persisted: false,
        };
      }
      return null;
    }
  }
}