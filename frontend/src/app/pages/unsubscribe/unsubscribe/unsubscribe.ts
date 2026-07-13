import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppIcon } from '../../../app-icon';
import { SubscriberService } from '../../../core/services/subscriber';

type UnsubscribeStatus = 'loading' | 'success' | 'error';

@Component({
  selector: 'app-unsubscribe',
  standalone: true,
  imports: [AppIcon, RouterLink],
  templateUrl: './unsubscribe.html',
  styleUrl: './unsubscribe.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnsubscribeComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly subscriberService = inject(SubscriberService);

  protected readonly status = signal<UnsubscribeStatus>('loading');
  protected readonly errorMessage = signal<string | null>(null);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.status.set('error');
      this.errorMessage.set('Lien de désabonnement invalide.');
      return;
    }

    this.subscriberService.unsubscribe(id).subscribe({
      next: () => this.status.set('success'),
      error: (err) => {
        this.status.set('error');
        this.errorMessage.set(err?.error?.message || 'Une erreur est survenue.');
      },
    });
  }
}