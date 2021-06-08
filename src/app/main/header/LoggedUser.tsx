import { CurrentUser } from '@models';
import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import { ExpandMore } from '@material-ui/icons';
import styled from 'styled-components';

interface LoggedUserProps {
  user: CurrentUser;
  onLogout: () => void;
}

export function LoggedUser({ user, onLogout }: LoggedUserProps): ReactElement {
  const history = useHistory();

  const redirectToProfile = () => {
    history.push(`/home/users/${ user.id }`);
  };

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={ redirectToProfile }>Profile</Menu.Item>
      <Menu.Item key="1" onClick={ onLogout }>Logout</Menu.Item>
    </Menu>
  );

  return (
    <UserDropdown overlay={ menu } trigger={ ['click'] } placement="bottomRight">
      <DropdownLink aria-controls="user-menu" onClick={ (e) => e.preventDefault() }>
        { user.username }
        <ExpandMore />
      </DropdownLink>
    </UserDropdown>
  );
}

const UserDropdown = styled(Dropdown)`
  justify-content: flex-end;
  min-width: 100px;
  height: 48px;
`;

const DropdownLink = styled.a`
  display: inline-flex;
  align-items: center;
  font-size: 16px;

  svg {
    margin-top: 3px;
    margin-left: 4px;
  }
`;