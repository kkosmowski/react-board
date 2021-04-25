import React, { ReactElement } from 'react';
import { CircularProgress } from '@material-ui/core';
import styled, { css } from 'styled-components';

interface LoaderProps {
  centered?: boolean;
  size?: string;
  color?: 'primary' | 'secondary' | 'inherit';
}

export function Loader({ centered, size, color }: LoaderProps): ReactElement {
  return (
    <LoaderContainer centered={ centered } size={ size }>
      <CircularProgress size={ size } color={ color || 'secondary' } />
    </LoaderContainer>
  );
}

interface LoaderContainerProps {
  readonly centered: boolean;
  readonly size: string;
}

const LoaderContainer = styled.div<LoaderContainerProps>`
  ${ props => props.centered && css`
    width: 100%;
    text-align: center;
  ` } // @todo: get rid of 'any'
` as any;