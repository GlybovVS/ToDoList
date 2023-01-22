import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ITask } from "../interfaces/task.interface";
import { environment } from "src/environment/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  private readonly apiUrl = environment.api_url;

  constructor(
    private readonly httpClient: HttpClient,
  ) {}

  public getTasks(): Observable<ITask[]> {
    return this.httpClient.get<ITask[]>(`${this.apiUrl}/cards_list`)
  }

  public getTaskById(id: string): Observable<ITask> {
    return this.httpClient.get<ITask>(`${this.apiUrl}/task/${id}`);
  }

  public createTask(description: string): Observable<ITask> {
    return this.httpClient.post<ITask>(`${this.apiUrl}/create`, { description });
  }

  public updateTask(task: ITask): Observable<ITask> {
    return this.httpClient.put<ITask>(`${this.apiUrl}/updateTask/${task.id}`, { 
      description: task.description,
      resolved: task.resolved,
     });
  }

  public deleteTask(id: string): Observable<ITask> {
    return this.httpClient.delete<ITask>(`${this.apiUrl}/deleteTask/${id}`);
  }
}