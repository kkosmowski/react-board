import { createContext, ReactElement, useEffect, useState } from 'react';
import { LoginForm, RegisterForm, Session } from '@interfaces';
import { endpoint, endpointWithProp, SessionUtil } from '@utils';
import { HttpService } from '@services';
import { LoginFailResponse, LoginResponse, MeResponse } from '@responses';
import { CurrentUser } from '@models';
import { Result } from '../domain/interfaces/result.interface';
import { LoginPayload } from '@payloads';

interface SessionProviderProps {
  children: ReactElement | ReactElement[];
}

interface SessionContextProps {
  createAccount: (form: RegisterForm) => Promise<void>;
  createSession: (form: LoginForm) => Promise<Result<LoginResponse | LoginFailResponse>>
  currentUser: CurrentUser;
  getCurrentUser: (userId: number) => void;
  logged: boolean | null;
  logout: () => void;
  session: Session;
  setCurrentUser: (user: CurrentUser) => CurrentUser;
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
  const [currentUser, setCurrentUser] = useState<CurrentUser>(initialCurrentUser);

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
            id: data.id,
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

  const createSession = (form: LoginForm): Promise<Result<LoginResponse | LoginFailResponse>> => {
    return HttpService
      .post<LoginPayload>(endpoint.login, {
        username: form.email,
        password: form.password,
      })
      .then((response: LoginResponse) => {
        if (response.token) {
          setSession({
            token: response.token,
            email: form.email,
            persisted: form.remember,
          });
        }
        return ({
          success: !!response.token,
          payload: response,
        });
      });
  };

  const getCurrentUser = (userId: number): void => {
    if (session.token) {
      HttpService
        .get(endpointWithProp.user(userId), session.token)
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

const initialCurrentUser: CurrentUser = {
  id: NaN,
  email: '',
  username: '',
  role: null,
};

const initialData: SessionContextProps = {
  createAccount: (form: RegisterForm) => Promise.resolve(),
  createSession: (form: LoginForm) => Promise.resolve({ success: false, payload: {} }),
  currentUser: initialCurrentUser,
  getCurrentUser: (userId: number) => ({}),
  logged: null,
  logout: () => ({}),
  session: {
    email: '',
    token: '',
    persisted: false,
  },
  setCurrentUser: (initialUser: CurrentUser) => initialUser,
};

const SessionContext = createContext<SessionContextProps>(initialData);

export { SessionProvider, SessionContext };