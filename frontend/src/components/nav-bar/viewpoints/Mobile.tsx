import { Link } from 'react-router-dom';
import SearchBar from '../row2-main-header/SearchBar';
import HamburgerMenu from '../HamburgerMenu';
import RightActions from '../row2-main-header/RightActions';

function Mobile() {
  return (
    <div className="block md:hidden w-full">
    {/* Row: Hamburger + Logo + Sign In */}
    <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2 flex-shrink-0">
        <HamburgerMenu />

        <Link to="/" className="flex items-center gap-2 flex-shrink-0 no-underline">
            <img
            src="/img/ib logo.PNG"
            alt="Idea Builder"
            className="h-8 w-auto"
            />
            <span className="font-bold text-black ">
            Idea Builder
            </span>
        </Link>
        </div>
          <RightActions />
        </div>

        {/* Search bar below */}
        <div className="px-4 pb-2">
            <SearchBar />
        </div>
    </div>
  )
}

export default Mobile