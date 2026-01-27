import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";

interface CategoryItem {
  name: string;
  slug: string;
  image: string;
}

interface CategoryData {
  name: string;
  slug: string;
  header: string;
  description: string[];
  images: string[]; // may contain image or video URLs
  items: CategoryItem[];
}

export default function CategoryOverviewPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [category, setCategory] = useState<CategoryData | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();

        const found = Object.values(data).find(
          (cat: any) => cat.slug === categorySlug
        ) as CategoryData;

        setCategory(found);
      } catch (err) {
        console.error("Error loading category:", err);
      }
    };

    fetchCategory();
  }, [categorySlug]);

  if (!category) {
    return <div className="p-10 text-center">Loading category…</div>;
  }

  // Determine if hero media is a video
  const heroMedia = category.images[0] || "/placeholder-banner.jpg";
  const isVideo = /\.(mp4|webm|ogg)$/i.test(heroMedia);

  return (
    <div>
      <Breadcrumbs />

      {/* HERO SECTION */}
      <div className="relative w-full h-72 md:h-96 overflow-hidden">
        {isVideo ? (
          <video
            src={heroMedia}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={heroMedia}
            className="w-full h-full object-cover"
            alt={category.name}
          />
        )}

        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
          <p className="max-w-2xl text-center text-lg">{category.header}</p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-4 text-gray-700">
        {category.description.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {category.items.map((item) => (
          <Link
            key={item.slug}
            to={`/${category.slug}/${item.slug}`}
            className="border p-4 rounded hover:bg-[#E9252E] hover:text-white transition text-center"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}