import { AppBar, IconButton, Link, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { ReactElement, useContext } from 'react';
import { DataContext, SessionContext } from '@contexts';
import styled from 'styled-components';
import { HeaderLoginLink } from './HeaderLoginLink';
import { LoggedUser } from './LoggedUser';

export function HeaderToolbar(): ReactElement {
  const { logged } = useContext(SessionContext);
  const { user } = useContext(DataContext);

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
            ? <LoggedUser user={ user } />
            : <HeaderLoginLink />
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