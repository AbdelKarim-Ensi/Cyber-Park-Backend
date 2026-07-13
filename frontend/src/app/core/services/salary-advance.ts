import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class SalaryAdvanceService {
  private http = inject(HttpClient);
  private url = environment.apiUrl + '/salaryAdvances';

  requestAdvance(data: any) {
    return this.http.post(this.url + '/request', data);
  }

  getAdvances() {
    return this.http.get(this.url + '/getAdvances');
  }

  updateStatus(id: string, status: string) {
    return this.http.put(this.url + '/process/' + id, { status });
  }
  deleteAdvance(id:any){
    return this.http.delete(this.url + '/deleteAdvance/' + id);
  }
  getAllAdvances() {
    return this.http.get(this.url + '/getAllAdvances');
  }
  getAdvanceById(id: string) {
    return this.http.get(this.url + '/getAdvancesById/' + id);
  }

  
}