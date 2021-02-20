import { User } from '@models';
import { createContext, ReactElement, useState } from 'react';

interface DataProviderProps {
  children: ReactElement | ReactElement[];
}

interface DataContextProps {
  user: User;
  setUser: (user: User) => User;
}

const initialUser: User = {
  username: '',
  role: null,
};

const initialData: DataContextProps = {
  user: initialUser,
  setUser: (initialUser: User) => initialUser,
};

const DataContext = createContext<DataContextProps>(initialData);

const DataProvider = ({ children }: DataProviderProps): ReactElement => {
  const { Provider } = DataContext;

  const [user, setUser] = useState<User>(initialUser);

  return (
    <Provider value={ {
      user, setUser
    } as DataContextProps }>
      { children }
    </Provider>
  );
};

export { DataProvider, DataContext };