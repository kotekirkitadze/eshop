import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@appbit/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import * as countriesLib from 'i18n-iso-countries';

declare const require;

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent implements OnInit {
  editMode = false;
  form: FormGroup;
  isSubmitted = false;
  currentUserId = '';
  countries = [];
  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private userService: UsersService
  ) {}

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: [''],
    });
  }

  ngOnInit(): void {
    this._initForm();
    this._checkEditMode();
    this._getCountries();
  }

  private _getCountries() {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.countries = Object.entries(
      countriesLib.getNames('en', { select: 'official' })
    ).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      };
    });
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentUserId = params.id;
        this.userService.getUserById(params.id).subscribe((user: User) => {
          this.getUserForm.name.setValue(user.name);
          this.getUserForm.email.setValue(user.email);
          this.getUserForm.password.setValue(user.password);
          this.getUserForm.phone.setValue(user.phone);
          this.getUserForm.isAdmin.setValue(user.isAdmin);
          this.getUserForm.street.setValue(user.street);
          this.getUserForm.apartment.setValue(user.apartment);
          this.getUserForm.zip.setValue(user.zip);
          this.getUserForm.city.setValue(user.city);
          this.getUserForm.country.setValue(user.country);

          this.form.controls.password.setValidators([]);
          this.form.controls.password.updateValueAndValidity();
        });
      } else {
        this.editMode = false;
      }
    });
  }

  private __updateUser(user: User) {
    this.userService.updateUser(user).subscribe(
      (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User ${user.name} is updated`,
        });
        timer(1000).subscribe(() => this.location.back());
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not updated',
        });
      }
    );
  }

  private _createUser(newUser: User) {
    this.userService.createUser(newUser).subscribe(
      (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User ${user.name} is added`,
        });
        timer(1000).subscribe(() => this.location.back());
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category is not added',
        });
      }
    );
  }
  onSubmit() {
    this.isSubmitted = true;
    console.log(this.isSubmitted);
    if (this.form.invalid) {
      return;
    }

    const userData: User = {
      id: this.currentUserId,
      name: this.getUserForm.name.value,
      email: this.getUserForm.email.value,
      password: this.getUserForm.password.value,
      phone: this.getUserForm.phone.value,
      isAdmin: this.getUserForm.isAdmin.value,
      street: this.getUserForm.street.value,
      apartment: this.getUserForm.apartment.value,
      zip: this.getUserForm.zip.value,
      city: this.getUserForm.city.value,
      country: this.getUserForm.country.value,
    };

    if (this.editMode) {
      this.__updateUser(userData);
    } else {
      this._createUser(userData);
    }
  }
  goBack() {
    this.location.back();
  }

  get getUserForm() {
    return this.form.controls;
  }
}
