import React, {ReactElement} from 'react';
import { Auth } from '@auth';
import styled from 'styled-components';
import {DataProvider} from '@contexts';

const AppWrapper = styled.div`
  height: 100%;
`;

function App(): ReactElement {
  return (
    <DataProvider>
      <AppWrapper>
        <Auth/>
      </AppWrapper>
    </DataProvider>
  );
}

export default App;
