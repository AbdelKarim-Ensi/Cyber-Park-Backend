import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private http = inject(HttpClient);
  private url = environment.apiUrl + '/attendance';

  checkIn() {
    return this.http.post(this.url + '/checkIn', {});
  }

  checkOut() {
    return this.http.put(this.url + '/checkOut', {});
  }

  getMyAttendance() {
    return this.http.get(this.url + '/my');
  }
  getAttendanceById(id:any) {
    return this.http.get(this.url + '/getAttendanceById/'+id);
  }

  getAllAttendances() {
    return this.http.get(this.url + '/getAll');
  }
  createAttendance(data: any) {
    // Assure-toi que cette route POST existe dans ton backend pour l'ajout manuel
    return this.http.post(this.url + '/admin/create', data); 
  }
  updatedAttendance(id:any,data:any){
    return this.http.put(this.url + '/updatedAttendance/'+ id, data);}
 

  }
