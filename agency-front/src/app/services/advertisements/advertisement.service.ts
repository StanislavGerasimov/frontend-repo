import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Advertisement } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementService {
  private apiUrl = 'http://localhost:3000/api/advertisements';

  constructor(private http: HttpClient) {}

  getAdvertisements(): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(this.apiUrl);
  }

  getAdvertisement(id: string): Observable<Advertisement> {
    return this.http.get<Advertisement>(`${this.apiUrl}/${id}`);
  }

  createAdvertisement(Advertisement: Advertisement): Observable<Advertisement> {
    return this.http.post<Advertisement>(this.apiUrl, Advertisement);
  }

  updateAdvertisement(
    id: string,
    Advertisement: Advertisement
  ): Observable<Advertisement> {
    return this.http.put<Advertisement>(`${this.apiUrl}/${id}`, Advertisement);
  }

  deleteAdvertisement(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
