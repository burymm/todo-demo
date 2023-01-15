import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryEnum } from '../../enums';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskModel } from '../../models';

@Component({
  selector: 'app-task-modify',
  templateUrl: './task-modify.component.html',
  styleUrls: ['./task-modify.component.scss']
})
export class TaskModifyComponent implements OnInit {
  form: FormGroup;
  labelControl = new FormControl('', [ Validators.required ]);
  categoryControl = new FormControl('', [ Validators.required ]);
  descriptionControl = new FormControl('', [ Validators.required ]);
  categoryList = Object.values(CategoryEnum);
  task: TaskModel;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskModifyComponent>,
    @Inject(MAT_DIALOG_DATA) data: TaskModel,
  ) {
    this.task = data;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      labelControl: this.labelControl,
      categoryControl: this.categoryControl,
      descriptionControl: this.descriptionControl,
    });
    if (this.task) {
      this.form.setValue({
        labelControl: this.task.label,
        categoryControl: this.task.category,
        descriptionControl: this.task.description,
      });
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick() {
    this.dialogRef.close(this.form.value);
  }
}
