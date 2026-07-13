import { ChangeDetectionStrategy, Component, HostListener, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router'; // 👈 Ajouté pour la navigation vers le login
import { AppIcon, IconName } from '../../app-icon';
// AJOUT : imports pour le formulaire réactif et le service Subscriber
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubscriberService } from '../../core/services/subscriber';

type NavLink = { label: string; href: string; };
type Service = { icon: IconName; title: string; description: string; };
type Feature = Service;
type Stat = { number: string; label: string; };
type Project = { image: string; name: string; type: string; tech: string; };
type ProcessStep = { step: string; title: string; description: string; };
type Testimonial = { name: string; role: string; image: string; quote: string; };

// --- CONFIGURATION DU COMPOSANT ---
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [AppIcon, ReactiveFormsModule], // AJOUT : ReactiveFormsModule pour le modal
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  // --- VARIABLES ---
  protected readonly isScrolled = signal(false);
  protected readonly mobileMenuOpen = signal(false);
  protected readonly darkMode = signal(false);
  protected readonly currentYear = new Date().getFullYear();
  protected readonly fallbackImage = '/assets/cyberParkphoto.png';
  protected readonly stars = [1, 2, 3, 4, 5];

  // AJOUT : état et dépendances du modal d'inscription visiteur
  private readonly fb = inject(FormBuilder);
  private readonly subscriberService = inject(SubscriberService);

  protected readonly registrationModalOpen = signal(false);
  protected readonly registrationLoading = signal(false);
  protected readonly registrationSuccess = signal(false);
  protected readonly registrationError = signal<string | null>(null);

  protected readonly registrationForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  // --- DONNÉES DE LA PAGE ---
  protected readonly navLinks: NavLink[] = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'À propos', href: '#a-propos' },
    { label: 'Contact', href: '#contact' },
  ];

  protected readonly services: Service[] = [
    { icon: 'layout-template', title: 'Création de Sites Web', description: 'Sites professionnels rapides, élégants et optimisés pour convertir.' },
    { icon: 'shopping-cart', title: 'E-commerce', description: 'Boutiques en ligne performantes, sécurisées et simples à gérer.' },
    { icon: 'box', title: 'Applications Web', description: 'Solutions métier personnalisées, robustes et prêtes à évoluer.' },
    { icon: 'pen-tool', title: 'UI/UX Design', description: 'Interfaces modernes, intuitives et pensées pour vos utilisateurs.' },
    { icon: 'search', title: 'SEO', description: 'Architecture, contenus et performances optimisés pour la visibilité.' },
    { icon: 'wrench', title: 'Maintenance & Support', description: 'Assistance continue, correctifs, sécurité et améliorations régulières.' },
  ];

  protected readonly features: Feature[] = [
    { icon: 'code', title: 'Développement moderne', description: 'Stacks actuelles, architecture claire et performances solides dès le départ.' },
    { icon: 'smartphone', title: 'Design responsive', description: 'Une expérience fluide sur mobile, tablette et ordinateur.' },
    { icon: 'globe', title: 'Optimisation SEO', description: 'Une base technique pensée pour Google autant que pour vos clients.' },
    { icon: 'clock', title: 'Livraison rapide', description: 'Des cycles courts et une méthode lisible pour lancer sans friction.' },
  ];

  protected readonly stats: Stat[] = [
    { number: '150+', label: 'Sites créés' },
    { number: '80+', label: 'Clients satisfaits' },
    { number: '5+', label: "Années d'expérience" },
    { number: '99%', label: 'Disponibilité' },
  ];

  protected readonly projects: Project[] = [
    { image: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', name: 'Nexus Shop', type: 'E-commerce', tech: 'Angular / Shopify' },
    { image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', name: 'DataFlow', type: 'Application Web', tech: 'Angular / Node.js' },
    { image: 'https://images.unsplash.com/photo-1642132652860-471b4228023e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', name: 'FinCorp', type: 'Site vitrine corporate', tech: 'Webflow / GSAP' },
  ];

  protected readonly processSteps: ProcessStep[] = [
    { step: '01', title: 'Analyse', description: 'Étude de vos besoins et objectifs.' },
    { step: '02', title: 'Design', description: 'Création de maquettes UI/UX.' },
    { step: '03', title: 'Code', description: 'Développement sur mesure.' },
    { step: '04', title: 'Tests', description: 'Contrôle qualité et optimisation.' },
    { step: '05', title: 'Lancement', description: 'Mise en ligne et suivi.' },
  ];

  protected readonly testimonials: Testimonial[] = [
    { name: 'Sophie Martin', role: 'CEO, RetailPro', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', quote: "L'équipe de Cyber Park a transformé notre vision en un site e-commerce ultra-performant. Nos ventes ont augmenté de 40% dès le premier mois." },
    { name: 'Thomas Dubois', role: 'Fondateur, TechFlow', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', quote: 'Un professionnalisme rare. Ils ont compris nos enjeux complexes et livré une application robuste dans les délais.' },
    { name: 'Claire Lemaire', role: 'Directrice Marketing, Innova', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', quote: "Le design est magnifique et pensé pour la conversion. La communication a été fluide tout au long du projet." },
  ];

  // --- MÉTHODES ---
  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  protected toggleDarkMode(): void {
    this.darkMode.update((value) => !value);
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((value) => !value);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  protected useFallbackImage(event: Event): void {
    const image = event.target as HTMLImageElement;
    if (!image.src.endsWith(this.fallbackImage)) {
      image.src = this.fallbackImage;
    }
  }

  // AJOUT : ouverture/fermeture du modal d'inscription visiteur
  protected openRegistrationModal(): void {
    this.registrationSuccess.set(false);
    this.registrationError.set(null);
    this.registrationForm.reset();
    this.registrationModalOpen.set(true);
  }

  protected closeRegistrationModal(): void {
    this.registrationModalOpen.set(false);
  }

  // AJOUT : soumission réelle vers POST /api/subscribers/register
  protected submitRegistration(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.registrationLoading.set(true);
    this.registrationError.set(null);

    this.subscriberService.registerSubscriber(this.registrationForm.getRawValue()).subscribe({
      next: () => {
        this.registrationLoading.set(false);
        this.registrationSuccess.set(true);
        this.registrationForm.reset();
      },
      error: (err) => {
        this.registrationLoading.set(false);
        this.registrationError.set(
          err?.error?.message || "Une erreur est survenue. Veuillez réessayer."
        );
      },
    });
  }
}