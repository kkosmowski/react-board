import { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography, FormHelperText, Button,
} from '@material-ui/core';
import styled from 'styled-components';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { LoginForm } from '@interfaces';
import { AuthPanel } from './AuthPanel';
import { useHistory } from 'react-router-dom';

interface LoginPanelProps {
  onLogin: (form: LoginForm) => void;
}

export function LoginPanel({ onLogin }: LoginPanelProps): ReactElement {
  const history = useHistory();
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

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    onLogin(form);
  };

  return (
    <form onSubmit={ handleLogin }>
      <AuthPanel>
        <>
          <Typography variant="h6" component="span">Login</Typography>

          <FormControl>
            <InputLabel htmlFor="login-email">Email</InputLabel>
            <Input
              id="login-email"
              value={ form.username }
              onChange={ handleChange('username') }
            />
            <FormHelperText> </FormHelperText>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="login-password">Password</InputLabel>
            <Input
              id="login-password"
              value={ form.password }
              type={ showPassword ? 'text' : 'password' }
              onChange={ handleChange('password') }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={ handleShowPasswordToggle }
                  >
                    { showPassword ? <Visibility /> : <VisibilityOff /> }
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText> </FormHelperText>
          </FormControl>

          <FormControlLabel
            value={ form.remember }
            control={ <Checkbox color="primary" onChange={ handleRememberMeChange } /> }
            label="Remember me"
            labelPlacement="end"
          />
        </>
        <>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Login
          </Button>
          <GrayButton
            onClick={ history.goBack }
            variant="contained"
            fullWidth
          >
            Go back
          </GrayButton>
        </>
      </AuthPanel>
    </form>
  );
}

const GrayButton = styled(Button)`
  && {
    background-color: #aaa;
  }
`;