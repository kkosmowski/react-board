import { SessionKey } from '@enums';
import { Session } from '@interfaces';
import Cookies from 'js-cookie';

export class SessionUtil {
  protected static persisted = false;

  static checkIfSessionExists(): Session | null {
    let token = Cookies.get(SessionKey.Token);
    let email = Cookies.get(SessionKey.Email);
    if (token && email) {
      this.persisted = true;
      return {
        email,
        token,
        persisted: this.persisted,
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
      this.persisted = true;
    } else {
      sessionStorage.setItem(SessionKey.Token, session.token);
      sessionStorage.setItem(SessionKey.Email, session.email);
    }
  }

  static clearSession(): void {
    if (this.persisted) {
      Cookies.remove(SessionKey.Token);
      Cookies.remove(SessionKey.Email);
    } else {
      sessionStorage.removeItem(SessionKey.Token);
      sessionStorage.removeItem(SessionKey.Email);
    }
  }
}