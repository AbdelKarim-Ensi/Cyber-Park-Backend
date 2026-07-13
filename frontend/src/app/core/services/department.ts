import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private http = inject(HttpClient);
  private url = environment.apiUrl + '/departments';

  getDepartments() {
    return this.http.get(this.url + '/getDepartments');
  }

  createDepartment(data: any) {
    return this.http.post(this.url + '/createDepartments', data);
  }
  deleteDepartment(id: string) {
    return this.http.delete(this.url + '/deleteDepartment/' + id);
  }
  updateDepartment(id: string, data: any) {
    return this.http.put(this.url + '/updateDepartment/' + id, data);
  }
  getDepartmentById(id:any){
    
    return this.http.get(this.url + '/getDepartmentById/'+id);

  }
}