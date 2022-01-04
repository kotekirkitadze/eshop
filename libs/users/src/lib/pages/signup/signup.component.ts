import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'users-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpFormGroup: FormGroup = new FormGroup({});
  authMessage = '';

  isSubmitted = false;
  authError = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initSignUpForm();
  }

  private _initSignUpForm() {
    this.signUpFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      passwordFormGroup: this.formBuilder.group(
        {
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required],
        },
        { validators: passwordMatcher }
      ),
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.signUpFormGroup.invalid) {
      return;
    }

    const signUpData = {
      email: this.getSignUpForm.email.value,
      name: this.getSignUpForm.name.value,
      phone: this.getSignUpForm.phone.value,
      password: this.getSignUpForm.passwordFormGroup.get('password')?.value,
    };

    this.authService.signUp(signUpData).subscribe((userData) => {
      this.router.navigate(['/login']);
    });
  }

  get getSignUpForm() {
    return this.signUpFormGroup.controls;
  }
}

function passwordMatcher(
  c: AbstractControl
): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confirmPassword = c.get('confirmPassword');

  if (passwordControl?.pristine || confirmPassword?.pristine) {
    return null;
  }

  if (passwordControl?.value === confirmPassword?.value) {
    return null;
  }

  return { match: true };
}
