import { FaMapMarkerAlt, FaClock, FaHeart } from "react-icons/fa";

const STORE_OPEN_YEAR = 2003;

function getYearsInBusiness() {
  const currentYear = new Date().getFullYear();
  return currentYear - STORE_OPEN_YEAR;
}


export default function StorySection() {

const yearsInBusiness = getYearsInBusiness();

  return (
    <section id="story" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">

        {/* Section label */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
          Our Story
        </p>

        <h2 className="mb-6 max-w-xl text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl text-balance">
          Proudly serving our community for {yearsInBusiness} years
        </h2>

        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Image */}
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="/img/storefront.png"
              alt="Our local storefront in Lake Worth, FL"
              width={640}
              height={480}
              className="h-auto w-full object-cover"
            />
            <div className="relative bottom-0 left-0 right-0 bg-linear-to-t from-foreground/60 to-transparent p-6">
              <p className="text-lg font-semibold text-primary-foreground">
                Since 2003
              </p>
            </div>
          </div>

          {/* Copy */}
          <div className="flex flex-col gap-6">
        
            <p className="text-lg leading-relaxed text-muted-foreground">
                For over <strong className="text-foreground">{yearsInBusiness}  years</strong>, we’ve been supporting local businesses, freelancers, 
                and creators right here in <strong className="text-foreground">Lake Worth, FL</strong>. What began as a small family 
                dream has grown into a trusted community print shop—built on hard work, 
                craftsmanship, and genuine relationships. Whether you’re launching a 
                business, promoting an event, or bringing a personal idea to life, we 
                treat every project with the same care and attention, no matter the size.
            </p>

            {/* Feature badges */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 h-14"
                    style={{ backgroundColor: "#F3F4F6" }}>
                    <FaClock className="h-5 w-5" style={{ color: "#E9252E" }} />
                    <span className="text-sm font-medium text-secondary-foreground">{yearsInBusiness}+  Years</span>
                </div>

                <div className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 h-14"
                    style={{ backgroundColor: "#F3F4F6" }}>
                    <FaMapMarkerAlt className="h-5 w-5" style={{ color: "#E9252E" }} />
                    <span className="text-sm font-medium text-secondary-foreground">Lake Worth, FL</span>
                </div>

                <div className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 h-14"
                    style={{ backgroundColor: "#F3F4F6" }}>
                    <FaHeart className="h-5 w-5" style={{ color: "#E9252E" }} />
                    <span className="text-sm font-medium text-secondary-foreground">Family Owned</span>
                </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}