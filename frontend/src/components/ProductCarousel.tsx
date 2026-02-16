import useEmblaCarousel from "embla-carousel-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";

interface ProductCarouselProps {
  images: string[];
}

export default function ProductCarousel({ images }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", () =>
      setSelectedIndex(emblaApi.selectedScrollSnap())
    );
  }, [emblaApi]);

  return (
    <div className="relative w-full space-y-4">
      {/* Main Carousel */}
      <div className="overflow-hidden rounded-lg shadow" ref={emblaRef}>
        <div className="flex">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Product image ${i + 1}`}
              className="w-full shrink-0 object-cover"
            />
          ))}
        </div>
      </div>

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
          >
            <FaChevronRight />
          </button>
        </>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex justify-center gap-3 mt-2">
          {images.map((src, i) => {
            const isActive = selectedIndex === i;

            return (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`
                  border rounded-md overflow-hidden transition-transform
                  ${isActive ? "border-[#E9252E] scale-105" : "border-gray-300 hover:scale-105"}
                `}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-16 h-16 object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}