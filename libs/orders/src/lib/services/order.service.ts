import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  private api = `${environment.apiUrl}orders/`;

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.api);
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.api}${orderId}`);
  }

  createOrder(orderData: Order): Observable<Order> {
    return this.http.post<Order>(this.api, orderData);
  }

  updateOrderStatus(
    orderStatus: { status: string },
    orderId: string
  ): Observable<Order> {
    return this.http.put<Order>(`${this.api}${orderId}`, orderStatus);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.api}${orderId}`);
  }
}