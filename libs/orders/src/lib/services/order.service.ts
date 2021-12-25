import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  private api = `${environment.apiUrl}orders/`;
  private productApiUrl = `${environment.apiUrl}products/`;
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

  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.api}get/count`)
      .pipe(map((o: any) => o.orderCount));
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`${this.api}get/totalsales`)
      .pipe(map((o: any) => o.totalsales));
  }

  getProductbyId(productId: string): Observable<any> {
    return this.http.get<any>(`${this.productApiUrl}${productId}`);
  }
}
