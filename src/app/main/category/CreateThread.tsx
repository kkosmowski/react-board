import React, { ChangeEvent, FormEvent, ReactElement, useContext, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography
} from '@material-ui/core';
import styled from 'styled-components';
import { CategoryRouteParams, NewThread } from '@interfaces';
import { DataContext, SessionContext } from '@contexts';
import { Role } from '@enums';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

enum NewThreadChange {
  Name = 'name',
  Pinned = 'pinned',
  PostBody = 'post_body'
}

export function CreateThread(): ReactElement {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { categoryId } = useParams<CategoryRouteParams>();
  const { currentUser } = useContext(SessionContext);
  const { createThread, getCategory } = useContext(DataContext);
  const [newThread, setNewThread] = useState<NewThread>({
    name: '',
    pinned: false,
    post_body: '',
  });

  useEffect(() => {
    if (categoryId) {
      getCategory(categoryId);
    }
  }, [categoryId]);

  const handleChange = (change: NewThreadChange) => (event: ChangeEvent<HTMLInputElement>) => {
    setNewThread({
      ...newThread,
      [change]: event.target.value,
    } as NewThread);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    createThread(newThread).then(() => {
      history.push(url.split('/').slice(0, -1).join('/'));
    });
  };

  return (
    <form onSubmit={ handleSubmit } className="container">
      <Card>
        <CardContent className="container__content">
          <CreateThreadTitle variant="h5">Create new thread</CreateThreadTitle>
          <TextField
            value={ newThread.name }
            onChange={ handleChange(NewThreadChange.Name) }
            id="standard-multiline-static"
            label="Name"
            rows={ 3 }
            rowsMax={ 6 }
            variant="filled"
            fullWidth
            autoFocus
            helperText={ ' ' }
            // error={ !!replyError.trim() }
          />

          <TextField
            value={ newThread.post_body }
            onChange={ handleChange(NewThreadChange.PostBody) }
            id="standard-multiline-static"
            label="Body"
            multiline
            rows={ 3 }
            rowsMax={ 6 }
            variant="filled"
            fullWidth
            helperText={ ' ' }
            // error={ !!replyError.trim() }
          />

          { currentUser.role === Role.Admin
            ? <PinnedCheckbox
              value={ newThread.pinned }
              control={ <Checkbox color="primary" onChange={ handleChange(NewThreadChange.Pinned) } /> }
              label="Pin the thread"
              labelPlacement="end"
            />
            : null
          }

          <AddPostButton
            variant="contained"
            color="secondary"
            type="submit"
          >
            Create thread
          </AddPostButton>
        </CardContent>
      </Card>
    </form>
  );
}

const AddPostButton = styled(Button)`
  && {
    margin-top: 16px;
    padding-left: 24px;
    padding-right: 24px;
  }
`;

const CreateThreadTitle = styled(Typography)`
  && {
    margin-bottom: 16px;
  }
`;

const PinnedCheckbox = styled(FormControlLabel)`
  && {
    width: 100%;
  }
`;