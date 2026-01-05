import { Link } from 'react-router-dom';
// import { FaShoppingCart } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';

export default function RightActions() {
  return (
    <div className="flex items-center gap-4">
      <Link
        to="/sign-in"
        className="flex items-center gap-1 text-sm hover:underline"
      >
        <VscAccount />
        Sign In
      </Link>
    {/* Shopping Feature implemented soon */}
      {/* <Link to="/cart" className="relative">
        <FaShoppingCart className="text-lg" />
        <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1 text-xs text-white">
          0
        </span>
      </Link> */}
    </div>
  );
}
