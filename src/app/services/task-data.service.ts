import { inject, Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { TaskPayload } from "../domain/payloads";

Injectable({
  providedIn: 'root'
})
export class TaskDataService { 
  private apiUrl = 'http://localhost:3000/tasks';
  private readonly http = inject(HttpClient);

  getTasks(): Observable<TaskPayload> {
    return this.http.get<TaskPayload>(this.apiUrl).pipe(
      delay(10000)
    );
  }
}