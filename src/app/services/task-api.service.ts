import { inject, Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TaskDTO } from '../domain/task/dto';
import { API_URL } from '../injectables';

Injectable({
  providedIn: 'root',
});
export class TaskApiService {
  private apiUrl = inject(API_URL);
  private readonly http = inject(HttpClient);

  getTasks(): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(this.apiUrl).pipe(delay(2000));
  }
}
