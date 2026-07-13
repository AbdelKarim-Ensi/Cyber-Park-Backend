import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);
  private url = environment.apiUrl + '/projects';

  getProjects() {
    return this.http.get(this.url + '/getAll');
  }

  createProject(data: any) {
    return this.http.post(this.url + '/create', data);
  }

  updateProject(id: string, data: any) {
    return this.http.put(this.url + '/update/' + id, data);
  }

  deleteProject(id: string) {
    return this.http.delete(this.url + '/delete/' + id);
  }
  getProjectById(id:any){
    return this.http.get(this.url + '/getProjectById/'+ id); 
  }
}