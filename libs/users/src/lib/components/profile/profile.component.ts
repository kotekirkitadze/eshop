import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EventBusService } from '../../eventBus/eventBus.service';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  endSubs$: Subject<number> = new Subject<number>();
  imagePath = '';
  form: FormGroup = new FormGroup({});
  id = '';
  user: User = {};
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private eventBusService: EventBusService
  ) {}

  ngOnInit(): void {
    this._initForm();

    this.route.params.pipe(takeUntil(this.endSubs$)).subscribe((params) => {
      if (params.id) {
        this.id = params.id;
      }
    });
    this._getUserData();
  }
  ngOnDestroy(): void {
    this.endSubs$.next(1);
    this.endSubs$.complete();
  }
  private _initForm() {
    this.form = this.formBuilder.group({
      image: [''],
    });
  }

  changePic(event: any) {
    this.form.patchValue({ image: event.image });
    this.form.updateValueAndValidity();
  }

  onSbmit(): void {
    // this.usersService.updateOrdinaryUser();
    // this.isSubmitted = true;
    if (this.form.invalid) return;

    const userFormData = new FormData();
    Object.keys(this.getUserForm).map((key) => {
      userFormData.append(key, this.getUserForm[key].value);
    });
    this.usersService
      .updateOrdinaryUser(userFormData, this.id)
      .subscribe((user) => {
        // this.usersService.initUserChangeSession();
        this.eventBusService.emit({ name: 'changePic', value: user.image });
      });
  }

  get getUserForm() {
    return this.form.controls;
  }

  private _getUserData() {
    this.usersService
      .getUserById(this.id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((user: User) => {
        this.user = user;

        if (user.image) {
          this.imagePath = user.image;
        } else {
          this.imagePath =
            'https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png';
        }
      });
  }
}
