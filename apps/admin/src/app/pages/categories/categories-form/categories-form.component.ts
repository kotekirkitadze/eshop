import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@appbit/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css'],
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;

  currentCategoryId = '';

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
      color: ['#e9a6a6'],
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
            this.getCategoryForm.color.setValue(category.color);
          });
      } else {
        this.editMode = false;
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const categoryData: Category = {
      name: this.getCategoryForm.name.value,
      icon: this.getCategoryForm.icon.value,
      id: this.currentCategoryId,
      color: this.getCategoryForm.color.value,
    };

    if (this.editMode) {
      this.__updateCategory(categoryData);
    } else {
      this._createCategory(categoryData);
    }
  }

  private __updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe(
      (category: Category) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Category ${category.name} is updated`,
        });
        timer(1000).subscribe(() => this.location.back());
      },
      () => {
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
      (category: Category) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Category ${category.name} is added`,
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

  get getCategoryForm() {
    return this.form.controls;
  }
  goBack() {
    this.location.back();
  }
}
