import { Button, Card, CardContent, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { ReactElement } from 'react';
import styled from 'styled-components';

interface ThreadReplyProps {
  onAddReply: (replyBody: string) => void
}

export function ThreadReply({ onAddReply }: ThreadReplyProps): ReactElement {
  const [replyBody, setReplyBody] = useState('');
  const handleAddReply = () => {
    onAddReply(replyBody);
  };

  return (
    <Card className="container">
      <CardContent className="container__content">
        <TextField
          value={ replyBody }
          onChange={ (event) => setReplyBody(event.target.value) }
          id="standard-multiline-static"
          label="Reply"
          multiline
          rows={ 3 }
          rowsMax={ 6 }
          variant="filled"
          fullWidth
          autoFocus
        />
        <AddPostButton
          onClick={ handleAddReply }
          variant="contained"
          color="secondary"
        >
          Add post
        </AddPostButton>
      </CardContent>
    </Card>
  );
}

const AddPostButton = styled(Button)`
  && {
    margin-top: 16px;
    padding-left: 24px;
    padding-right: 24px;
  }
`;