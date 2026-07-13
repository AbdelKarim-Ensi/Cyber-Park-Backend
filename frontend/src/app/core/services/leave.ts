import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable,BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment.development';
@Injectable({ providedIn: 'root' })
export class LeaveService {
  private http = inject(HttpClient);
  private url = environment.apiUrl + '/leaves';

  requestLeave(data: any) {
    return this.http.post(this.url + '/createRequest', data);
  }

  getAllLeaves() {
    return this.http.get(this.url + '/getAll');
  }
  getMyLeaves() {
    return this.http.get(this.url + '/getMyLeaves');
  }
  getLeavesById(id:any) {
    return this.http.get(this.url + '/getById/' + id);
  }

  updateLeaveStatus(id: string, status: string, rejectionReason?: string) {
    return this.http.put(this.url + '/updateStatus/' + id, { status, rejectionReason });
  }
  deleteLeavesStatus(id:any){
    
    return this.http.delete(this.url + '/deleteStatus/' + id);

  }
   userUpdated$ = new BehaviorSubject<void>(undefined);
  
    notifyUserUpdated(): void {
      this.userUpdated$.next();
    }
}