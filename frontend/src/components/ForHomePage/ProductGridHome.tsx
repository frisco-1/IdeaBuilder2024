import { Link } from "react-router-dom";

interface CategoryItem {
  name: string;
  media: string; // image or video
  slug: string;
}

const categories: CategoryItem[] = [
  { name: "Custom Apparel", media: "https://res.cloudinary.com/dm1wuofh7/image/upload/q_auto/f_auto/v1775336951/FINAL-CUSTOM-APPAREL-STOCK-IMAGE_xiymff.png", slug: "custom-apparel" },
  { name: "DTF Products", media: "https://res.cloudinary.com/dm1wuofh7/image/upload/q_auto/f_auto/v1775343549/DTF-Product-Stock-Photo_smrtxr.png", slug: "dtf-products" },
  { name: "Stationery Items", media: "https://res.cloudinary.com/dm1wuofh7/image/upload/q_auto/f_auto/v1775344773/Business-Card-Promotional-Photo_hozpo2.png", slug: "stationery-items" },
  { name: "Signs & Banners", media: "https://res.cloudinary.com/dm1wuofh7/image/upload/q_auto/f_auto/v1772491123/Idea-Builder-Product-Selection-Image_xmrutm.png", slug: "signs-and-banners" },
  { name: "Promotional Products", media: "https://res.cloudinary.com/dm1wuofh7/image/upload/q_auto/f_auto/v1772492113/promotional-products-image_tevn3t.png", slug: "promotional-products" },
];

export default function ProductGridHome() {
  return (
    <section id="products" className="bg-[#F3F4F6] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">

        {/* Section Label */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#E9252E]">
          What We Offer
        </p>

        <h2 className="mb-12 max-w-lg text-3xl font-bold leading-tight text-gray-900 md:text-4xl text-balance">
          Explore Our Product Categories
        </h2>

        {/* Grid Layout */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
            justify-center
            place-items-center
          "
        >
          {categories.map((item) => {
            const isVideo =
              item.media.endsWith(".mp4") || item.media.endsWith(".mov");

            return (
              <Link
                key={item.name}
                to={`/${item.slug}`}
                className="w-full max-w-sm"
              >
                <div
                  className="
                    group
                    relative
                    w-full
                    aspect-square
                    overflow-hidden
                    rounded-2xl
                    bg-white
                    border
                    border-gray-200
                    shadow-sm
                    hover:shadow-lg
                    transition
                  "
                >
                  {/* Media */}
                  {isVideo ? (
                    <video
                      src={item.media}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={item.media}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/60 via-transparent to-transparent p-4">
                    <h3 className="text-lg font-bold text-white drop-shadow-md">
                      {item.name}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
