import { Card, CardContent } from '@material-ui/core';
import { ReactElement, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext, SessionContext } from '@contexts';
import { ProfileRouteParams } from '@interfaces';

export function Profile(): ReactElement {
  const { userId } = useParams<ProfileRouteParams>();
  const { logged } = useContext(SessionContext);
  const { user, getUser } = useContext(DataContext);

  useEffect(() => {
    if (logged) {
      getUser(userId);
    }
  }, [userId, logged]);

  return (
    <Card className="container">
      <CardContent className="container__content">
        <p>Id: { user.id }</p>
        <p>Username: { user.username } </p>
        <p>Role: { user.role }</p>
      </CardContent>
    </Card>
  );
}