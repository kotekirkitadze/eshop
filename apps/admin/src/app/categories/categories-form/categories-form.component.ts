import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@appbit/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'appbit-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css'],
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean = false;
  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }
  onSubmit() {
    this.isSubmitted = true;
    console.log(this.isSubmitted);
    if (this.form.invalid) {
      return;
    }

    const newCategory: Category = {
      name: this.getCategory.name.value,
      icon: this.getCategory.icon.value,
    };
    this.categoriesService.createCategory(newCategory).subscribe(
      (d) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category is added',
        });
        timer(2000).subscribe((done) => this.location.back());
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category is not added',
        });
      }
    );
    // console.log(this.getCategory.name.value);
    // console.log(this.getCategory.icon.value);
  }

  get getCategory() {
    return this.form.controls;
  }
}
