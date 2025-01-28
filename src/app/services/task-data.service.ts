import { inject, Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { TaskDTO } from "../domain/dto";

Injectable({
  providedIn: 'root'
})
export class TaskDataService { 
  private apiUrl = 'http://localhost:3000/tasks';
  private readonly http = inject(HttpClient);

  getTasks(): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(this.apiUrl).pipe(
      delay(2000)
    );
  }
}