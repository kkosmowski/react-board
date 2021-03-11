import { Button, Card, CardContent, TextField } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { AppBreadcrumbs, BackButton } from '@main';

interface ThreadReplyProps {
  onAddReply: (replyBody: string) => Promise<any>;
  logged: boolean | null;
}

export function ThreadReply({ onAddReply, logged }: ThreadReplyProps): ReactElement {
  const [replyBody, setReplyBody] = useState('');
  const [replyError, setReplyError] = useState(' ');

  const handleAddReply = () => {
    if (logged) {
      if (replyBody.trim()) {
        onAddReply(replyBody).then(() => {
          setReplyBody(' ');
        });
      } else {
        setReplyError('Post content cannot be empty.');
      }
    } else {
      setReplyError('Cannot reply as a guest.');
    }
  };

  const handleReplyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReplyBody(event.target.value);
    setReplyError(' ');
  };

  return (
    <Card className="root-container">
      <CardContent className="container__content">
        <TextField
          value={ replyBody }
          onChange={ handleReplyChange }
          id="standard-multiline-static"
          label="Reply"
          multiline
          rows={ 3 }
          rowsMax={ 6 }
          variant="filled"
          fullWidth
          autoFocus
          helperText={ replyError }
          error={ !!replyError.trim() }
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