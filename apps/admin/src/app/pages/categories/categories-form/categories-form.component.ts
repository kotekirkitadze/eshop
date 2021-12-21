import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@appbit/products';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css'],
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryId = '';
  endSubs$: Subject<number> = new Subject<number>();

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
  ngOnDestroy(): void {
    this.endSubs$.next(1);
    this.endSubs$.complete();
  }

  private _checkEditMode() {
    this.route.params.pipe(takeUntil(this.endSubs$)).subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentCategoryId = params.id;
        this.categoriesService
          .getCategoryById(params.id)
          .pipe(takeUntil(this.endSubs$))
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
    this.categoriesService
      .updateCategory(category)
      .pipe(takeUntil(this.endSubs$))
      .subscribe(
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
    this.categoriesService
      .createCategory(newCategory)
      .pipe(takeUntil(this.endSubs$))
      .subscribe(
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
