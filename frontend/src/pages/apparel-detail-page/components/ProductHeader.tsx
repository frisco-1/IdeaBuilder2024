import type { ApparelProduct } from "../types/apparel.types";

export default function ProductHeader({ product }: { product: ApparelProduct }) {
  return (
    <div className="space-y-1">
      
      {/* BRAND + LOGO */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex flex-col leading-tight">
          <span className="font-medium">{product.brand}</span>
          <span className="text-xs text-gray-500">{product.code}</span>
        </div>

        {product.brand_logo && (
          <img
            src={product.brand_logo}
            alt="brand logo"
            className="w-8 h-8 object-contain"
          />
        )}
      </div>

      {/* PRODUCT NAME */}
      <h4 className="text-base font-bold">{product.name}</h4>
    </div>
  );
}