import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ChatMessagePart {
  text: string;
}

export interface ChatHistoryEntry {
  role: 'user' | 'model';
  parts: ChatMessagePart[];
}

export interface ChatbotResponse {
  success: boolean;
  reply?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class Chatbot {
  private readonly apiUrl = `${environment.apiUrl}/chatbot/chat`;

  constructor(private http: HttpClient) {}

  sendMessage(message: string, history: ChatHistoryEntry[]): Observable<ChatbotResponse> {
    return this.http.post<ChatbotResponse>(this.apiUrl, { message, history });
  }
}