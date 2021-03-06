import { Card, CardContent } from '@material-ui/core';
import { ReactElement, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SessionContext } from '@contexts';

interface ProfileRouteParams {
  userId: string;
}

export function Profile(): ReactElement {
  const { userId }: ProfileRouteParams = useParams();
  const { user, getUser, logged } = useContext(SessionContext);

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