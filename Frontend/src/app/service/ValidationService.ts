import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ValidationService {
  public usernameErr: string = 'Username length is between 5 and 15 character';
  public emailFormat: string = 'Email is invalid format';
  public passWordFormat: string = 'Password between 8 to 15 characters, at least one lowercase letter, one uppercase letter, one numeric digit, and one special character';
  public passNotMatch: string = 'Repassword is not matched';
  public repassErr: string = 'Repassword is not null';

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      required: 'Required',
      invalidCreditCard: 'Is invalid credit card number',
      invalidEmailAddress: 'Invalid email address',
      invalidPassword:
        'Invalid password. Password must be at least 6 characters long, and contain a number.',
      minlength: `Minimum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (
      control.value.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } else {
      return {invalidEmailAddress: true};
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {
      return null;
    } else {
      return {invalidPassword: true};
    }
  }
}
