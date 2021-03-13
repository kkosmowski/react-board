import { ReactElement } from 'react';
import { Button } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

export function BackButton(): ReactElement {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <StyledDiv className="back-button container">
      <StyledButton
        onClick={ handleBack }
        variant="contained"
        color="primary"
      >
        <ArrowBack />
        <span className="back-button__label">Back</span>
      </StyledButton>
    </StyledDiv>
  );
}

const StyledButton = styled(Button)`
  margin-left: 0;

  .back-button__label {
    margin-left: 16px;
  }
`;

const StyledDiv = styled.div`
  margin: 16px 0;
`;
