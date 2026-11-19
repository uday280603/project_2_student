import { Component, signal } from '@angular/core';
import { Istudent } from '../../interface/Istudent';
import { form, FormField } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { StudentService } from '../../service/student-service';
import { SnackbarService } from '../../service/snackbar-service';

@Component({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    FormField,
  ],
  selector: 'app-student-form',
  styleUrl: './student-form.scss',
  templateUrl: './student-form.html',
})
export class StudentForm {
  studentModel = signal<Istudent>({
    stdId: 0,
    stdName: '',
    stdSirname: '',
    stdClass: 1,
    stdDivision: 'A',
    stdEmail: '',
    stdMobileNo: '',
  });

  studentForm = form(this.studentModel);
  isInEditMode: boolean = false;
  editStudentObj!: Istudent;

  constructor(
    private _studentService: StudentService,
    private _snackbar: SnackbarService,
  ) {
    this.onPatchData();
  }

  onAddStudent(eve: Event) {
    eve.preventDefault();
    let NEW_STUDENT: Istudent = {
      ...this.studentModel(),
      stdId: Date.now(),
    };
    this._studentService.addStudent(NEW_STUDENT).subscribe({
      next: (data) => {
        this._snackbar.openSnackbar(data.msg);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onPatchData() {
    this._studentService.emitObj$.subscribe({
      next: (data) => {
        this.editStudentObj = data;
        this.studentModel.set({ ...data });
        this.isInEditMode = true;
      },
      error: (err) => {
        this._snackbar.openSnackbar(err);
      },
    });
  }

  onUpdateStudent() {
    let UPDATED_STUDENT: Istudent = {
      ...this.studentModel(),
      stdId: this.editStudentObj.stdId,
    };
    this._studentService.onUpdateStudent(UPDATED_STUDENT).subscribe({
      next: (data) => {
        this._snackbar.openSnackbar(data.msg);
        this.isInEditMode = false;
        this.studentModel.set({
          stdId: 0,
          stdName: '',
          stdSirname: '',
          stdClass: 1,
          stdDivision: 'A',
          stdEmail: '',
          stdMobileNo: '',
        });
      },
      error: (err) => {
        this._snackbar.openSnackbar(err);
      },
    });
  }
}
