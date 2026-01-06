import { useParams, Outlet } from "react-router-dom";

export default function ProductOverview() {
  const { category } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold capitalize">
        {category?.replace(/_/g, " ")}
      </h1>

      {/* Child routes render here */}
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}