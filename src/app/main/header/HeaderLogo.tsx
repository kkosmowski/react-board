import { ReactElement } from 'react';
import styled from 'styled-components';
import { logo } from '@images';

const Logo = styled.img`
  display: block;
  width: 100%;
  height: 500px;
  object-fit: cover;
`;

export function HeaderLogo(): ReactElement {
  return (
    <Logo src={ logo.default } alt="React Board Logo" title="React Board Logo" />
    // <div>{ JSON.stringify(logo) }</div>
  );
}