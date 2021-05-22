import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { CurrentUser, PostModel } from '@models';
import { Link as RouterLink } from 'react-router-dom';
import { DateFormat } from '@enums';
import { TimeUtil } from '@utils';
import styled from 'styled-components';
import { Button, Card, CardContent, TextField, Typography } from '@material-ui/core';

interface PostProps {
  post: PostModel;
  currentUser: CurrentUser;
  update: (body: string, callback: () => void) => void;
}

export function Post({ post, currentUser, update }: PostProps): ReactElement {
  const [body, setBody] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(' ');

  useEffect(() => {
    setBody(post.body);
  }, [post]);

  const handleEdit = () => {
    setEditMode(true);
    setBody(post.body);
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    if (!event.target.value.trim()) {
      setError('Post cannot be empty');
    } else {
      setError(' ');
    }
  };

  const handleUpdate = () => {
    if (!error.trim()) {
      update(body, () => afterUpdate());
    }
  };

  const afterUpdate = () => {
    setEditMode(false);
  };

  return (
    <PostCard>
      <PostCardContent>
        <PostDetails>
          <Typography component="address" variant="inherit" color="secondary">
            <RouterLink
              rel="author"
              to={ `/home/users/${ post.created_by.id }` }
            >
              { post.created_by.username }
            </RouterLink>
          </Typography>
          <time dateTime={ post.created_on }>{ TimeUtil.format(post.created_on, DateFormat.DateWithTime) }</time>
          {
            currentUser.id === post.created_by.id && !editMode
              ? <EditButton onClick={ handleEdit }>Edit</EditButton>
              : null
          }
        </PostDetails>
        <PostBody>
          { editMode
            ? <>
              <TextField
                value={ body }
                onChange={ handleChange }
                label="Post body"
                multiline
                rows={ 2 }
                rowsMax={ 4 }
                variant="filled"
                fullWidth
                autoFocus
                helperText={ error }
                error={ !!error.trim() }
              />
              <UpdatePostButton
                onClick={ handleUpdate }
                variant="contained"
                color="secondary"
              >
                Save post
              </UpdatePostButton>
            </>
            : <p>{ body }</p>
          }
        </PostBody>
      </PostCardContent>
    </PostCard>
  );
}

const PostCard = styled(Card)`
  margin-bottom: 16px;
`;

const PostCardContent = styled(CardContent)`
  && {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

const PostDetails = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
  margin-bottom: 16px;

  address {
    font-style: normal;
  }

  > * {
    display: inline;

    :not(:last-child):after {
      content: '|';
      color: var(--white-text);
      margin: 0 16px;
    }
  }
`;

const PostBody = styled.article`
  margin-left: 16px;

  p {
    white-space: pre;
  }
`;

const EditButton = styled(Button)`
  && {
    margin-left: auto;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const UpdatePostButton = styled(Button)`
  && {
    padding-left: 24px;
    padding-right: 24px;
  }
`;
