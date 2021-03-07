import { AppBar, IconButton, Link, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { ReactElement, useContext } from 'react';
import { SessionContext } from '@contexts';
import styled from 'styled-components';
import { HeaderLoginLinks } from './HeaderLoginLinks';
import { LoggedUser } from './LoggedUser';

export function HeaderToolbar(): ReactElement {
  const { logged, currentUser, logout } = useContext(SessionContext);

  return (
    <AppBar>
      <Toolbar>
        <ToolbarPart data-left>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
          >
            <Menu />
          </IconButton>

          <Typography component="h1" variant="h6">
            <Link href="/home" color="initial" underline="none">React Board</Link>
          </Typography>
        </ToolbarPart>
        <ToolbarPart data-right>
          { logged
            ? <LoggedUser user={ currentUser } onLogout={ logout } />
            : <HeaderLoginLinks />
          }
        </ToolbarPart>
      </Toolbar>
    </AppBar>
  );
}

const ToolbarPart = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  &[data-right] {
    justify-content: flex-end;
    color: ${ props => props.theme.palette.secondary.main };
  }
`;