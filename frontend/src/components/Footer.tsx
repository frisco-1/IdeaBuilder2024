import { Link } from "react-router-dom";
import { AiTwotonePhone, AiFillFacebook } from "react-icons/ai";
import { IoMdMail } from "react-icons/io";
import { FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#E9252E] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* PRODUCT CATEGORIES */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-bold mb-6">Product Categories</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">

            {/* Custom Apparel */}
            <div>
              <h4 className="font-semibold mb-3">Custom Apparel</h4>
              <ul className="space-y-2 text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <Link to="/products/custom-apparel/t-shirts" className="hover:text-white">T-Shirts</Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <Link to="/products/custom-apparel/hoodies" className="hover:text-white">Hoodies</Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <Link to="/products/custom-apparel/polo-shirts" className="hover:text-white">Polo Shirts</Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <Link to="/products/custom-apparel/hats" className="hover:text-white">Hats</Link>
                </li>
              </ul>
            </div>

            {/* DTF Products */}
            <div>
              <h4 className="font-semibold mb-3">DTF Products</h4>
              <ul className="space-y-2 text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <Link to="/products/dtf-products/dtf-gang-sheets" className="hover:text-white">DTF Gang Sheets</Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <Link to="/products/dtf-products/uv-dtf-gang-sheet" className="hover:text-white">UV DTF Gang Sheet</Link>
                </li>
              </ul>
            </div>

            {/* Stationery Items */}
            <div>
              <h4 className="font-semibold mb-3">Stationery Items</h4>
              <ul className="space-y-2 text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <Link to="/products/stationery/business-cards" className="hover:text-white">Business Cards</Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <Link to="/products/stationery/flyers" className="hover:text-white">Flyers</Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <Link to="/products/stationery/invoices" className="hover:text-white">Invoices</Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <Link to="/products/stationery/menus" className="hover:text-white">Menus</Link>
                </li>
              </ul>
            </div>

            {/* Signs & Banners */}
            <div>
              <h4 className="font-semibold mb-3">Signs & Banners</h4>
              <ul className="space-y-2 text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <Link to="/products/signs-and-banners/banners" className="hover:text-white">Banners</Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <Link to="/products/signs-and-banners/coroplast-signs" className="hover:text-white">Coroplast Signs</Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <Link to="/products/signs-and-banners/a-frame" className="hover:text-white">A‑Frame</Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <Link to="/products/signs-and-banners/max-metal-laminated" className="hover:text-white">Max Metal Laminated</Link>
                </li>
              </ul>
            </div>

            {/* Promotional Items */}
            <div>
              <h4 className="font-semibold mb-3">Promotional Items</h4>
              <ul className="space-y-2 text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <Link to="/products/promotional/pens" className="hover:text-white">Pens</Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <Link to="/products/promotional/table-cover" className="hover:text-white">Table Cover</Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* ADDRESS + HOURS */}
        <div>
          <h3 className="text-xl font-bold mb-6">Visit Us</h3>
          <p className="text-white/90 leading-relaxed">
            3277 Lake Worth Rd. Suite B<br />
            Palm Springs, FL 33461
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4">Hours</h3>
          <p className="text-white/90 leading-relaxed">
            Monday – Friday<br />
            9:00 AM – 6:00 PM
          </p>
        </div>

        {/* CONTACT + SOCIAL */}
        <div>
          <h3 className="text-xl font-bold mb-6">Contact Us</h3>

          <ul className="space-y-3 text-lg text-white/90">
            <li>
              <a href="tel:+15617211473" className="hover:text-white flex items-center gap-2">
                <AiTwotonePhone /> (561) 721‑1473
              </a>
            </li>
            <li>
              <a href="mailto:sales@ideaprinting.com" className="hover:text-white flex items-center gap-2">
                <IoMdMail /> sales@ideaprinting.com
              </a>
            </li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4">Follow Us</h3>
          <div className="flex items-center gap-4 text-2xl">
            <a href="https://www.facebook.com/ideabprinting" target="_blank" rel="noreferrer" className="hover:text-white">
              <AiFillFacebook />
            </a>
            <a href="https://www.instagram.com/ibtshirts/" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="https://www.tiktok.com/@ibtshirts" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaTiktok />
            </a>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-white/80 mt-12 text-sm">
        <span className="font-semibold text-white">Idea Builder</span> — All Rights Reserved © {year}
      </div>
    </footer>
  );
}