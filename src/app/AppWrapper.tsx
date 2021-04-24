import styled from 'styled-components';
import { ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as sessionActions from './store/actions/session.actions';

interface AppWrapperProps {
  children: ReactElement | ReactElement[];
  actions: any;
}

function AppWrapperComponent({ children, actions }: AppWrapperProps): ReactElement {
  useEffect(() => {
    actions.checkIfSessionExists();
  },[]);

  return (
    <Wrapper>
      { children }
    </Wrapper>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(sessionActions, dispatch),
});

const AppWrapper = connect(null, mapDispatchToProps)(AppWrapperComponent);

export { AppWrapper };

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;