import styled from 'styled-components';
import { LoginPanel } from './LoginPanel';
import { useEffect, useState } from 'react';
import { LoginFormData, MainStore, RegisterFormData, SessionState } from '@interfaces';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { RegisterPanel } from './RegisterPanel';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as sessionActions from '../store/actions/session.actions';

interface MergedProps extends SessionState {
  actions: any;
}

type AuthComponentProps = Pick<MergedProps, 'logged' | 'loginInProgress' | 'actions'>;

const AuthComponent = ({ logged, loginInProgress, actions }: AuthComponentProps) => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (logged) {
      history.goBack();
    }
  }, [logged]);

  const handleLogin = (formData: LoginFormData): void => {
    if (!loginInProgress) {
      actions.login(formData);
    }
  };

  const handleRegister = (formData: RegisterFormData): void => {
    actions.createAccount(formData).then(() => {
      history.push('/home');
    });
    // TODO: Add something more after registration is successful
  };

  return (
    <AuthWrapper>
      <Switch>
        <Route exact path={ `${ url }/login` }>
          <LoginPanel onLogin={ handleLogin } error={ loginError } />
        </Route>
        <Route exact path={ `${ url }/register` }>
          <RegisterPanel onRegister={ handleRegister } />
        </Route>
        <Route path="*">
          <Redirect to={ `${ url }/login` } />
        </Route>
      </Switch>
    </AuthWrapper>
  );
};

const mapStateToProps = ({ session }: MainStore) => ({
  logged: session.logged,
  loginInProgress: session.loginInProgress,
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