import React, { ReactElement } from 'react';
import { Auth } from '@auth';
import { UiProvider } from '@contexts';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { Shell } from '@main';
import { Provider } from 'react-redux';
import store from './store';
import { AppWrapper } from './AppWrapper';

function App(): ReactElement {
  return (
    <Provider store={ store }>
      <UiProvider>
        <AppWrapper>
          <BrowserRouter>
            <Route path="/home">
              <Shell />
            </Route>
            <Route path="/auth">
              <Auth />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </BrowserRouter>
        </AppWrapper>
      </UiProvider>
    </Provider>
  );
}

export default App;
