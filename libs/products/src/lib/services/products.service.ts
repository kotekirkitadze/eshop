import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '@env/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  private api = `${environment.apiUrl}products/`;

  getProducts(): Observable<Product[]> {
    return this.http.get<Category[]>(this.api);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.api}${productId}`);
  }

  createProduct(productData: Product): Observable<Product> {
    return this.http.post<Product>(this.api, productData);
  }

  updateProduct(productData: Product): Observable<Product> {
    return this.http.put<Product>(`${this.api}${productData.id}`, productData);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.api}${productId}`);
  }
}
