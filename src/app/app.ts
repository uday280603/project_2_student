import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentDashboard } from './shared/component/student-dashboard/student-dashboard';

@Component({
  imports: [StudentDashboard],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('project_2_student');
}
