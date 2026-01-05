import { useParams } from "react-router-dom";

export default function ProductOverview() {
  const { productSlug } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold capitalize">
        {productSlug?.replace(/-/g, " ")}
      </h1>

      {/* TODO: Load product data, show grid, etc. */}
      <p className="mt-4 text-gray-600">
        Product overview page for: {productSlug}
      </p>
    </div>
  );
}