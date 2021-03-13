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
import { Validate } from '@utils';

interface LoginPanelProps {
  onLogin: (form: LoginForm) => void;
  error: string;
}

type LoginErrors = Omit<LoginForm, 'remember'>;

export function LoginPanel({ onLogin, error }: LoginPanelProps): ReactElement {
  const history = useHistory();
  const initialErrors: LoginErrors = {
    email: ' ',
    password: ' ',
  };

  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
    remember: false,
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState(initialErrors);
  const [formValid, setFormValid] = useState(false);

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

  const validateControl = (control: keyof LoginErrors) => (event: FormEvent) => {
    event.preventDefault();

    setErrors({
      ...errors,
      [control]: Validate.control(control, form[control]),
    });

    setFormValid(Object.values(errors).every((error: string) => !error.trim()));
  };

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();

    if (formValid) {
      onLogin(form);
    }
  };

  return (
    <form onSubmit={ handleLogin }>
      <AuthPanel>
        <>
          <Typography variant="h6" component="span">Login</Typography>

          <FormControl error={ !!errors.email.trim() }>
            <InputLabel htmlFor="login-email">Email</InputLabel>
            <Input
              id="login-email"
              value={ form.email }
              onChange={ handleChange('email') }
              onBlur={ validateControl('email') }
            />
            <FormHelperText>{ errors.email }</FormHelperText>
          </FormControl>

          <FormControl error={ !!errors.password.trim() }>
            <InputLabel htmlFor="login-password">Password</InputLabel>
            <Input
              id="login-password"
              value={ form.password }
              type={ showPassword ? 'text' : 'password' }
              onChange={ handleChange('password') }
              onBlur={ validateControl('password') }
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
            <FormHelperText>{ errors.password }</FormHelperText>
          </FormControl>

          <FormControlLabel
            value={ form.remember }
            control={ <Checkbox color="primary" onChange={ handleRememberMeChange } /> }
            label="Remember me"
            labelPlacement="end"
          />
          <ErrorText error>{ error }</ErrorText>
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

const ErrorText = styled(FormHelperText)`
  width: 100%;
  text-align: center;
`;
