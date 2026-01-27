import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home.tsx";
import SignIn from "../pages/SignInPage/SignIn";
import ScrollToTop from "./ScrollToTop";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

import CategoryOverviewPage from "../pages/category-overview-page/CategoryOverviewPage.tsx";
import ProductListPage from "../pages/product-list-page/ProductListPage.tsx";
import NotFoundPage from "../pages/error-not-found-page/NotFoundPage.tsx";
import DynamicProductDetailRouter from "./DynamicProductDetailRouter.tsx";

export default function Routing() {
  return (
    <>
      <ScrollToTop />
      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

      

        {/* AUTH */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* CATEGORY OVERVIEW PAGE */}
        <Route
          path="/:categorySlug"
          element={<CategoryOverviewPage />}
        />

        {/* PRODUCT LIST PAGE */}
        <Route
          path="/:categorySlug/:productGroupSlug"
          element={<ProductListPage />}
        />

        {/* PRODUCT DETAIL PAGE */}
        <Route
          path="/:categorySlug/:productGroupSlug/:productSlug"
          element={<DynamicProductDetailRouter />}
        />



        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}