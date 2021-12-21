import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';
@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password is wrong';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get getLoginForm() {
    return this.loginFormGroup.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginFormGroup.invalid) {
      return;
    }

    const loginData = {
      email: this.getLoginForm.email.value,
      password: this.getLoginForm.password.value,
    };
    this.authService.login(loginData.email, loginData.password).subscribe(
      (user) => {
        this.authError = false;
        console.log(user.token);
        this.localStorageService.setToken(user.token);
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        this.authError = true;
        console.log(error);
        if (error.status !== 404) {
          this.authMessage = 'There is a problem in server';
        }
      }
    );
  }
}
