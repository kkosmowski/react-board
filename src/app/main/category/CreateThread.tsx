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
import { useHistory, useParams } from 'react-router-dom';
import { BackButton } from '@main';

type NewThreadErrors = Omit<NewThread, 'category_id' | 'pinned'>;

export function CreateThread(): ReactElement {
  const history = useHistory();
  const { categoryId } = useParams<CategoryRouteParams>();
  const { currentUser } = useContext(SessionContext);
  const { category, createThread, getCategory } = useContext(DataContext);

  const initialErrors: NewThreadErrors = {
    name: ' ',
    post_body: ' ',
  };

  const [newThread, setNewThread] = useState<NewThread>({
    category_id: parseInt(categoryId),
    name: '',
    pinned: false,
    post_body: '',
  });

  const [errors, setErrors] = useState(initialErrors);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (categoryId) {
      getCategory(parseInt(categoryId));
    }
  }, [categoryId]);

  const handleChange = (change: keyof NewThread) => (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;

    setNewThread({
      ...newThread,
      [change]: input.type === 'checkbox' ? input.checked : input.value,
    });

    setErrors({
      ...errors,
      [change]: ' ',
    });

    validateForm();
  };

  const validateForm = () => {
    const _errors = { ...initialErrors };

    if (!newThread.name.trim()) {
      _errors.name = 'Thread name cannot be empty.';
    }

    if (!newThread.post_body.trim()) {
      _errors.post_body = 'Thread body cannot be empty.';
    }

    setErrors(_errors);
    setFormValid(Object.values(_errors).every((error: string) => !error.trim()));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    validateForm();

    if (formValid) {
      createThread(newThread).then(() => {
        history.push(`/home/category/${ categoryId }`);
      });
    }
  };

  return (
    <>
      <BackButton />
      <form onSubmit={ handleSubmit } className="root-container">
        <Card>
          <CardContent className="container__content">
            <CreateThreadTitle variant="h5">Create new thread in { category.name }</CreateThreadTitle>
            <TextField
              value={ newThread.name }
              onChange={ handleChange('name') }
              onBlur={ validateForm }
              id="standard-multiline-static"
              label="Name"
              rows={ 3 }
              rowsMax={ 6 }
              variant="filled"
              fullWidth
              autoFocus
              helperText={ errors.name }
              error={ !!errors.name.trim() }
            />

            <TextField
              value={ newThread.post_body }
              onChange={ handleChange('post_body') }
              onBlur={ validateForm }
              id="standard-multiline-static"
              label="Body"
              multiline
              rows={ 3 }
              rowsMax={ 6 }
              variant="filled"
              fullWidth
              helperText={ errors.post_body }
              error={ !!errors.post_body.trim() }
            />

            { currentUser.role === Role.Admin
              ? <PinnedCheckbox
                value={ newThread.pinned }
                control={ <Checkbox color="primary" onChange={ handleChange('pinned') } /> }
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
    </>
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