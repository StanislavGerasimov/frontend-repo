import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Show } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ShowService {
  private apiUrl = 'http://localhost:3000/api/shows';

  constructor(private http: HttpClient) {}

  getShows(): Observable<Show[]> {
    return this.http.get<Show[]>(this.apiUrl);
  }

  getShow(id: string): Observable<Show> {
    return this.http.get<Show>(`${this.apiUrl}/${id}`);
  }

  createShow(show: Show): Observable<Show> {
    return this.http.post<Show>(this.apiUrl, show);
  }

  updateShow(id: string, show: Show): Observable<Show> {
    return this.http.put<Show>(`${this.apiUrl}/${id}`, show);
  }

  deleteShow(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
