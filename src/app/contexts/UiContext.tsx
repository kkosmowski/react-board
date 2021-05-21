import { createContext, MutableRefObject, ReactElement, useRef, useState } from 'react';

interface UiProviderProps {
  children: ReactElement | ReactElement[];
}

interface UiContextProps {
  mainElement: MutableRefObject<HTMLElement>;
  setMainElement: (element: MutableRefObject<HTMLElement>) => MutableRefObject<HTMLElement>;
}

const UiProvider = ({ children }: UiProviderProps): ReactElement => {
  const { Provider } = UiContext;
  const [mainElement, setMainElement] = useState<MutableRefObject<HTMLElement>>(useRef(document.body));

  return (
    <Provider value={ {
      mainElement, setMainElement,
    } as UiContextProps }>
      { children }
    </Provider>
  );
};


const initialData: UiContextProps = {
  mainElement: {} as MutableRefObject<HTMLElement>,
  setMainElement: (element: MutableRefObject<HTMLElement>) => element,
};

const UiContext = createContext<UiContextProps>(initialData);

export { UiProvider, UiContext };