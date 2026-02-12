import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../shared/interfaces/api-response.interface';
import { CreateOrderRequest, Order, PaginatedResponse } from '../interfaces/order.interface';
import { ENDPOINTS } from '../../core/constants/endpoints';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);

  getOrders(page: number, pageSize: number): Observable<ApiResponse<PaginatedResponse<Order>>> {    
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ApiResponse<PaginatedResponse<Order>>>(ENDPOINTS.ORDERS.GET, { params });
  }

  createOrder(order: CreateOrderRequest): Observable<ApiResponse<Order>> {
    return this.http.post<ApiResponse<Order>>(ENDPOINTS.ORDERS.CREATE, order);
  }

  updateOrder(id: string, order: Order): Observable<ApiResponse<Order>> {
    const url = `${ENDPOINTS.ORDERS.UPDATE}/${id}`;
    return this.http.put<ApiResponse<Order>>(url, order);
  }

  deleteOrder(id: string): Observable<ApiResponse<Order>> {
    const url = `${ENDPOINTS.ORDERS.DELETE}/${id}`;
    return this.http.delete<ApiResponse<Order>>(url);
  }
}