import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Product, ProductsService } from '@appbit/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent implements OnInit {
  editMode = false;
  isSubmitted = false;
  form: FormGroup;
  categories = [];
  imageDisplay: string | ArrayBuffer;
  currentProductId = '';

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }
  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentProductId = params.id;
        this.productsService
          .getProductbyId(params.id)
          .subscribe((product: Product) => {
            this.getProductForm.name.setValue(product.name);
            this.getProductForm.brand.setValue(product.brand);
            this.getProductForm.price.setValue(product.price);
            this.getProductForm.countInStock.setValue(product.countInStock);
            this.getProductForm.category.setValue(product.category.id);
            this.getProductForm.isFeatured.setValue(product.isFeatured);
            this.getProductForm.description.setValue(product.description);
            this.getProductForm.richDescription.setValue(
              product.richDescription
            );
            this.imageDisplay = product.image;
            this.getProductForm.image.setValidators([]);
            this.getProductForm.image.updateValueAndValidity();
          });
      } else {
        this.editMode = false;
      }
    });
  }

  private _getCategories() {
    this.categoriesService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [true],
    });
  }

  get getProductForm() {
    return this.form.controls;
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const productFormData = new FormData();

    Object.keys(this.getProductForm).map((key) => {
      productFormData.append(key, this.getProductForm[key].value);
    });
    console.log(productFormData);

    if (this.editMode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }

  private _updateProduct(productData: FormData) {
    this.productsService
      .updateProduct(productData, this.currentProductId)
      .subscribe(
        (product: Product) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Product ${product.name} is updated`,
          });
          timer(1000).subscribe(() => this.location.back());
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product is not updated',
          });
        }
      );
  }

  private _addProduct(productFormData: FormData) {
    console.log(productFormData);
    this.productsService.createProduct(productFormData).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${product.name} is added`,
        });
        timer(1000).subscribe(() => this.location.back());
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not added',
        });
      }
    );
  }
  goBack() {
    this.location.back();
  }
}
