import { ReactElement, useEffect } from 'react';
import { HeaderLogo } from './HeaderLogo';
import { HeaderToolbar } from './HeaderToolbar';
import { MainStore } from '../../store/main-store.interface';
import { connect } from 'react-redux';
import { SessionState } from '@store';
import * as sessionActions from '../../store/actions/session.actions';
import { bindActionCreators, Dispatch } from 'redux';

interface MergedProps extends SessionState {
  actions: any;
}

type HeaderComponentProps = Pick<MergedProps, 'logged' | 'currentUser' | 'actions'>

export function HeaderComponent({ logged, currentUser, actions }: HeaderComponentProps): ReactElement {

  useEffect(() => {
    console.log('headerComp', currentUser);
  }, [currentUser]);
  const onLogout = () => {
    actions.logout();
  };

  return (
    <>
      <HeaderToolbar
        logged={ logged }
        currentUser={ currentUser }
        onLogout={ onLogout }
      />
      <HeaderLogo />
    </>
  );
}

const mapStateToProps = ({ session }: MainStore) => ({
  logged: session.logged,
  currentUser: session.currentUser,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(sessionActions, dispatch)
});

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);

export { Header };