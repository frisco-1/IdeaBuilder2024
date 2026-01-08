import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home.tsx';
import SearchPage from '../search-page(will-delete-soon-or-refactor)/SearchPage.tsx';
import SignIn from '../pages/SignInPage/SignIn';
import ScrollToTop from './ScrollToTop';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import ProductOverview from '../pages/product-overview/ProductOverview';
import ProductListPage from '../pages/product-list-page/ProductListPage.tsx';
import ProductDetailPage from '../pages/product-detail-page/ProductDetailPage.tsx';
import NotFoundPage from './NotFoundPage.tsx';


export default function Routing() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/products/:category" element={<ProductOverview />}>
    
          {/* Default child: list page */}
          <Route index element={<ProductListPage />} />

          {/* Detail page */}
          <Route path=":slug" element={<ProductDetailPage />} />

        </Route>



        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </>
  );
}
