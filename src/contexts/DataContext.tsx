import Cookies from 'js-cookie';
import { createContext, ReactElement, useEffect, useState } from 'react';
import { Session } from '@interfaces';
import { SessionUtil } from '@utils';

interface DataProviderProps {
  children: ReactElement | ReactElement[];
}

interface DataContextProps {
  session: Session | null;
  setSession: ((session: Session) => Session);
  logged: boolean | null;
  setLogged: ((logged: boolean) => boolean);
}

const initialSession = {
  token: '',
  username: '',
  persisted: false,
};

const DataContext = createContext<DataContextProps>({
  session: null,
  setSession: (initialSession: Session) => initialSession,
  logged: null,
  setLogged: (logged: boolean) => logged,
});

const DataProvider = ({ children }: DataProviderProps): ReactElement => {
  const { Provider } = DataContext;

  const [session, setSession] = useState<Session>(initialSession);
  const [logged, setLogged] = useState<boolean | null>(null);

  useEffect(() => {
    if (session.token && session.username) {
      setLogged(true);

      if (session.persisted) {
        Cookies.set('token', session.token);
        Cookies.set('username', session.username);
      } else {
        sessionStorage.setItem('token', session.token);
        sessionStorage.setItem('username', session.username);
      }
    } else {
      const alreadyLogged: Session | null = SessionUtil.alreadyLogged();

      if (alreadyLogged) {
        setSession(alreadyLogged);
      } else {
        setLogged(false);
      }
    }
  }, [session]);

  return (
    <Provider value={ {
      session, setSession,
      logged,
    } as DataContextProps }>
      { children }
    </Provider>
  );
};

export { DataProvider, DataContext };