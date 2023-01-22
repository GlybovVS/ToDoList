import { Component } from '@angular/core';
import { switchMap } from 'rxjs';
import { ITask } from 'src/app/interfaces/task.interface';
import { TaskApiService } from './services/task-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public tasks: ITask[] = [
    {
      description: 'asdf',
      id: '123412',
      resolved: false,
    },
    {
      description: 'asasdasdasddf',
      id: '123412',
      resolved: true,
    }
  ];

  constructor(
    private readonly taskApiService: TaskApiService
  ) {
    this.taskApiService.getTasks().subscribe(res => {
      this.tasks = res;
    })
  }

  public addTask(): void {
    this.taskApiService.createTask('').pipe(
    switchMap(res => this.taskApiService.getTaskById(res.id))
    ).subscribe(res => {
      this.tasks.unshift(res);
    })
    
  }

  public deleteTask(id: string): void {
    this.taskApiService.deleteTask(id).pipe(
      switchMap(res => this.taskApiService.getTasks()),
    ).subscribe(tasks => this.tasks = tasks);
  }

  public updateTask(task: ITask): void {
    this.taskApiService.updateTask(task).pipe(
      switchMap(res => this.taskApiService.getTasks())
    ).subscribe(tasks => this.tasks = tasks)
  }
}
