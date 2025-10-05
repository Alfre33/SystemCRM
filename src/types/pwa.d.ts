export {};

declare global {
  // Evento no estándar: beforeinstallprompt
  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[]; // e.g. ["web"]
    prompt(): Promise<void>;
    userChoice: Promise<{
      outcome: 'accepted' | 'dismissed';
      platform: string;
    }>;
  }

  // Para que addEventListener conozca el tipo
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
