import { ReactElement } from 'react';
import { HeaderDivider } from './HeaderDivider';
import { HeaderLogo } from './HeaderLogo';
import { HeaderToolbar } from './HeaderToolbar';

export function Header(): ReactElement {

  return (
    <>
      <HeaderToolbar />
      <HeaderLogo />
      {/*<HeaderDivider />*/ }
    </>
  );
}