import { ReactElement } from 'react';
import styled from 'styled-components';
import { HeaderLoginLinks } from './HeaderLoginLinks';
import { LoggedUser } from './LoggedUser';
import { SessionState } from '@store/interfaces';
import { Menu } from 'antd';
import { Header as HeaderBar } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';

interface HeaderToolbarProps extends Pick<SessionState, 'logged' | 'currentUser'> {
  onLogout: () => void;
}

export function HeaderToolbar({ logged, currentUser, onLogout }: HeaderToolbarProps): ReactElement {
  return (
    <StyledToolbar>
      <ToolbarPart data-left>
        <h1>
          <TitleLink to="/home">
            React Board
          </TitleLink>
        </h1>
      </ToolbarPart>
      <Menu theme="light" mode="horizontal">

      </Menu>
      <ToolbarPart data-right>
        { typeof logged === 'boolean'
          ? logged
            ? currentUser
              ? <LoggedUser user={ currentUser } onLogout={ onLogout } />
              : null
            : <HeaderLoginLinks />
          : null
        }
      </ToolbarPart>
    </StyledToolbar>
  );
}

const StyledToolbar = styled(HeaderBar)`
  & {
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    grid-column-gap: 16px;
    height: 64px;
    padding: 0 48px;
  }
`;

const ToolbarPart = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  color: #fff;

  &[data-right] {
    justify-content: flex-end;

    * + * {
      margin-left: 32px;
    }
  }
`;

// @todo: paint primary on hover
const TitleLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;