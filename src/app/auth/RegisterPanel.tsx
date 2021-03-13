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
import { Validate } from '@utils';

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
    if (control === 'repeatPassword') {
      const { password, repeatPassword } = Validate.repeatPassword(form.password, form.repeatPassword);
      setErrors({
        ...errors,
        password: password ? password : errors.password,
        repeatPassword,
      });
    } else {
      setErrors({
        ...errors,
        [control]: Validate.control(control, form[control]),
      });
    }

    setFormValid(Object.values(errors).every((error: string) => !error.trim()));
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