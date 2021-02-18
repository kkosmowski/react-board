import { Session } from '@interfaces';
import Cookies from 'js-cookie';

export class SessionUtil {
  static alreadyLogged(): Session | null {
    let token = Cookies.get('token');
    let username = Cookies.get('username');
    if (token && username) {
      return {
        username,
        token,
        persisted: true,
      };
    } else {
      let token = sessionStorage.getItem('token');
      let username = sessionStorage.getItem('username');
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