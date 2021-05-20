import { Card, CardContent } from '@material-ui/core';
import { ReactElement, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ProfileRouteParams } from '@interfaces';
import { MainStore, SessionState, UserState } from '@store/interfaces';
import { BackButton } from '@main';
import { TimeUtil } from '@utils';
import { DateFormat } from '@enums';
import { bindActionCreators, Dispatch } from 'redux';
import * as userActions from '../../store/actions/user.actions';
import { connect } from 'react-redux';
import { BreadcrumbsService } from '@services';

interface MergedProps extends SessionState, UserState {
  actions: any;
}

type ProfileComponentProps = Pick<MergedProps, 'logged' | 'user' | 'actions'>;

function ProfileComponent({ logged, user, actions }: ProfileComponentProps): ReactElement {
  const { userId } = useParams<ProfileRouteParams>();
  const location = useLocation();

  useEffect(() => {
    if (logged && userId) {
      actions.getUser(parseInt(userId));
    }
  }, [userId, logged]);

  useEffect(() => {
    if (user) {
      BreadcrumbsService.setBreadcrumbs(location.pathname);
    }
  }, [user]);

  return (
    <>
      <BackButton />
      <div className="root-container">
        <Card>
          <CardContent className="container__content">
            <p>Id: { user?.id }</p>
            <p>Email: { user?.email }</p>
            <p>Username: { user?.username }</p>
            <p>Post count: { user?.post_count }</p>
            <p>Joined at: { user ? TimeUtil.format(user.date_joined, DateFormat.Date) : '' }</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

const mapStateToProps = ({ session, user }: MainStore) => ({
  logged: session.logged,
  user: user.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(userActions, dispatch),
});

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);

export { Profile };
