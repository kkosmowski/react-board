import { ReactElement } from 'react';
import styled, { withTheme } from 'styled-components';

export function HeaderDivider(): ReactElement {
  return (
    <Divider />
  );
}

const Divider = withTheme(styled.hr`
  background-color: ${ props => props.theme.palette.primary.main };
  border: 0;
  display: block;
  width: 100%;
  height: 16px;
`);