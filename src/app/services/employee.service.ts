import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class EmployeeService {
  constructor(private _http: HttpClient) { }

  addEmployee(data: any): Observable<any> {
    const userId = localStorage.getItem('userId');
    data.userId = userId;
    return this._http.post('http://localhost:3000/employees', data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    const userId = localStorage.getItem('userId');
    data.userId = userId;
    return this._http.put(`http://localhost:3000/employees/${id}`, data);
  }

  getEmployeeList(): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this._http.get(`http://localhost:3000/employees?userId=${userId}`);
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }


}
