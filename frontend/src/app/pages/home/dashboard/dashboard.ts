import { Component, OnInit, inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerService } from '../../../core/timer';
import { AttendanceService } from '../../../core/services/attendance';
import { AnnouncementService } from '../../../core/services/announcement';
import Swal from 'sweetalert2';
import { SubscriberService } from '../../../core/services/subscriber';

// AJOUT : Imports nécessaires pour le rafraîchissement automatique (polling)
import { interval, Subscription } from 'rxjs';
export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}
export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}
interface AttendanceDoc {
  _id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY';
  notes?: string;
}

interface AttendanceRow {
  id: string;
  date: string;
  type: 'Entrée' | 'Sortie' | 'Début pause' | 'Fin pause';
  time: string;
  status: string;
  sortTime?: number;
}

interface AnnouncementDoc {
  _id?: string;
  id?: string;
  title?: string;
  name?: string;
  content?: string;
  description?: string;
  message?: string;
  body?: string;
  createdAt?: string;
  date?: string;
  updatedAt?: string;
  target?: string;
}

interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  sortTime: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit, OnDestroy { // AJOUT : Implémentation de OnDestroy

  private attendanceService = inject(AttendanceService);
  private announcementService = inject(AnnouncementService); 
  private cdr = inject(ChangeDetectorRef);
   private subscriberService = inject(SubscriberService);

  constructor(public timer: TimerService) {}

  attendances: AttendanceRow[] = [];
  loadingAttendances = false;
  attendanceError = '';
    broadcastLoading: boolean = false;

  
  todayDoc: AttendanceDoc | null = null;
  checkInLoading = false;
  checkOutLoading = false;

  isOnBreak = false;
  breakRows: AttendanceRow[] = [];

  announcements: AnnouncementItem[] = [];
  loadingAnnouncements = false;
  announcementError = '';
  private readonly MAX_ANNOUNCEMENTS = 3;
  isAdmin: boolean = false;
  allEmployeeCards: any[] = [];
  loadingAdminCards: boolean = false;

  // =========================================================
  // AJOUT : VARIABLES POUR LE RESPONSIVE ET LE POLLING AUTOMATIQUE
  // =========================================================
  private autoRefreshSub?: Subscription;
  isSidebarOpen: boolean = false;

  ngOnInit(): void {
  // 1️⃣ DÉTECTION DU RÔLE + DE L'UTILISATEUR (une seule fois, proprement)
  try {
    const userStr = localStorage.getItem('user');
    let role = localStorage.getItem('role') || '';

    if (userStr) {
      const userObj = JSON.parse(userStr);
      role = userObj.role || (userObj.data && userObj.data.role) || role;
      this.currentUserId = userObj._id || userObj.id || userObj.email || 'guest';
    } else {
      this.currentUserId = 'guest';
    }

    this.isAdmin = role.toUpperCase().trim().replace('ROLE_', '') === 'ADMIN';
  } catch (e) {
    const userRole = localStorage.getItem('role') || '';
    this.isAdmin = userRole.toUpperCase() === 'ADMIN';
    this.currentUserId = 'guest';
  }

  // 2️⃣ CHARGEMENT DES TO-DO — UNIQUEMENT pour cet utilisateur
  this.initTodoList();

  // 3️⃣ CHARGEMENT DES AUTRES DONNÉES
  this.loadMyAttendance();
  this.loadAnnouncements();
  if (this.isAdmin) {
    this.loadAllEmployeesAttendances();
  }
  this.setupMidnightReset();

  // AJOUT : POLLING AUTOMATIQUE TOUTES LES 60 SECONDES
  this.autoRefreshSub = interval(60000).subscribe(() => {
    this.loadMyAttendance();
    if (this.isAdmin) {
      this.loadAllEmployeesAttendances();
    }
  });
}


  // =========================================================
  // AJOUT : MÉTHODES POUR ON-DESTROY ET LOGIQUE SIDEBAR MOBILE
  // =========================================================
  ngOnDestroy(): void {
    if (this.autoRefreshSub) {
      this.autoRefreshSub.unsubscribe();
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

private initTodoList(): void {
  const todayStr = new Date().toLocaleDateString('fr-FR');
  const savedDate = localStorage.getItem(`todo_date_${this.currentUserId}`);
  const savedTodos = localStorage.getItem(`todos_${this.currentUserId}`);

  // Si on est le même jour ET que ce user a déjà des tâches sauvegardées
  if (savedDate === todayStr && savedTodos) {
    this.todos = JSON.parse(savedTodos);
  } else {
    // Première connexion de ce user OU nouveau jour → liste vide
    this.todos = [];
    this.saveTodosToStorage();
  }
  this.cdr.detectChanges();
}

private saveTodosToStorage(): void {
  const todayStr = new Date().toLocaleDateString('fr-FR');
  localStorage.setItem(`todo_date_${this.currentUserId}`, todayStr);
  localStorage.setItem(`todos_${this.currentUserId}`, JSON.stringify(this.todos));
}

  /**
   * Planifie un nettoyage automatique en temps réel si l'utilisateur laisse son écran ouvert à 00:00
   */
  private setupMidnightReset(): void {
    const now = new Date();
    // Crée la date de demain à exactement 00:00:00
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
    const timeToMidnight = midnight.getTime() - now.getTime();

    setTimeout(() => {
      // Action exécutée pile à minuit !
      this.todos = [];
      this.saveTodosToStorage();
      this.cdr.detectChanges(); // Force Angular à vider l'écran immédiatement
      
      // Relancer la planification pour le minuit suivant
      this.setupMidnightReset();
    }, timeToMidnight);
  }

  get allAttendanceRows(): AttendanceRow[] {
    return [...this.attendances, ...this.breakRows].sort((a, b) => (a.sortTime ?? 0) - (b.sortTime ?? 0));
  }

  getTypeBadgeClass(type: string): string {
    switch (type) {
      case 'Entrée': return 'badge-blue';
      case 'Sortie': return 'badge-purple';
      case 'Début pause': return 'badge-orange';
      case 'Fin pause': return 'badge-teal';
      default: return 'badge-purple';
    }
  }

  onTogglePause(): void {
    if (!this.todayDoc || this.todayDoc.checkOut) return;

    const now = new Date();
    const nowIso = now.toISOString();

    if (!this.isOnBreak) {
      this.isOnBreak = true;
      this.breakRows.push({
        id: 'break-start-' + now.getTime(),
        date: this.formatDate(nowIso),
        type: 'Début pause',
        time: this.formatTime(nowIso),
        status: 'Validé',
        sortTime: now.getTime()
      });
      this.timer.stopTimer();
    } else {
      this.isOnBreak = false;
      this.breakRows.push({
        id: 'break-end-' + now.getTime(),
        date: this.formatDate(nowIso),
        type: 'Fin pause',
        time: this.formatTime(nowIso),
        status: 'Validé',
        sortTime: now.getTime()
      });
      this.timer.startTimer();
    }
    this.cdr.detectChanges();
  }

  loadAllEmployeesAttendances(): void {
    this.loadingAdminCards = true;
    this.attendanceService.getAllAttendances().subscribe({
      next: (res: any) => {
        const rawData = res?.data ? res.data : res;
        this.allEmployeeCards = Array.isArray(rawData) ? rawData : (rawData ? [rawData] : []);
        this.loadingAdminCards = false;
      },
      error: (err) => {
        console.error("Erreur admin lors de la récupération globale :", err);
        this.loadingAdminCards = false;
      }
    });
  }

  loadAnnouncements(): void {
    this.loadingAnnouncements = true;
    this.announcementError = '';
    this.announcementService.getAllAnnouncements().subscribe({
      next: (res: any) => {
        const rawData = res?.data ? res.data : res;
        let list: AnnouncementDoc[] = Array.isArray(rawData) ? rawData : (rawData ? [rawData] : []);

        // Filtrage des annonces Admin pour les simples employés
        if (!this.isAdmin) {
          list = list.filter(doc => doc.target !== 'ADMIN_ONLY');
        }

        this.announcements = list
          .map(doc => this.mapAnnouncement(doc))
          .sort((a, b) => b.sortTime - a.sortTime) 
          .slice(0, this.MAX_ANNOUNCEMENTS);

        this.loadingAnnouncements = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.announcementError = 'Impossible de charger les annonces.';
        this.announcements = [];
        this.loadingAnnouncements = false;
        this.cdr.detectChanges();
      }
    });
  }

  private mapAnnouncement(doc: AnnouncementDoc): AnnouncementItem {
    const rawDate = doc.createdAt || doc.date || doc.updatedAt || '';
    const title = doc.title || doc.name || 'Annonce';
    const excerpt = doc.content || doc.description || doc.message || doc.body || '';
    return {
      id: doc._id || doc.id || (title + rawDate),
      title,
      date: this.formatAnnouncementDate(rawDate),
      excerpt,
      sortTime: rawDate ? new Date(rawDate).getTime() : 0
    };
  }

  private formatAnnouncementDate(value?: string): string {
    if (!value) return '';
    const d = new Date(value);
    if (isNaN(d.getTime())) return '';

    const startOfDay = (dt: Date) => new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).getTime();
    const diffDays = Math.round((startOfDay(new Date()) - startOfDay(d)) / 86400000);

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return 'Hier';
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  get isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
  }

  loadMyAttendance(): void {
    this.loadingAttendances = true;
    this.attendanceError = '';
    this.attendanceService.getMyAttendance().subscribe({
      next: (res: any) => {
        const rawData = res?.data ? res.data : res;
        let doc: AttendanceDoc | null = null;

        if (rawData) {
          doc = Array.isArray(rawData) ? rawData[0] : rawData;
        }

        this.todayDoc = doc ?? null;
        this.attendances = doc ? this.mapToRows(doc) : [];

        if (doc && doc.checkIn && !doc.checkOut) {
          this.syncRunningTimer(doc.checkIn);
        } else {
          this.timer.stopTimer();
        }

        this.loadingAttendances = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        if (this.isAdmin) {
          this.attendanceError = '';
          this.attendances = [];
        } else {
          this.attendanceError = 'Impossible de charger votre pointage.';
        }
        this.loadingAttendances = false;
        this.cdr.detectChanges();
      }
    });
  }

  private syncRunningTimer(checkInIso: string): void {
    const elapsedSeconds = Math.floor((Date.now() - new Date(checkInIso).getTime()) / 1000);
    this.timer.seconds.set(Math.max(0, elapsedSeconds));
    this.timer.timerStatus.set('running');
    if (this.timer.timerStatus() !== 'running') {
      this.timer.startTimer();
    }
  }

  onCheckIn(): void {
    if (this.checkInLoading) return;
    this.checkInLoading = true;
    this.attendanceService.checkIn().subscribe({
      next: (res: any) => {
        this.checkInLoading = false;
        this.isOnBreak = false;
        this.breakRows = [];
        this.timer.stopTimer();
        this.timer.startTimer();
        this.cdr.detectChanges();
        Swal.fire({
          title: 'Présence enregistrée !',
          text: res?.message || 'Votre arrivée a été pointée.',
          icon: 'success',
          confirmButtonColor: '#2563eb',
          background: this.isDarkMode ? '#161b26' : '#ffffff',
          color: this.isDarkMode ? '#ffffff' : '#0f172a'
        });
        this.loadMyAttendance();
        if (this.isAdmin) this.loadAllEmployeesAttendances(); 
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.checkInLoading = false;
        Swal.fire({
          title: 'Erreur',
          text: err?.error?.message || "Impossible d'enregistrer votre arrivée.",
          icon: 'error',
          confirmButtonColor: '#ef4444',
          background: this.isDarkMode ? '#161b26' : '#ffffff',
          color: this.isDarkMode ? '#ffffff' : '#0f172a'
        });
      }
    });
  }

  onCheckOut(): void {
    if (this.checkOutLoading) return;
    this.checkOutLoading = true;
    this.attendanceService.checkOut().subscribe({
      next: (res: any) => {
        this.checkOutLoading = false;
        this.isOnBreak = false;
        this.timer.stopTimer();
        this.cdr.detectChanges();
        Swal.fire({
          title: 'Départ enregistré !',
          text: res?.message || 'Votre départ a été pointé.',
          icon: 'success',
          confirmButtonColor: '#2563eb',
          background: this.isDarkMode ? '#161b26' : '#ffffff',
          color: this.isDarkMode ? '#ffffff' : '#0f172a'
        });
        this.loadMyAttendance();
        if (this.isAdmin) this.loadAllEmployeesAttendances(); 
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.checkOutLoading = false;
        Swal.fire({
          title: 'Erreur',
          text: err?.error?.message || "Impossible d'enregistrer votre départ.",
          icon: 'error',
          confirmButtonColor: '#ef4444',
          background: this.isDarkMode ? '#161b26' : '#ffffff',
          color: this.isDarkMode ? '#ffffff' : '#0f172a'
        });
      }
    });
  }

  private mapToRows(doc: AttendanceDoc): AttendanceRow[] {
    const rows: AttendanceRow[] = [];
    const dateLabel = this.formatDate(doc.date);
    const statusLabel = this.mapStatus(doc.status);

    if (doc.checkIn) {
      rows.push({
        id: doc._id + '-in',
        date: dateLabel,
        type: 'Entrée',
        time: this.formatTime(doc.checkIn),
        status: statusLabel,
        sortTime: new Date(doc.checkIn).getTime()
      });
    }

    if (doc.checkOut) {
      rows.push({
        id: doc._id + '-out',
        date: dateLabel,
        type: 'Sortie',
        time: this.formatTime(doc.checkOut),
        status: 'Normal',
        sortTime: new Date(doc.checkOut).getTime()
      });
    }

    return rows;
  }

  private mapStatus(status: string): string {
    switch (status) {
      case 'LATE': return 'En retard';
      case 'ABSENT': return 'Absent';
      case 'HALF_DAY': return 'Demi-journée';
      case 'PRESENT':
      default: return 'Validé';
    }
  }

  private formatDate(value: string): string {
    if (!value) return '';
    return new Date(value).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  private formatTime(value: string): string {
    if (!value) return '';
    return new Date(value).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  todos: TodoItem[] = [];
  private currentUserId: string = '';

  toggleTodo(id: number): void {
    console.log("1. CLIC DÉTECTÉ sur l'ID :", id);
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      console.log("2. Tâche AVANT modification :", { ...todo });
      // 1. On inverse simplement l'état actuel (vrai devient faux, faux devient vrai)
      todo.completed = !todo.completed;
      console.log("3. Tâche APRÈS modification :", { ...todo });
      
      // 2. On clone le tableau pour forcer l'affichage (très important avec la checkbox)
      this.todos = [...this.todos];
      
      this.saveTodosToStorage();
      this.cdr.detectChanges();
      console.log("4. Tableau complet mis à jour :", this.todos);

      // 3. Optionnel : On supprime après 24h SEULEMENT SI la tâche vient d'être cochée (terminée)
      if (todo.completed) {
        setTimeout(() => {
          // On revérifie au cas où l'utilisateur l'aurait décochée entre temps
          const currentTodo = this.todos.find(t => t.id === id);
          if (currentTodo && currentTodo.completed) {
            this.todos = this.todos.filter(t => t.id !== id);
            this.saveTodosToStorage();
            this.cdr.detectChanges();
          }
        }, 86400000);
      }
    } else {
      console.warn("⚠️ Aucune tâche trouvée avec l'ID :", id);
    }
  }

  deleteTodo(id: number, event: Event): void {
    event.stopPropagation(); // Empêche de déclencher "toggleTodo" quand on clique sur la croix
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveTodosToStorage();
    this.cdr.detectChanges();
  }


 addTask(): void {
    const isDark = this.isDarkMode;
    Swal.fire({
      title: 'Nouvelle tâche',
      input: 'text',
      inputPlaceholder: 'Entrez votre tâche ici...',
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#64748b',
      background: isDark ? '#161b26' : '#ffffff',
      color: isDark ? '#ffffff' : '#0f172a',
      inputValidator: (value) => {
        if (!value || value.trim() === '') {
          return 'Le titre de la tâche ne peut pas être vide !';
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const newTodo: TodoItem = {
          id: Date.now(),
          title: result.value.trim(),
          completed: false
        };
        this.todos = [...this.todos, newTodo];
        this.saveTodosToStorage();
        this.cdr.detectChanges();
      }
    });
  }


  // AJOUT : ouvre un formulaire SweetAlert2 pour envoyer un broadcast à tous les abonnés actifs
  openBroadcastModal(): void {
    const isDark = this.isDarkMode;

    Swal.fire({
      title: 'Diffuser un événement',
      html: `
        <input id="swal-broadcast-title" class="swal2-input" placeholder="Titre de l'événement">
        <textarea id="swal-broadcast-message" class="swal2-textarea" placeholder="Message à diffuser"></textarea>
      `,
      background: isDark ? '#1a1a2e' : '#ffffff',
      color: isDark ? '#f1f5f9' : '#0f172a',
      showCancelButton: true,
      confirmButtonText: 'Envoyer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#2563eb',
      cancelButtonColor: isDark ? '#374151' : '#6b7280',
      preConfirm: () => {
        const title = (document.getElementById('swal-broadcast-title') as HTMLInputElement)?.value?.trim();
        const message = (document.getElementById('swal-broadcast-message') as HTMLTextAreaElement)?.value?.trim();

        if (!title || !message) {
          Swal.showValidationMessage('Le titre et le message sont requis.');
          return false;
        }
        return { title, message };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.sendBroadcast(result.value);
      }
    });
  }

  // AJOUT : appel API pour envoyer le broadcast
  private sendBroadcast(data: { title: string; message: string }): void {
    const isDark = this.isDarkMode;
    this.broadcastLoading = true;
    this.cdr.detectChanges();

    this.subscriberService.broadcastEvent(data).subscribe({
      next: (res: any) => {
        this.broadcastLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'Envoyé !',
          text: res?.message || 'Le broadcast a été envoyé avec succès.',
          background: isDark ? '#1a1a2e' : '#ffffff',
          color: isDark ? '#f1f5f9' : '#0f172a',
          confirmButtonColor: '#2563eb',
        });
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.broadcastLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: err?.error?.message || "Une erreur est survenue lors de l'envoi.",
          background: isDark ? '#1a1a2e' : '#ffffff',
          color: isDark ? '#f1f5f9' : '#0f172a',
          confirmButtonColor: '#2563eb',
        });
        this.cdr.detectChanges();
      },
    });
  }
  

  
}