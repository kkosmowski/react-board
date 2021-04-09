import styled from 'styled-components';
import { LoginPanel } from './LoginPanel';
import { useEffect, useState } from 'react';
import { LoginForm, RegisterForm } from '@interfaces';
import { Redirect, Route, useHistory, useRouteMatch } from 'react-router-dom';
import { RegisterPanel } from './RegisterPanel';
import { connect } from 'react-redux';
import { SessionState } from '../store/session-state.interface';
import { bindActionCreators, Dispatch } from 'redux';
import * as sessionActions from '../store/actions/session.actions';

interface AuthComponentProps {
  logged: boolean;
  actions: any;
}

const AuthComponent = ({ logged, actions }: AuthComponentProps) => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    console.log('logged', logged);
    if (logged) {
      history.goBack();
    }
  }, [logged]);

  const handleLogin = (form: LoginForm): void => {
    actions.login(form);
    // .then(
    // (success: boolean) => {}
    // );
  };

  const handleRegister = (form: RegisterForm): void => {
    // createAccount(form).then(() => {
    //   history.push('/home');
    // TODO: Add something more after registration is successful
    // });
  };

  return (
    <AuthWrapper>
      <Route path={ `${ url }/login` }>
        <LoginPanel onLogin={ handleLogin } error={ loginError } />
      </Route>
      <Route path={ `${ url }/register` }>
        <RegisterPanel onRegister={ handleRegister } />
      </Route>
      <Route path="*">
        <Redirect to={ `${ url }/login` } />
      </Route>
    </AuthWrapper>
  );
};

const mapStateToProps = (state: SessionState) => ({
  logged: state.logged,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(sessionActions, dispatch),
});

const Auth = connect(mapStateToProps, mapDispatchToProps)(AuthComponent);

export { Auth };

const AuthWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
`;