import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private http = inject(HttpClient);
  private url = environment.apiUrl + '/employees';

  getEmployees(): any {
    return this.http.get(this.url + '/getEmployee');
  }

  updateEmployee(id: string, data: any) {
    return this.http.put(this.url + '/updateEmployee/' + id, data);
  }
  getEmployeeById(id: string) {
    return this.http.get(this.url + '/getEmployeeById/' + id);
  }

  deleteEmployee(id: string) {
    return this.http.delete(this.url + '/deleteEmployee/' + id);
  }
  ajouteEmpoyee(data: any) {
    return this.http.post(this.url + '/ajoutEmployee', data);
  }
  getMyProfile() {
    return this.http.get(this.url + '/me');
  }
}