import { CurrentUser } from '@models';
import { ReactElement, MouseEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@material-ui/core';
import styled from 'styled-components';

interface LoggedUserProps {
  user: CurrentUser;
  onLogout: () => void;
}

export function LoggedUser({ user, onLogout }: LoggedUserProps): ReactElement {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const history = useHistory();

  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const hideMenu = () => {
    setAnchorElement(null);
  };

  const redirectToProfile = () => {
    history.push(`/home/users/${ user.id }`);
    hideMenu();
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
        <MenuItem onClick={ redirectToProfile }>Profile</MenuItem>
        <MenuItem onClick={ onLogout }>Logout</MenuItem>
      </Menu>
    </>
  );
}

const LoggedUserButton = styled(Button)`
  && {
    text-transform: initial;
  }
`;