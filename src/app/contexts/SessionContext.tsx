import { createContext, ReactElement, useEffect, useState } from 'react';
import { LoginForm, Session } from '@interfaces';
import { endpoint, endpointWithProp, SessionUtil } from '@utils';
import { HttpService } from '@services';
import { LoginResponse, MeResponse } from '@responses';
import { User } from '@models';

interface SessionProviderProps {
  children: ReactElement | ReactElement[];
}

interface SessionContextProps {
  logged: boolean | null;
  session: Session;
  createSession: (form: LoginForm) => Promise<void>;
  logout: () => void;
  currentUser: User;
  setCurrentUser: (user: User) => User;
  getCurrentUser: (userId: string) => void;
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
  const [currentUser, setCurrentUser] = useState<User>(initialUser);

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
          setCurrentUser({
            id: '1',
            username: session.username,
            role: data.role
          });
        });
    }
  }, [logged]);

  const createSession = (form: LoginForm): Promise<void> => {
    return HttpService
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

  const getCurrentUser = (userId: string): void => {
    if (session.token) {
      HttpService
        .get(endpointWithProp.user(userId), session.token)
        .then((user: Partial<User>) => ({
          ...user,
          id: userId,
        }) as User)
        .then(setCurrentUser);
    }
  };

  return (
    <Provider value={ {
      logged, session,
      createSession,
      currentUser, setCurrentUser, getCurrentUser,
      logout,
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
  currentUser: initialUser,
  setCurrentUser: (initialUser: User) => initialUser,
  getCurrentUser: (userId: string) => ({}),
};

const SessionContext = createContext<SessionContextProps>(initialData);

export { SessionProvider, SessionContext };