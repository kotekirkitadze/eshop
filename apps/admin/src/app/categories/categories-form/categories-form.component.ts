import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  editMode: boolean = false;

  currentCategoryId: string = '';

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
    this._checkEditMode();
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentCategoryId = params.id;
        this.categoriesService
          .getCategoryById(params.id)
          .subscribe((category: Category) => {
            this.getCategoryForm.name.setValue(category.name);
            this.getCategoryForm.icon.setValue(category.icon);
          });
      } else {
        this.editMode = false;
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.isSubmitted);
    if (this.form.invalid) {
      return;
    }

    const categoryData: Category = {
      name: this.getCategoryForm.name.value,
      icon: this.getCategoryForm.icon.value,
      id: this.currentCategoryId,
    };

    if (this.editMode) {
      this.__updateCategory(categoryData);
    } else {
      this._createCategory(categoryData);
    }

    // console.log(this.getCategory.name.value);
    // console.log(this.getCategory.icon.value);
  }

  private __updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe(
      (d) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category is updated',
        });
        timer(1000).subscribe((done) => this.location.back());
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category is not updated',
        });
      }
    );
  }

  private _createCategory(newCategory: Category) {
    this.categoriesService.createCategory(newCategory).subscribe(
      (d) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category is added',
        });
        timer(1000).subscribe((done) => this.location.back());
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category is not added',
        });
      }
    );
  }

  get getCategoryForm() {
    return this.form.controls;
  }
}
