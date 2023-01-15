import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-delete-confirmation',
  templateUrl: './task-delete-confirmation.component.html',
})
export class TaskDeleteConfirmationComponent {

  constructor(
    public dialogRef: MatDialogRef<TaskDeleteConfirmationComponent>,
  ) { }

  onCancelClick() {
   this.dialogRef.close();
  }

  onDeleteClick() {
    this.dialogRef.close(true);
  }
}
