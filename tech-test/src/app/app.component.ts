import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TaskService } from './shared/services';
import { switchMap, take, tap } from 'rxjs/operators';
import { TaskModel } from './shared/models';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import * as dayjs from 'dayjs';
import { MatDialog } from '@angular/material/dialog';
import { TaskModifyComponent } from './shared/components/task-modify/task-modify.component';
import {
  TaskDeleteConfirmationComponent
} from './shared/components/task-delete-confirmation/task-delete-confirmation.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'tech-test';
  taskList: TaskModel[] = [];

  public inProgress: TaskModel[];
  public done: TaskModel[];

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
  ) {
    this.getTaskList().subscribe();
  }


  dropInProgress(event: CdkDragDrop<TaskModel[]>) {
    const task = event.previousContainer.data[event.previousIndex];
    const isInProgress = this.inProgress.find(t => t.id === task.id);
    if (isInProgress) {
      return;
    }

    this.taskService.updateTask({
      ...task,
      done: false,
    }).pipe(
      switchMap(() => this.getTaskList())
    ).subscribe();
  }

  dropDone(event: CdkDragDrop<TaskModel[]>) {
    const task = event.previousContainer.data[event.previousIndex];
    const isInDone = this.done.find(t => t.id === task.id);
    if (isInDone) {
      return;
    }
    this.taskService.updateTask({
      ...task,
      done: dayjs().format('DD-MM-YYYY'),
    }).pipe(
      switchMap(() => this.getTaskList())
    ).subscribe();
  }

  private getTaskList() {
    return this.taskService.getList()
      .pipe(
        take(1),
        tap((list) => {
          this.taskList = list;
          this.inProgress = list.filter(item => item.done === false);
          this.done = list.filter(item => item.done !== false);
          this.cdr.detectChanges();
        })
      );
  }

  addTask() {
    const dialogRef = this.dialog.open(TaskModifyComponent, {
      data: {},
    });

    dialogRef.afterClosed()
      .pipe(
        switchMap((data) => {
          return this.taskService.createTask({
            label: data.labelControl,
            description: data.descriptionControl,
            category: data.categoryControl,
          });
        }),
        switchMap(() => this.getTaskList())
      )
      .subscribe();
  }

  onEditClick(task: TaskModel) {
    const dialogRef = this.dialog.open(TaskModifyComponent, {
      data: task,
    });

    dialogRef.afterClosed()
      .pipe(
        switchMap((data) => {
          return this.taskService.updateTask({
              ...task,
              label: data.labelControl,
              description: data.descriptionControl,
              category: data.categoryControl,
            },
          );
        }),
        switchMap(() => this.getTaskList())
      )
      .subscribe();
  }

  onDeleteClick(task: TaskModel) {
    const dialogRef = this.dialog.open(TaskDeleteConfirmationComponent, {
      data: {},
    });

    dialogRef.afterClosed()
      .pipe(
        switchMap((confirmed) => confirmed ? this.taskService.deleteTask(task.id) : of(false)),
        switchMap(() => this.getTaskList())
      )
      .subscribe();
  }
}
