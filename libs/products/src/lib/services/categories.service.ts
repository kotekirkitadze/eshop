import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  private api = 'http://localhost:3000/api/v1/categories/';

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.api);
  }

  getCategoryById(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.api}${categoryId}`);
  }

  createCategory(data: Category): Observable<Category> {
    return this.http.post<Category>(this.api, data);
  }

  updateCategory(data: Category): Observable<Category> {
    return this.http.put<Category>(`${this.api}${data.id}`, data);
  }

  deleteCategory(id: string): Observable<Object> {
    return this.http.delete(`${this.api}${id}`);
  }
}
