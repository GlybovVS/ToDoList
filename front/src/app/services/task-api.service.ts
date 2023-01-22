import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
    return this.httpClient.get<ITask>(`${this.apiUrl}/card/${id}`);
  }

  public createTask(description: string): Observable<ITask> {
    return this.httpClient.post<ITask>(`${this.apiUrl}/create`, { description });
  }

  public updateTask(task: ITask): Observable<ITask> {
    return this.httpClient.put<ITask>(`${this.apiUrl}/card/${task.id}`, { 
      description: task.description,
      resolved: task.resolved,
     });
  }

  public deleteTask(id: string): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.httpClient.delete(`${this.apiUrl}/card/${id}`, { headers, responseType: "text" });
  }
}