import { User } from '@models';
import { ReactElement, MouseEvent, useState, useContext } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { SessionContext } from '@contexts';
import styled from 'styled-components';

interface LoggedUserProps {
  user: User;
}

export function LoggedUser({ user }: LoggedUserProps): ReactElement {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const { logout } = useContext(SessionContext);
  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const hideMenu = () => {
    setAnchorElement(null);
  };

  return (
    <>
      <LoggedUserButton aria-controls="user-menu" onClick={ openMenu }>{ user.username }</LoggedUserButton>
      <Menu
        id="user-menu"
        anchorEl={ anchorElement }
        keepMounted
        open={ !!anchorElement }
        onClose={ hideMenu }
      >
        <MenuItem onClick={ logout }>Logout</MenuItem>
      </Menu>
    </>
  );
}

const LoggedUserButton = styled(Button)`
  && {
    text-transform: initial;
  }
`;