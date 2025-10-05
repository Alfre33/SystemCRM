import { useEffect, useState } from 'react';

export default function InstallButton() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(
    null
  );

  useEffect(() => {
    const onPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault(); // evita el prompt automático
      setDeferred(e); // guardamos el evento para usarlo luego
    };

    const onInstalled = () => setDeferred(null); // limpieza si se instala

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (!deferred) return null;

  const handleClick = async () => {
    await deferred.prompt();
    await deferred.userChoice; // 'accepted' | 'dismissed'
    setDeferred(null);
  };

  return (
    <button
      className="btn"
      onClick={handleClick}
      aria-label="Instalar PomoDash"
    >
      Instalar PomoDash
    </button>
  );
}
