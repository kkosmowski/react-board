import { RepeatPasswordValidationErrors } from '@interfaces';

export class Validate {
  protected static readonly defaultError = ' ';

  static control(name: string, value: string | boolean): string {
    if (!String(value).trim()) {
      return 'Field cannot be empty.';
    }

    switch (name) {
      case 'username':
        return this.username(String(value));
      case 'password':
        return this.password(String(value));
      case 'email':
        return this.email(String(value));
    }

    return this.defaultError;
  }

  protected static username(value: string, error = this.defaultError): string {
    if (value.length <= 1) {
      error = 'Username must be at least 2 characters.';
    } else if (value.length > 20) {
      error = 'Username is too long.';
    }
    return error;
  }

  protected static password(value: string, error = this.defaultError): string {
    if (value.length < 5) {
      error = 'Minimum password length is 5 characters.';
    } else if (value.length > 20) {
      error = 'Password is too long.';
    }
    return error;
  }

  protected static email(value: string, error = this.defaultError): string {
    if (!value.match(/([\w\d.]{2,}@[\w\d]{2,}\.[\w]{2,})/)) {
      error = 'Invalid email address.';
    }
    return error;
  }

  static repeatPassword(passwordValue: string, repeatPasswordValue: string): RepeatPasswordValidationErrors {
    if (repeatPasswordValue !== passwordValue && passwordValue && repeatPasswordValue) {
      return ({
        password: 'Passwords are not identical.',
        repeatPassword: 'Passwords are not identical.',
      });
    }

    if (this.password(repeatPasswordValue).trim()) {
      return ({
        password: '',
        repeatPassword: this.password(repeatPasswordValue),
      });
    }

    return ({
      password: this.defaultError,
      repeatPassword: this.defaultError,
    });
  }
}