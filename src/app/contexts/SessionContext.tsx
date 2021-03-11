import { createContext, ReactElement, useEffect, useState } from 'react';
import { LoginForm, RegisterForm, Session } from '@interfaces';
import { endpoint, endpointWithProp, SessionUtil } from '@utils';
import { HttpService } from '@services';
import { LoginResponse, MeResponse } from '@responses';
import { User } from '@models';

interface SessionProviderProps {
  children: ReactElement | ReactElement[];
}

interface SessionContextProps {
  createAccount: (form: RegisterForm) => Promise<void>;
  createSession: (form: LoginForm) => Promise<void>;
  currentUser: User;
  getCurrentUser: (userId: string) => void;
  logged: boolean | null;
  logout: () => void;
  session: Session;
  setCurrentUser: (user: User) => User;
}

const initialSession = {
  persisted: false,
  token: '',
  email: '',
};

const SessionProvider = ({ children }: SessionProviderProps): ReactElement => {
  const { Provider } = SessionContext;

  const [session, setSession] = useState<Session>(initialSession);
  const [logged, setLogged] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<User>(initialUser);

  useEffect(() => {
    if (session.token && session.email) {
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
            username: data.username,
            email: session.email,
            role: data.role
          });
        });
    }
  }, [logged]);

  const createAccount = (form: RegisterForm): Promise<void> => {
    return HttpService
      .post<RegisterForm>(endpoint.register, form);
  };

  const createSession = (form: LoginForm): Promise<void> => {
    return HttpService
      .post<LoginForm>(endpoint.login, form)
      .then(({ token }: LoginResponse) => {
        setSession({
          token,
          email: form.username,
          persisted: form.remember,
        });
      });
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

  const logout = (): void => {
    setLogged(false);
    SessionUtil.clearSession(session.persisted);
  };

  return (
    <Provider value={ {
      logged, session,
      createSession,
      currentUser, setCurrentUser, getCurrentUser,
      logout,
      createAccount,
    } as SessionContextProps }>
      { children }
    </Provider>
  );
};

const initialUser: User = {
  id: '',
  email: '',
  role: null,
  username: '',
};

const initialData: SessionContextProps = {
  createAccount: (form: RegisterForm) => Promise.resolve(),
  createSession: (form: LoginForm) => Promise.resolve(),
  currentUser: initialUser,
  getCurrentUser: (userId: string) => ({}),
  logged: null,
  logout: () => ({}),
  session: {
    email: '',
    token: '',
    persisted: false,
  },
  setCurrentUser: (initialUser: User) => initialUser,
};

const SessionContext = createContext<SessionContextProps>(initialData);

export { SessionProvider, SessionContext };