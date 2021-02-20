import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { ReactElement, useContext } from 'react';
import { DataContext } from '@contexts';
import styled from 'styled-components';

const ToolbarPart = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  &[data-right] {
    justify-content: flex-end;
  }
`;

const LoggedUser = styled.span`
  font-size: 15px;
  color: ${ props => props.theme.palette.secondary.main };
`;

export function HeaderToolbar(): ReactElement {
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

          <Typography component="h1" variant="h6">React Board</Typography>
        </ToolbarPart>
        <ToolbarPart data-right>
          <LoggedUser>{ user.username }</LoggedUser>
        </ToolbarPart>
      </Toolbar>
    </AppBar>
  );
}