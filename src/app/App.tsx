import { ReactElement } from 'react';
import { Auth } from '@auth';
import { ThemeProvider } from 'styled-components';
import { DataProvider } from '@contexts';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { Shell } from '@main';
import { unstable_createMuiStrictModeTheme as createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import { AppWrapper } from './AppWrapper';

function App(): ReactElement {
  return (
    <Provider store={ configureStore }>
      <DataProvider>
        <MuiThemeProvider theme={ theme }>
          <ThemeProvider theme={ theme }>
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
          </ThemeProvider>
        </MuiThemeProvider>
      </DataProvider>
    </Provider>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#2d2d2d',
      main: '#222',
      dark: '#1d1d1d',
      contrastText: '#ddd',
    },
    secondary: {
      light: '#ffcf33',
      main: '#ffc400',
      dark: '#b28900',
      contrastText: '#222',
    },
    type: 'dark'
  },
});

export default App;
