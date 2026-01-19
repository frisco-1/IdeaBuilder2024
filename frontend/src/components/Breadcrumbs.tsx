// components/Breadcrumbs.tsx
import { Link, useLocation } from "react-router-dom";
import { formatSlug } from "./FormatSlug";
//for formatting slugs into readable text

export default function Breadcrumbs() {
  const location = useLocation();

  // Split URL into segments
  const segments = location.pathname.split("/").filter(Boolean);

  // Segments to hide from display
  const hidden = new Set(["products", "category"]);

  // Build breadcrumb objects (keep URL intact, hide label only)
  const crumbs = segments.map((seg, index) => ({
    segment: seg,
    label: hidden.has(seg) ? null : formatSlug(seg),
    url: "/" + segments.slice(0, index + 1).join("/")
  }));

  return (
    <div className="m-6">
      <nav className="text-sm text-gray-600 mb-6">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>
          </li>

          {crumbs.map((crumb, index) => {
            if (!crumb.label) return null; // hide "products" and "category"

            return (
              <li key={index} className="flex items-center">
                <span className="mx-1">/</span>

                {index === crumbs.length - 1 ? (
                  <span className="font-semibold">{crumb.label}</span>
                ) : (
                  <Link to={crumb.url} className="text-blue-600 hover:underline">
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}