import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ITask } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class TaskComponent {
  @Input() public task: ITask;

  public isDescriptionEditable = false;
  
  @Output() public taskDeleted = new EventEmitter<string>();
  @Output() public taskUpdated = new EventEmitter<ITask>();

  public readonly taskForm = this.formBuilder.group({
    description: [{ value: '', disabled: !this.isDescriptionEditable }, Validators.required],
    resolved: [false, Validators.required],
  })


  constructor(
    private readonly formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.taskForm.setValue({
      description: this.task.description,
      resolved: this.task.resolved,
    })
  }

  get taskDescription(): FormControl<string> {
    return this.taskForm.get('description') as FormControl<string>
  }

  get taskResolved(): FormControl<boolean> {
    return this.taskForm.get('resolved') as FormControl<boolean>;
  }

  public switchMode(): void {
    this.isDescriptionEditable = !this.isDescriptionEditable;
    if (this.isDescriptionEditable) {
      this.taskDescription.enable();
    } else {
      this.taskDescription.disable();
      this.updateTask();
    }
  }

  public deleteTask(): void {
    this.taskDeleted.emit(this.task.id);
  }

  public updateTask(): void {
    this.taskUpdated.emit({
      id: this.task.id,
      description: this.taskDescription.value,
      resolved: this.taskResolved.value,
    })
  }
}
