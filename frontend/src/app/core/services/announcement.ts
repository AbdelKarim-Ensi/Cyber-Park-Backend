import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AnnouncementService {
  private http = inject(HttpClient);
  private url = environment.apiUrl + '/announcements';

  getAllAnnouncements() {
    return this.http.get(this.url + '/getAnnouncements');
  }
  getAnnouncementsById(id:any) {
    return this.http.get(this.url + '/getAnnouncementsById/'+ id);
  }

  createAnnouncement(data: any) {
    return this.http.post(this.url + '/createAnnouncements', data);
  }
  updateAnnouncements(id:any,data:any){
    return this.http.put(this.url + '/updateAnnouncements/'+ id,data);
  }
  deleteAnnouncements(id:any) {
    return this.http.delete(this.url + '/deleteAnnouncements/'+ id);
  }

}