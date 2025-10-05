import { useOnline } from '../hooks/useOnline';

export function OfflineBanner() {
  const online = useOnline();
  if (online) return null;
  return (
    <div className="bg-yellow-200 border-3 border-black/20 text-black text-sm px-4 py-2 text-center">
      ⚠️ Estás sin conexión. Puedes seguir usando la app y se sincronizará al
      volver.
    </div>
  );
}
