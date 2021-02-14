import {createContext, ReactElement, useState} from 'react';
import {Session} from '../domain/interfaces';

interface DataProviderProps {
  children: ReactElement | ReactElement[];
}

interface DataContextProps {
  session: Session | null;
  setSession: (() => Session) | null;
}

const DataContext = createContext<DataContextProps>({
  session: null,
  setSession: null
});

const DataProvider = ({ children }: DataProviderProps): ReactElement => {
  const { Provider } = DataContext;

  const [session, setSession] = useState<Session>({
    token: '',
    username: '',
  });

  return (
    <Provider value={{
      session, setSession
    } as DataContextProps}>
      { children }
    </Provider>
  )
}

export { DataProvider };
export default DataContext;