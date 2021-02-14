import React, {ReactElement} from 'react';
import { Auth } from '@auth';
import styled from 'styled-components';

const AppWrapper = styled.div`
  height: 100%;
`;

function App(): ReactElement {
  return (
    <AppWrapper>
      <Auth/>
    </AppWrapper>
  );
}

export default App;
