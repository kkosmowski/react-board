import Cookies from 'js-cookie';
import { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { LoginForm, Session } from '@interfaces';
import { endpoint, SessionUtil } from '@utils';
import { HttpService } from '@services';
import { LoginResponse, MeResponse } from '@responses';
import { SessionKey } from '@enums';
import { DataContext } from './DataContext';

interface SessionProviderProps {
  children: ReactElement | ReactElement[];
}

interface SessionContextProps {
  logged: boolean | null;
  session: Session;
  createSession: (form: LoginForm) => void;
}

const initialSession = {
  token: '',
  username: '',
  persisted: false,
};

const SessionContext = createContext<SessionContextProps>({
  logged: null,
  session: {
    username: '',
    token: '',
    persisted: false,
  },
  createSession: (form: LoginForm) => ({})
});

const SessionProvider = ({ children }: SessionProviderProps): ReactElement => {
  const { setUser } = useContext(DataContext);
  const { Provider } = SessionContext;

  const [session, setSession] = useState<Session>(initialSession);
  const [logged, setLogged] = useState<boolean | null>(null);

  useEffect(() => {
    if (session.token && session.username) {
      setLogged(true);

      if (session.persisted) {
        Cookies.set(SessionKey.Token, session.token);
        Cookies.set(SessionKey.Username, session.username);
      } else {
        sessionStorage.setItem(SessionKey.Token, session.token);
        sessionStorage.setItem(SessionKey.Username, session.username);
      }
    } else {
      const existingSession: Session | null = SessionUtil.checkIfSessionExists();

      if (existingSession) {
        setSession(existingSession);
        setLogged(true);
      } else {
        setLogged(false);
      }
    }
  }, [session]);

  useEffect(() => {
    if (logged) {
      HttpService.get(endpoint.me, session.token).then((response: Response) => {
        response.json().then((data: MeResponse) => {
          setUser({
            username: session.username,
            role: data.role
          });
        });
      });
    }
  }, [logged]);

  const createSession = (form: LoginForm): void => {
    HttpService.post<LoginForm>(endpoint.login, form).then((response: Response) => {
      response.json().then(({ token }: LoginResponse) => {
        setSession({
          token,
          username: form.username,
          persisted: form.remember,
        });
      });
    });
  };

  return (
    <Provider value={ {
      logged, session,
      createSession,
    } as SessionContextProps }>
      { children }
    </Provider>
  );
};

export { SessionProvider, SessionContext };