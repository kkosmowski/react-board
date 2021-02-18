import React, { useContext } from 'react';
import { DataContext } from '@contexts';
import { Redirect } from 'react-router';

export function Shell() {
  const { logged } = useContext(DataContext);

  return typeof logged === 'boolean'
    ? logged
      ? (
        <div>
          shell
        </div>
      )
      : <Redirect to="/auth" />
    : <></>;
}
