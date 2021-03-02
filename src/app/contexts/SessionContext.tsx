import { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { LoginForm, Session } from '@interfaces';
import { endpoint, endpointWithProp, SessionUtil } from '@utils';
import { HttpService } from '@services';
import { LoginResponse, MeResponse } from '@responses';
import { DataContext } from './DataContext';
import { User } from '@models';

interface SessionProviderProps {
  children: ReactElement | ReactElement[];
}

interface SessionContextProps {
  logged: boolean | null;
  session: Session;
  createSession: (form: LoginForm) => Promise<void>;
  logout: () => void;
  user: User;
  setUser: (user: User) => User;
  getUser: (userId: string) => void;
}

const initialSession = {
  token: '',
  username: '',
  persisted: false,
};

const SessionProvider = ({ children }: SessionProviderProps): ReactElement => {
  const { Provider } = SessionContext;

  const [session, setSession] = useState<Session>(initialSession);
  const [logged, setLogged] = useState<boolean | null>(null);
  const [user, setUser] = useState<User>(initialUser);

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
    console.log('session', session);
  }, [session]);

  useEffect(() => {
    if (logged) {
      HttpService
        .get(endpoint.me, session.token)
        .then((data: MeResponse) => {
          setUser({
            id: '1',
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
  };

  const getUser = (userId: string): void => {
    HttpService
      .get(endpointWithProp.user(userId), session.token)
      .then((user: Partial<User>) => ({
        ...user,
        id: userId,
      }) as User)
      .then((user: User) => {
        setUser(user);
      });
  };

  return (
    <Provider value={ {
      logged, session,
      createSession,
      logout,
      user, setUser, getUser,
    } as SessionContextProps }>
      { children }
    </Provider>
  );
};

const initialUser: User = {
  id: '',
  username: '',
  role: null,
};

const initialData: SessionContextProps = {
  logged: null,
  session: {
    username: '',
    token: '',
    persisted: false,
  },
  createSession: (form: LoginForm) => Promise.resolve(),
  logout: () => ({}),
  user: initialUser,
  setUser: (initialUser: User) => initialUser,
  getUser: (userId: string) => ({}),
};

const SessionContext = createContext<SessionContextProps>(initialData);

export { SessionProvider, SessionContext };