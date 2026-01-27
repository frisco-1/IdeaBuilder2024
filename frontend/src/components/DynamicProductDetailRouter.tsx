import { useParams } from "react-router-dom";
import ProductDetailPage from "../pages/product-detail-page/ProductDetailPage";
import ApparelDetailPage from "../pages/apparel-detail-page/ApparelDetailPage";

function DynamicProductDetailRouter() {
  const { categorySlug } = useParams();

  if (categorySlug === "custom-apparel") {
    return <ApparelDetailPage />;
  }

  return <ProductDetailPage />;
}

export default DynamicProductDetailRouter;