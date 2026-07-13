import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

/**
 * Représente les couleurs du thème extraites des variables CSS.
 */
interface ThemeColors {
  background: string;
  text: string;
  border: string;
  primary: string;
}

/**
 * Options supplémentaires pour personnaliser l'alerte.
 */
export interface AlertOptions {
  title: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  timer?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  // ─── Couleurs de secours basées exactement sur la charte Cyber Park ───────
  private readonly FALLBACK_COLORS = {
    light: {
      background: '#ffffff',
      text: '#1f2937',
      border: '#e5e7eb',
      primary: '#2563eb'
    },
    dark: {
      background: '#0f172a', // 👈 Ton bleu nuit profond Cyber Park
      text: '#f8fafc',       // 👈 Blanc cassé pour une lecture parfaite
      border: '#1e293b',
      primary: '#3b82f6'
    }
  };

  // ─── Couleurs des boutons par type d'alerte ───────────────────────────────
  private readonly BUTTON_COLORS = {
    success: '#3b82f6', // Bleu d'action harmonieux
    error: '#ef4444',
    warning: '#f59e0b',
    confirm: '#3b82f6'
  };

  /**
   * Affiche une alerte de succès.
   */
  success(options: AlertOptions): Promise<SweetAlertResult> {
    return Swal.fire(this.buildOptions({
      icon: 'success',
      confirmButtonColor: this.BUTTON_COLORS.success,
      ...options
    }));
  }

  /**
   * Affiche une alerte d'erreur.
   */
  error(options: AlertOptions): Promise<SweetAlertResult> {
    return Swal.fire(this.buildOptions({
      icon: 'error',
      confirmButtonColor: this.BUTTON_COLORS.error,
      ...options
    }));
  }

  /**
   * Affiche une alerte d'avertissement.
   */
  warning(options: AlertOptions): Promise<SweetAlertResult> {
    return Swal.fire(this.buildOptions({
      icon: 'warning',
      confirmButtonColor: this.BUTTON_COLORS.warning,
      ...options
    }));
  }

  /**
   * Affiche une boîte de dialogue de confirmation (Oui / Non).
   */
  async confirm(options: AlertOptions): Promise<boolean> {
    const result = await Swal.fire(this.buildOptions({
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: this.BUTTON_COLORS.confirm,
      cancelButtonColor: this.BUTTON_COLORS.error,
      confirmButtonText: options.confirmButtonText ?? 'Confirmer',
      cancelButtonText: options.cancelButtonText ?? 'Annuler',
      ...options
    }));
    return result.isConfirmed;
  }

  /**
   * Affiche une alerte avec timer automatique (se ferme seule).
   */
  toast(options: AlertOptions & { icon?: 'success' | 'error' | 'warning' | 'info' }): Promise<SweetAlertResult> {
    const colors = this.getThemeColors();
    return Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: options.timer ?? 3000,
      timerProgressBar: true,
      icon: options.icon ?? 'success',
      title: options.title,
      text: options.message,
      background: colors.background,
      color: colors.text,
      customClass: {
        popup: 'swal-popup swal-toast'
      }
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Méthodes privées
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Construit l'objet d'options SweetAlert2 en injectant les couleurs
   */
  private buildOptions(
    overrides: Partial<SweetAlertOptions> & { title: string; message: string }
  ): SweetAlertOptions {
    const colors = this.getThemeColors();
    const { message, ...rest } = overrides;
    const opts = {
      text: message,
      background: colors.background,
      color: colors.text,
      confirmButtonText: overrides.confirmButtonText ?? 'OK',
      customClass: {
        popup: 'swal-popup',
        confirmButton: 'swal-confirm-btn',
        cancelButton: 'swal-cancel-btn',
        title: 'swal-title',
        htmlContainer: 'swal-text'
      },
      ...rest
    };

    // Cast to SweetAlertOptions to satisfy TypeScript unions from sweetalert2's
    // complex overloads (e.g. input: 'file' narrowing). The runtime object is valid.
    return opts as unknown as SweetAlertOptions;
  }

  /**
   * Lit les variables CSS du thème ou se rabat sur la classe .dark de Tailwind
   */
  private getThemeColors(): ThemeColors {
    const styles = getComputedStyle(document.documentElement);
    
    // 🔍 FIX ICI : Détection basée sur la classe 'dark' standard de ton application
    const isDark = document.documentElement.classList.contains('dark') 
      || document.body.classList.contains('dark')
      || document.documentElement.getAttribute('data-theme') === 'dark'
      || localStorage.getItem('theme') === 'dark'; // Double sécurité avec ton localStorage

    const fallback = isDark ? this.FALLBACK_COLORS.dark : this.FALLBACK_COLORS.light;

    return {
      background: styles.getPropertyValue('--bg-surface').trim() || fallback.background,
      text: styles.getPropertyValue('--text-main').trim() || fallback.text,
      border: styles.getPropertyValue('--border').trim() || fallback.border,
      primary: styles.getPropertyValue('--primary').trim() || fallback.primary
    };
  }
}