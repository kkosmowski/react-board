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

  static setSession(session: Session): void {
    if (session.persisted) {
      Cookies.set(SessionKey.Token, session.token);
      Cookies.set(SessionKey.Username, session.username);
    } else {
      sessionStorage.setItem(SessionKey.Token, session.token);
      sessionStorage.setItem(SessionKey.Username, session.username);
    }
  }

  static clearSession(persisted: boolean): void {
    if (persisted) {
      Cookies.remove(SessionKey.Token);
      Cookies.remove(SessionKey.Username);
    } else {
      sessionStorage.removeItem(SessionKey.Token);
      sessionStorage.removeItem(SessionKey.Username);
    }
  }
}