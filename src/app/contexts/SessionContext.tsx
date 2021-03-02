import { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { LoginForm, Session } from '@interfaces';
import { endpoint, SessionUtil } from '@utils';
import { HttpService } from '@services';
import { LoginResponse, MeResponse } from '@responses';
import { DataContext } from './DataContext';

interface SessionProviderProps {
  children: ReactElement | ReactElement[];
}

interface SessionContextProps {
  logged: boolean | null;
  session: Session;
  createSession: (form: LoginForm) => Promise<void>;
  logout: () => void;
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
  createSession: (form: LoginForm) => Promise.resolve(),
  logout: () => ({})
});

const SessionProvider = ({ children }: SessionProviderProps): ReactElement => {
  const { setUser } = useContext(DataContext);
  const { Provider } = SessionContext;

  const [session, setSession] = useState<Session>(initialSession);
  const [logged, setLogged] = useState<boolean | null>(null);

  useEffect(() => {
    if (session.token && session.username) {
      setLogged(true);
      SessionUtil.setSession(session);
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
      HttpService
        .get(endpoint.me, session.token)
        .then((data: MeResponse) => {
          setUser({
            username: session.username,
            role: data.role
          });
        });
    }
  }, [logged]);

  const createSession = (form: LoginForm): void => {
    HttpService
      .post<LoginForm>(endpoint.login, form)
      .then(({ token }: LoginResponse) => {
        setSession({
          token,
          username: form.username,
          persisted: form.remember,
        });
      });
  };

   const logout = (): void => {
     setLogged(false);
     SessionUtil.clearSession(session.persisted);
   }

  return (
    <Provider value={ {
      logged, session,
      createSession,
      logout,
    } as SessionContextProps }>
      { children }
    </Provider>
  );
};

export { SessionProvider, SessionContext };