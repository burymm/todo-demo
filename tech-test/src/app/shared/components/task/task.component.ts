import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { TaskModel } from '../../models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() task: TaskModel;
  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();
  @HostBinding('class') get classes() {
    return this.task.done === false ? '' : 'done';
  }

  onEditClick() {
    this.editClick.emit();
  }

  onDeleteClick() {
    this.deleteClick.emit();
  }
}
