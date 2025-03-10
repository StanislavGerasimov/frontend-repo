import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000/api/customers';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getCustomer(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  createCustomer(show: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, show);
  }

  updateCustomer(id: string, Customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${id}`, Customer);
  }

  deleteCustomer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
