import { Card, CardContent } from '@material-ui/core';
import { ReactElement, useContext, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { DataContext } from '@contexts';
import { ProfileRouteParams } from '@interfaces';
import { MainStore, SessionState } from '@store/interfaces';
import { BackButton } from '@main';
import { TimeUtil } from '@utils';
import { DateFormat } from '@enums';
import { bindActionCreators, Dispatch } from 'redux';
import * as sessionActions from '../../store/actions/session.actions';
import { connect } from 'react-redux';

interface MergedProps extends SessionState {
  actions: any;
}

type ProfileComponentProps = Pick<MergedProps, 'logged'>;

function ProfileComponent({ logged }: ProfileComponentProps): ReactElement {
  const { userId } = useParams<ProfileRouteParams>();
  const { user, getUser } = useContext(DataContext);

  useEffect(() => {
    if (logged && userId) {
      getUser(parseInt(userId));
    }
  }, [userId, logged]);

  return (
    <>
      <BackButton />
      <div className="root-container">
        <Card>
          <CardContent className="container__content">
            <p>Id: { user.id }</p>
            <p>Email: { user.email }</p>
            <p>Username: { user.username }</p>
            <p>Post count: { user.post_count }</p>
            <p>Joined at: { TimeUtil.format(user.date_joined, DateFormat.Date) }</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

const mapStateToProps = ({ session }: MainStore) => ({
  logged: session.logged,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(sessionActions, dispatch),
});

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);

export { Profile };
