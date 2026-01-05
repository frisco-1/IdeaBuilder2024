import TopBarInfo from './row1-top-info-bar/TopBarInfo';
import Mobile from './viewpoints/Mobile';
import Desktop from './viewpoints/Desktop';

export default function NavbarComponent() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
      <TopBarInfo />
      <Mobile />
      <Desktop />
    </header>
  );
}