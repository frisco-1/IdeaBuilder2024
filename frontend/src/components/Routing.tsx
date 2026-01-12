import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home.tsx";
import SearchPage from "../search-page(will-delete-soon-or-refactor)/SearchPage.tsx";
import SignIn from "../pages/SignInPage/SignIn";
import ScrollToTop from "./ScrollToTop";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

import CategoryOverviewPage from "../pages/category-overview-page/CategoryOverviewPage.tsx";
import ProductListPage from "../pages/product-list-page/ProductListPage.tsx";
import ProductDetailPage from "../pages/product-detail-page/ProductDetailPage.tsx";

import NotFoundPage from "../pages/error-not-found-page/NotFoundPage.tsx";

export default function Routing() {
  return (
    <>
      <ScrollToTop />
      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* SEARCH */}
        <Route path="/search" element={<SearchPage />} />

        {/* AUTH */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* CATEGORY OVERVIEW PAGE */}
        <Route
          path="/products/category/:categorySlug"
          element={<CategoryOverviewPage />}
        />

        {/* PRODUCT LIST PAGE */}
        <Route
          path="/products/category/:categorySlug/:productGroupSlug"
          element={<ProductListPage />}
        />

        {/* PRODUCT DETAIL PAGE */}
        <Route
        path="/products/category/:categorySlug/:productGroupSlug/:productSlug"
        element={<ProductDetailPage />}
      />


        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}