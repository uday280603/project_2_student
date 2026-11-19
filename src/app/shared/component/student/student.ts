import { Component, inject, signal } from '@angular/core';
import { Istudent } from '../../interface/Istudent';
import { StudentService } from '../../service/student-service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirm } from '../get-confirm/get-confirm';
import { SnackbarService } from '../../service/snackbar-service';

@Component({
  imports: [],
  selector: 'app-student',
  styleUrl: './student.scss',
  templateUrl: './student.html',
})
export class Student {
  _studentService = inject(StudentService);
  _snackbar = inject(SnackbarService);

  studentData = signal<Istudent[]>([]);
  students = this._studentService.students;
  constructor(private _matDialogBox: MatDialog) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this._studentService.fetchAll().subscribe({
      next: (data) => {
        this.studentData.set(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onEditObj(std: Istudent) {
    this._studentService.emitEditStudent(std);
  }

  onRemoveStudent(removeId: number) {
    let config = new MatDialogConfig();
    config.disableClose = true;
    config.width = '450px';
    config.data = `Are ypu sure to remove student with id ${removeId}..?`;
    let _matRef = this._matDialogBox.open(GetConfirm,config);
    _matRef.afterClosed().subscribe((res) => {
      if (res) {
        this._studentService.removeStudent(removeId).subscribe({
          next: (data) => {
            this._snackbar.openSnackbar(data.msg);
          },
          error: (err) => {
            this._snackbar.openSnackbar(err);
          },
        });
      }
    });
  }
}
