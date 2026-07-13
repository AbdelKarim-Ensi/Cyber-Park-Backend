import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type IconName =
  | 'arrow-right'
  | 'box'
  | 'chevron-right'
  | 'clock'
  | 'code'
  | 'github'
  | 'globe'
  | 'layout-template'
  | 'linkedin'
  | 'menu'
  | 'moon'
  | 'pen-tool'
  | 'search'
  | 'shopping-cart'
  | 'smartphone'
  | 'star'
  | 'sun'
  | 'twitter'
  | 'wrench'
  | 'x'
  | 'zap';

@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @switch (name) {
        @case ('arrow-right') {
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        }
        @case ('box') {
          <path d="m21 8-9-5-9 5 9 5 9-5Z" />
          <path d="M3 8v8l9 5 9-5V8" />
          <path d="M12 13v8" />
        }
        @case ('chevron-right') {
          <path d="m9 18 6-6-6-6" />
        }
        @case ('clock') {
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        }
        @case ('code') {
          <path d="m16 18 6-6-6-6" />
          <path d="m8 6-6 6 6 6" />
        }
        @case ('github') {
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.35-2.47-1.2-3.4.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5a10.4 10.4 0 0 0-5.6 0C8.2 2.1 7.2 2.1 7.2 2.1a6.2 6.2 0 0 0 0 3.5A5.1 5.1 0 0 0 6 9.2c0 3.5 3 5.5 6 5.5a4.8 4.8 0 0 0-1 3.5v4" />
          <path d="M9 18c-4.5 2-5-2-7-2" />
        }
        @case ('globe') {
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
        }
        @case ('layout-template') {
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        }
        @case ('linkedin') {
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        }
        @case ('menu') {
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        }
        @case ('moon') {
          <path d="M20.9 13.5A8 8 0 1 1 10.5 3.1 6.2 6.2 0 0 0 20.9 13.5Z" />
        }
        @case ('pen-tool') {
          <path d="M12 19 5 12l7-9 7 9-7 7Z" />
          <path d="M12 19v3" />
          <path d="M5 12h14" />
        }
        @case ('search') {
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        }
        @case ('shopping-cart') {
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.1 2.1h2l2.7 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21 6H5" />
        }
        @case ('smartphone') {
          <rect width="14" height="20" x="5" y="2" rx="2" />
          <path d="M12 18h.01" />
        }
        @case ('star') {
          <path
            d="m12 2 3.1 6.3 6.9 1-5 4.8 1.2 6.9-6.2-3.3L5.8 21 7 14.1 2 9.3l6.9-1L12 2Z"
            fill="currentColor"
            stroke="none"
          />
        }
        @case ('sun') {
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.9 4.9 1.4 1.4" />
          <path d="m17.7 17.7 1.4 1.4" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m4.9 19.1 1.4-1.4" />
          <path d="m17.7 6.3 1.4-1.4" />
        }
        @case ('twitter') {
          <path d="M22 4.6c-.8.4-1.6.6-2.5.7.9-.5 1.5-1.3 1.8-2.3-.8.5-1.8.9-2.8 1.1A4.3 4.3 0 0 0 11 7c0 .3 0 .7.1 1A12.2 12.2 0 0 1 2.2 3.5a4.3 4.3 0 0 0 1.3 5.8c-.7 0-1.4-.2-2-.5v.1a4.3 4.3 0 0 0 3.5 4.2c-.4.1-.8.2-1.2.2-.3 0-.6 0-.8-.1a4.3 4.3 0 0 0 4 3 8.7 8.7 0 0 1-5.4 1.9H.5A12.3 12.3 0 0 0 7.2 20c8 0 12.4-6.6 12.4-12.4v-.6c.9-.6 1.6-1.4 2.2-2.3Z" />
        }
        @case ('wrench') {
          <path d="M14.7 6.3a4 4 0 0 0 5 5L11 20l-5-5 8.7-8.7Z" />
          <path d="m7.5 17.5-1-1" />
        }
        @case ('x') {
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        }
        @case ('zap') {
          <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z" />
        }
      }
    </svg>
  `,
})
export class AppIcon {
  @Input({ required: true }) name!: IconName;
  @Input() size = 24;
}
