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
  images: string[];
  items: CategoryItem[];
}

export default function CategoryOverviewPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [category, setCategory] = useState<CategoryData | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/category`);
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


      {/* PRODUCT GRID — CustomInk Style */}
      <div className="py-10 max-w-6xl mx-auto px-4 pb-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {category.items.map((item) => (
          <Link
            key={item.slug}
            to={`/${category.slug}/${item.slug}`}
            className="group block rounded-lg overflow-hidden border bg-white shadow-sm hover:shadow-lg transition-shadow"
          >
            {/* Image */}
            <div className="w-full aspect-square bg-gray-100 overflow-hidden">
              <img
                src={item.image || "/placeholder-product.jpg"}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Name */}
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#E9252E] transition-colors">
                {item.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}