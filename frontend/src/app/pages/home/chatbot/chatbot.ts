import { Component, signal, computed, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chatbot, ChatHistoryEntry } from '../../../core/services/chatbot';

interface DisplayMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class ChatbotPage implements AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer?: ElementRef<HTMLDivElement>;

  isOpen = signal(false);
  isLoading = signal(false);
  messages = signal<DisplayMessage[]>([
    { role: 'model', text: 'Bonjour ! Je suis l\'assistant RH de Cyber Park HR. Comment puis-je vous aider ?' }
  ]);
  currentInput = signal('');

  hasMessages = computed(() => this.messages().length > 0);

  private shouldScroll = false;

  constructor(private chatbotService: Chatbot) {}

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  toggleWidget(): void {
    this.isOpen.update((v) => !v);
  }

  sendMessage(): void {
    const text = this.currentInput().trim();
    if (!text || this.isLoading()) {
      return;
    }

    // AJOUT : on retire le message d'accueil initial (role 'model') car Gemini exige que l'historique commence par 'user'
const allMessages = this.messages().filter((m) => !m.isError);
const firstUserIndex = allMessages.findIndex((m) => m.role === 'user');
const relevantMessages = firstUserIndex === -1 ? [] : allMessages.slice(firstUserIndex);

const history: ChatHistoryEntry[] = relevantMessages.map((m) => ({
  role: m.role,
  parts: [{ text: m.text }]
}));

    this.messages.update((msgs) => [...msgs, { role: 'user', text }]);
    this.currentInput.set('');
    this.isLoading.set(true);
    this.shouldScroll = true;

    this.chatbotService.sendMessage(text, history).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success && res.reply) {
          this.messages.update((msgs) => [...msgs, { role: 'model', text: res.reply! }]);
        } else {
          this.messages.update((msgs) => [
            ...msgs,
            { role: 'model', text: res.message || 'Impossible de contacter l\'assistant RH pour le moment.', isError: true }
          ]);
        }
        this.shouldScroll = true;
      },
      error: (err) => {
        this.isLoading.set(false);
        const errorMsg = err?.error?.message || 'Impossible de contacter l\'assistant RH pour le moment.';
        this.messages.update((msgs) => [
          ...msgs,
          { role: 'model', text: errorMsg, isError: true }
        ]);
        this.shouldScroll = true;
      }
    });
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }
}