import { SessionKey } from '@enums';
import { Session } from '@interfaces';
import Cookies from 'js-cookie';

export class SessionUtil {
  static checkIfSessionExists(): Session | null {
    let token = Cookies.get(SessionKey.Token);
    let email = Cookies.get(SessionKey.Email);
    if (token && email) {
      return {
        email,
        token,
        persisted: true,
      };
    } else {
      let token = sessionStorage.getItem(SessionKey.Token);
      let email = sessionStorage.getItem(SessionKey.Email);
      if (token && email) {
        return {
          email,
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
      Cookies.set(SessionKey.Email, session.email);
    } else {
      sessionStorage.setItem(SessionKey.Token, session.token);
      sessionStorage.setItem(SessionKey.Email, session.email);
    }
  }

  static clearSession(persisted: boolean): void {
    if (persisted) {
      Cookies.remove(SessionKey.Token);
      Cookies.remove(SessionKey.Email);
    } else {
      sessionStorage.removeItem(SessionKey.Token);
      sessionStorage.removeItem(SessionKey.Email);
    }
  }
}