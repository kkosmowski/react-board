import { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import { RegisterForm } from '@interfaces';
import { AuthPanel } from './AuthPanel';
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

interface RegisterPanelProps {
  onRegister: (form: RegisterForm) => void;
}

// TODO: Try to refactor in the future since RegisterPanel and LoginPanel use a lot of common logic
export function RegisterPanel({ onRegister }: RegisterPanelProps): ReactElement {
  const history = useHistory();
  const initialErrors = {
    email: ' ',
    username: ' ',
    password: ' ',
    repeatPassword: ' ',
  };

  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
  });

  const [errors, setErrors] = useState(initialErrors);
  const [formValid, setFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (change: keyof RegisterForm) => (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setForm({
      ...form,
      [change]: event.target.value,
    });
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const validateControl = (control: keyof RegisterForm) => (event: FormEvent) => {
    event.preventDefault();
    if (!form[control].trim()) {
      setErrors({
        ...errors,
        [control]: 'Field cannot be empty',
      });
    } else {
      setErrors({
        ...errors,
        [control]: initialErrors[control],
      });

      let _errors = initialErrors;

      switch (control) {
        case 'email':
          if (!form.email.match(/([\w\d\.]{2,}@[\w\d]{2,}\.[\w]{2,})/)) {
            _errors = {
              ..._errors,
              email: 'Invalid email address.',
            };
          } else {
            _errors = {
              ..._errors,
              [control]: initialErrors[control],
            };
          }
          break;
        case 'username':
          if (form.username.length <= 1) {
            _errors = {
              ..._errors,
              username: 'Username must be at least 2 characters.',
            };

          } else if (form.username.length > 20) {
            _errors = {
              ..._errors,
              username: 'Username is too long.',
            };
          } else {
            _errors = {
              ..._errors,
              [control]: initialErrors[control],
            };
          }
          break;
        // @ts-ignore
        case 'password':
          if (form.password.length < 5) {
            _errors = {
              ..._errors,
              password: 'Minimum password length is 5 characters',
            };
          } else if (form.password.length > 20) {
            _errors = {
              ..._errors,
              password: 'Password is too long.',
            };
          } else {
            _errors = {
              ..._errors,
              [control]: initialErrors[control],
            };
          }
        // INFO: The fallthrough here is on purpose
        // eslint-disable-next-line no-fallthrough
        case 'repeatPassword':
          if (form.repeatPassword !== form.password && form.password && form.repeatPassword) {
            _errors = {
              ..._errors,
              password: 'Passwords are not identical',
              repeatPassword: 'Passwords are not identical',
            };
          } else {
            _errors = {
              ..._errors,
              password: initialErrors.password,
              repeatPassword: initialErrors.repeatPassword,
            };
          }
          break;
      }

      setErrors(_errors);
      if (Object.values(_errors).every((error: string) => !error.trim())) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    }
  };

  const handleRegister = (event: FormEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (formValid) {
      onRegister(form);
    }
  };

  return (
    <form onSubmit={ handleRegister }>
      <AuthPanel>
        <>
          <Typography variant="h6" component="span">Register</Typography>

          <FormControl error={ !!errors.email.trim() }>
            <InputLabel htmlFor="register-email">Email</InputLabel>
            <Input
              id="register-email"
              type="email"
              value={ form.email }
              onChange={ handleChange('email') }
              onBlur={ validateControl('email') }
            />
            <FormHelperText>{ errors.email }</FormHelperText>
          </FormControl>

          <FormControl error={ !!errors.username.trim() }>
            <InputLabel htmlFor="register-username">Username</InputLabel>
            <Input
              id="register-username"
              value={ form.username }
              onChange={ handleChange('username') }
              onBlur={ validateControl('username') }
            />
            <FormHelperText>{ errors.username }</FormHelperText>
          </FormControl>

          <FormControl error={ !!errors.password.trim() }>
            <InputLabel htmlFor="register-password">Password</InputLabel>
            <Input
              id="register-password"
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

          <FormControl error={ !!errors.repeatPassword.trim() }>
            <InputLabel htmlFor="register-repeat-password">Repeat password</InputLabel>
            <Input
              id="register-repeat-password"
              value={ form.repeatPassword }
              type={ showPassword ? 'text' : 'password' }
              onChange={ handleChange('repeatPassword') }
              onBlur={ validateControl('repeatPassword') }
            />
            <FormHelperText>{ errors.repeatPassword }</FormHelperText>
          </FormControl>
        </>
        <>
          <Button
            disabled={ !formValid }
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Register
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
  )
    ;
}

const GrayButton = styled(Button)`
  && {
    background-color: #aaa;
  }
`;