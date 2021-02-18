import React, { ReactElement } from 'react';
import { Auth } from '@auth';
import styled from 'styled-components';
import { DataProvider } from '@contexts';
import { BrowserRouter, Route } from 'react-router-dom';
import { Shell } from '@main';

const AppWrapper = styled.div`
  height: 100%;
`;

function App(): ReactElement {
  return (
    <DataProvider>
      <AppWrapper>
        <BrowserRouter>
          <Route path="/auth" component={ Auth } />
          <Route path="/" component={ Shell } />
        </BrowserRouter>
      </AppWrapper>
    </DataProvider>
  );
}

export default App;
