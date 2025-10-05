import Nav from '../components/Nav';
import { OfflineBanner } from '../components/OfflineBanner';
interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Nav />
      <OfflineBanner />
      <main className="mx-auto max-w-3xl px-4 py-6 grid gap-6">{children}</main>
      <footer className="text-center text-sm py-6 opacity-70">
        Offline-first • PWA • Vite + React
      </footer>
    </>
  );
}
