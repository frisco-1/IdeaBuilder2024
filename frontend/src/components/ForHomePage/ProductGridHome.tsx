interface CategoryItem {
  name: string;
  media: string; // can be image or video
}

const categories: CategoryItem[] = [
  { name: "Custom Apparel", media: "/media/custom-apparel.jpg" },
  { name: "DTF Products", media: "/media/dtf-products.mp4" },
  { name: "Stationary Items", media: "/media/stationary.jpg" },
  { name: "Signs & Banners", media: "/media/signs-banners.mp4" },
  { name: "Promotional Items", media: "/media/promotional.jpg" },
];

export default function ProductGridHome() {
  return (
    <section id="products" className="bg-[#F3F4F6] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">

        {/* Section Label */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#E9252E]">
          What We Offer
        </p>

        <h2 className="mb-12 max-w-lg font-serif text-3xl font-bold leading-tight text-gray-900 md:text-4xl text-balance">
          Explore Our Product Categories
        </h2>

        {/* Grid Layout */}
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-6 
          place-items-center
        ">
          {categories.map((item) => {
            const isVideo = item.media.endsWith(".mp4") || item.media.endsWith(".mov");

            return (
              <div
                key={item.name}
                className="
                  group 
                  relative 
                  w-full 
                  max-w-sm 
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
                  <h3 className="font-serif text-lg font-bold text-white drop-shadow-md">
                    {item.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}