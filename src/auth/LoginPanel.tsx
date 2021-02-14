import React, {ChangeEvent, ReactElement, useState} from 'react';
import {
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography, FormHelperText, Button, CardActions
} from '@material-ui/core';
import styled from 'styled-components';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import {endpoint} from '@utils';
import {HttpService} from '@services';

const AuthCard = styled(Card)`
  width: 320px;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const AuthCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AuthCardActions = styled(CardActions)`
  display: flex;
  flex-direction: column;
  width: 100%;

  && > :not(:first-child) {
    margin-left: 0;
    margin-top: 8px;
  }
`;

interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

export function LoginPanel(): ReactElement {
  const [form, setForm] = useState<LoginForm>({
    username: '',
    password: '',
    remember: false
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (change: keyof LoginForm) => (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setForm({
      ...form,
      [change]: event.target.value,
    });
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = () => {
    setForm({
      ...form,
      remember: !form.remember
    });
  };

  const handleLogin = () => {
    HttpService.post<LoginForm>(endpoint.login, form).then(
      () => {
        console.log('login');
      }
    );
  };

  return (
    <AuthCard>
      <AuthCardContent>
        <Typography variant="h6" component="span">Login</Typography>

        <FormControl>
          <InputLabel htmlFor="login-username">Email</InputLabel>
          <Input
            id="login-username"
            value={form.username}
            onChange={handleChange('username')}
          />
          <FormHelperText> </FormHelperText>
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="login-password">Password</InputLabel>
          <Input
            id="login-password"
            value={form.password}
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={handleShowPasswordToggle}
                >
                  {showPassword ? <Visibility/> : <VisibilityOff/>}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText> </FormHelperText>
        </FormControl>

        <FormControlLabel
          value={form.remember}
          control={<Checkbox color="primary" onChange={handleRememberMeChange}/>}
          label="Remember me"
          labelPlacement="end"
        />
      </AuthCardContent>
      <AuthCardActions>
        <Button
          onClick={handleLogin}
          variant="contained"
          color="primary"
          fullWidth
        >
          Login
        </Button>
        <Button variant="contained" fullWidth>Go back</Button>
      </AuthCardActions>
    </AuthCard>
  );
}
