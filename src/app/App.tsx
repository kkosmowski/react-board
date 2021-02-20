import { ReactElement } from 'react';
import { Auth } from '@auth';
import styled, { ThemeProvider } from 'styled-components';
import { DataProvider, SessionProvider } from '@contexts';
import { BrowserRouter, Route } from 'react-router-dom';
import { Shell } from '@main';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;


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

function App(): ReactElement {
  return (
    <DataProvider>
      <SessionProvider>
        <MuiThemeProvider theme={ theme }>
          <ThemeProvider theme={ theme }>
            <AppWrapper>
              <BrowserRouter>
                <Route path="/auth" component={ Auth } />
                <Route path="/" component={ Shell } />
              </BrowserRouter>
            </AppWrapper>
          </ThemeProvider>
        </MuiThemeProvider>
      </SessionProvider>
    </DataProvider>
  );
}

export default App;
