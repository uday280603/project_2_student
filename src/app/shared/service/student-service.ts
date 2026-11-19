import { Service, signal } from '@angular/core';
import { Istudent } from '../interface/Istudent';
import { Observable, of, Subject } from 'rxjs';
import { Ires } from '../interface/Ires';

@Service()
export class StudentService {
  studentsData: Istudent[] = [
    {
      stdId: 1,
      stdName: 'Rahul',
      stdSirname: 'Sharma',
      stdClass: 10,
      stdDivision: 'A',
      stdEmail: 'rahul.sharma@gmail.com',
      stdMobileNo: '9876543210',
    },
    {
      stdId: 2,
      stdName: 'Priya',
      stdSirname: 'Patil',
      stdClass: 8,
      stdDivision: 'B',
      stdEmail: 'priya.patil@gmail.com',
      stdMobileNo: '9876543211',
    },
    {
      stdId: 3,
      stdName: 'Amit',
      stdSirname: 'Verma',
      stdClass: 9,
      stdDivision: 'C',
      stdEmail: 'amit.verma@gmail.com',
      stdMobileNo: '9876543212',
    },
  ];

  students = signal<Istudent[]>(this.studentsData);
  emitObj$ = new Subject<Istudent>();
  mitEditObj: Observable<Istudent> = this.emitObj$.asObservable();

  fetchAll(): Observable<Istudent[]> {
    return of(this.studentsData);
  }

  addStudent(std: Istudent): Observable<Ires<Istudent>> {
    this.studentsData.unshift(std);
    this.students.set([...this.studentsData]);
    return of({
      msg: `Student with id ${std.stdId} is added successfully..!`,
      data: std,
    });
  }

  emitEditStudent(std: Istudent) {
    this.emitObj$.next(std);
  }

  onUpdateStudent(updatedObj: Istudent): Observable<Ires<Istudent>> {
    this.students.update((dataArray) =>
      dataArray.map((student) => (student.stdId === updatedObj.stdId ? updatedObj : student)),
    );
    return of({
      msg: `The student with id ${updatedObj.stdId} updated successfully...!`,
      data: updatedObj,
    });
  }

  removeStudent(removeId: number): Observable<Ires<Istudent>> {
    let GETINDEX = this.studentsData.findIndex((std) => std.stdId === removeId);
    let remodedItem = this.studentsData.splice(GETINDEX, 1);
    this.students.set([...this.studentsData]);
    return of({
      msg: `The student with id ${removeId} is removed successfully..!`,
      data: remodedItem[0],
    });
  }
}
