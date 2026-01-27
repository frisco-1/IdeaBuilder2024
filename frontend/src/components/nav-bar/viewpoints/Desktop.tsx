import { Link } from 'react-router-dom';
import SearchBar from '../../SearchBar';
import HamburgerMenu from '../HamburgerMenu';
import RightActions from '../row2-main-header/RightActions';
import CategoryBar from '../row3-category-bar/CategoryBar';

function Desktop() {
  return (
    <>
      <div className="hidden md:flex flex-col sm:flex-row justify-center items-center gap-3 w-full px-4 py-2">
        {/* Left */}
        <div className="flex items-center gap-2 shrink-0">
          <HamburgerMenu />

          <Link to="/" className="flex items-center gap-2 shrink-0 no-underline">
            <img
              src="/img/ib logo.PNG"
              alt="Idea Builder"
              className="h-8 w-auto"
            />
            <span className="font-bold text-black">
              Idea Builder
            </span>
          </Link>
        </div>

        {/* Center */}
        <div className="w-full sm:max-w-xl">
          <SearchBar />
        </div>

        {/* Right */}
        <RightActions />

        
      </div>
      
      <div className="hidden md:block">
        <CategoryBar />
      </div>
    </>
    
  )
}

export default Desktop