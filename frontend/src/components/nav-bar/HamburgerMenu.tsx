import { useState } from "react";
import { Link } from "react-router-dom";

// Import your real category data
import apparel from "../data/categories/apparel";
import dtf from "../data/categories/dtf";
import stationery from "../data/categories/stationery";
import signage from "../data/categories/signage";
import promo from "../data/categories/promo";

const categories = [
  { name: "Custom Apparel", products: apparel },
  { name: "DTF Products", products: dtf },
  { name: "Stationery Items", products: stationery },
  { name: "Signs & Banners", products: signage },
  { name: "Promotional Products", products: promo },
];

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden text-2xl"
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* Overlay + Sidebar */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden opacity-100 transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <div
            className="
              fixed left-0 top-0 h-full w-72 bg-white shadow-xl z-50 md:hidden
              overflow-y-auto flex flex-col
              transform transition-transform duration-300
              translate-x-0
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-semibold text-lg">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="text-xl"
              >
                ✕
              </button>
            </div>

            {/* Main Navigation */}
            <div className="p-4 space-y-2 flex-1">
              {/* Home */}
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-sm font-medium rounded hover:bg-gray-100 transition"
              >
                Home
              </Link>

              {/* Dynamic Categories */}
              {categories.map((cat, index) => (
                <div key={cat.name}>
                  {/* Category Button */}
                  <button
                    onClick={() => toggleExpand(index)}
                    className={`
                      w-full text-left px-4 py-3 text-sm font-medium rounded transition
                      ${expandedIndex === index
                        ? "bg-[#E9252E] text-white"
                        : "hover:bg-gray-100 text-black"
                      }
                    `}

                  >
                    {cat.name}
                  </button>

                  {/* Expandable Product List */}
                  <div
                    className={`
                      overflow-hidden transition-all duration-300
                      ${expandedIndex === index ? "max-h-full opacity-100" : "max-h-0 opacity-0"}
                    `}
                  >
                    <div className="pl-4 pr-2 py-2 space-y-2">
                      {cat.products.map((product) => (
                        <Link
                          key={product.slug}
                          to={`/products/${product.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="
                            block px-4 py-2 text-sm rounded
                            text-gray-600 hover:text-black hover:bg-gray-100
                            transition
                          "
                        >
                          {product.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Contact */}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-sm font-medium rounded hover:bg-gray-100 transition"
              >
                Contact
              </Link>

              {/* Sign In */}
              <Link
                to="/sign-in"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-sm font-medium rounded hover:bg-gray-100 transition"
              >
                Sign In
              </Link>

              
            </div>
          </div>
        </>
      )}
    </>
  );
}