import { ReactElement } from 'react';
import styled from 'styled-components';
import { logo } from '@images';

export function HeaderLogo(): ReactElement {
  return (
    <Logo src={ logo.default } alt="React Board Logo" title="React Board Logo" className="header__logo" />
  );
}

const Logo = styled.img`
  display: block;
  width: 100%;
  min-height: 400px;
  object-fit: cover;
`;