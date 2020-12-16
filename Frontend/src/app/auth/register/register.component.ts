import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterPayload} from '../register-payload';
import {AuthServiceSecu} from '../auth-service-secu.service';
import {Router} from '@angular/router';
import {SocialAuthService} from 'angularx-social-login';
import {ValidationService} from '../../service/ValidationService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerPayload: RegisterPayload;
  isMatchPass: boolean = true;
  isValidUsername: boolean = true;
  isValidEmail: boolean = true;
  isValidPass: boolean = true;
  isValidRepass: boolean = true;
  validateService: ValidationService;

  constructor(private formBuilder: FormBuilder, private authService: AuthServiceSecu, private router: Router
    , private authService1: SocialAuthService, private validate: ValidationService) {
    this.validateService = validate;
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.minLength(5), Validators.maxLength(15)]],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, ValidationService.passwordValidator]],
      confirmPassword: ['', [Validators.required]]
    });
    this.registerPayload = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  ngOnInit() {
  }

  onSubmit() {
    this.validateForm();

    if (this.registerForm.valid) {
      console.log('pass');
    } else {
      console.log('error');
      return;
    }
    this.registerPayload = this.registerForm.value;
    this.authService.register(this.registerPayload).subscribe(data => {
      console.log('register succes');
      this.router.navigateByUrl('/register-success');
    }, error => {
      console.log('register failed');
    });
  }


  loginGoogle() {
    this.authService.loginGoogle();
  }

  loginGaceBook() {
    this.authService.loginInFaceBook();
  }

  validateConfirmPass() {
    const pass = (<HTMLInputElement>document.getElementById('inputPassword')).value;
    const rePass = (<HTMLInputElement>document.getElementById('inputConfirmPassword')).value;
    if ('' != pass && '' != rePass) {
      if (pass != rePass) {
        this.isMatchPass = false;
      } else {
        this.isMatchPass = true;
      }
    }
  }

  validateForm() {
    this.isValidUsername = this.registerForm.get('username').valid;
    this.isValidEmail = this.registerForm.get('email').valid;
    this.isValidPass = this.registerForm.get('password').valid;
    this.isValidRepass = this.registerForm.get('confirmPassword').valid;
    this.validateConfirmPass();
  }
}
