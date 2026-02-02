import { useState, useEffect } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";

interface Props {
  title: string;
  description: string;
  images?: string[];
}

export default function Tooltip({ title, description, images = [] }: Props) {
  const [open, setOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {/* Trigger */}
      <span
        className="relative ml-2 inline-flex items-center"
        onMouseEnter={() => !isMobile && setOpen(true)}
        onMouseLeave={() => !isMobile && setOpen(false)}
        onClick={() => setOpen((prev) => !prev)}
      >
        <IoIosInformationCircleOutline className="text-[#E9252E] text-lg cursor-pointer" />

        {/* Tooltip Box */}
        <div
          className={`
            absolute z-20 w-72 px-3 py-3 rounded-lg shadow-xl
            bg-gray-900 text-white flex flex-col gap-2
            transition-opacity duration-200
            ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            ${isMobile ? "left-1/2 -translate-x-1/2 top-8" : "left-6 top-0"}
          `}
        >
          {/* Arrow */}
          <div
            className={`
              absolute
              ${isMobile ? "-top-1.5 left-1/2 -translate-x-1/2 rotate-180" : "-left-2 top-3"}
              w-0 h-0
              border-l-8 border-r-8 border-b-8
              border-l-transparent border-r-transparent border-b-gray-900
            `}
          />

          {/* Title */}
          <p className="font-semibold text-sm">{title}</p>

          {/* Description */}
          <p className="text-xs leading-snug text-gray-200">{description}</p>

          {/* Thumbnails */}
          {images.length > 0 && (
            <div className="flex gap-2 mt-1 flex-wrap">
              {images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomImage(src);
                  }}
                  className="
                    w-12 h-12 rounded-md object-cover border border-gray-700
                    cursor-pointer hover:scale-105 transition-transform
                  "
                />
              ))}
            </div>
          )}
        </div>
      </span>

      {/* Zoom Modal */}
      {zoomImage && (
        <div
          className="
            fixed inset-0 z-50 bg-black bg-opacity-80
            flex items-center justify-center p-4
            animate-fadeIn
          "
          onClick={() => setZoomImage(null)}
        >
          <img
            src={zoomImage}
            alt="Zoomed"
            className="
              rounded-lg shadow-2xl
              max-w-[95%] max-h-[85vh]
              sm:max-w-[80%] sm:max-h-[80vh]
            "
          />
        </div>
      )}
    </>
  );
}