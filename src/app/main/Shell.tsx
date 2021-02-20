import { useContext } from 'react';
import { SessionContext } from '@contexts';
import { Redirect } from 'react-router';
import { Header } from '@main/header';

export function Shell() {
  const { logged } = useContext(SessionContext);

  console.log('test');
  console.log(logged);

  return typeof logged === 'boolean'
    ? logged
      ? (
        <>
          <Header />
        </>
      )
      : <Redirect to="/auth" />
    : <></>;
}
