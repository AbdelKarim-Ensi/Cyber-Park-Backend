import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class SubscriberService {
  private http = inject(HttpClient);
  private url = environment.apiUrl + '/subscribers';

  registerSubscriber(data: { firstName: string; lastName: string; email: string }) {
    return this.http.post(this.url + '/register', data);
  }
  unsubscribe(id: string) {
    return this.http.get(this.url + '/unsubscribe/' + id);
  }
   // AJOUT : déclenche l'envoi d'un broadcast (ADMIN only) à tous les abonnés actifs
  broadcastEvent(data: { title: string; message: string }) {
    return this.http.post(this.url + '/broadcast', data);
  }

  // AJOUT : récupère la liste des abonnés (ADMIN only), utile pour afficher le compteur
  getAllSubscribers() {
    return this.http.get(this.url + '/allSubscribers');
  }
}