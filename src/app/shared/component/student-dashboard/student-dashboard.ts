import { Component } from '@angular/core';
import { Student } from '../student/student';
import { StudentForm } from '../student-form/student-form';

@Component({
  imports: [Student,StudentForm],
  selector: 'app-student-dashboard',
  styleUrl: './student-dashboard.scss',
  templateUrl: './student-dashboard.html',
})
export class StudentDashboard {}
