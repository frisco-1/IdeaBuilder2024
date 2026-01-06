import { Routes, Route } from 'react-router-dom';
import Home from '../product-pages/Home';
import SearchPage from '../product-pages/SearchPage';
import SignIn from '../pages/SignInPage/SignIn';
import ScrollToTop from './ScrollToTop';
import BusinessCard from '../product-pages/BusinessCard';
import Flyers from '../product-pages/Flyers';
import DoorHangers from '../product-pages/DoorHangers';
import Envelopes from '../product-pages/Envelopes';
import LetterHeads from '../product-pages/LetterHeads';
import Invoices from '../product-pages/Invoices';
import PocketFolders from '../product-pages/PocketFolders';
import Recordatorios from '../product-pages/Recordatorios';
import Tickets from '../product-pages/Tickets';
import Banners from '../product-pages/Banners';
import Booklets from '../product-pages/Booklets';
import Invitations from '../product-pages/Invitations';
import VinylStickers from '../product-pages/VinylStickers';
import PrinitedVinylLaminated from '../product-pages/PrintedVinylLaminated';
import RealtorSigns from '../product-pages/RealtorSigns';
import CoroplastSigns from '../product-pages/CoroplastSigns';
import AFrame from '../product-pages/AFrame';
import ArrowSigns from '../product-pages/ArrowSigns';
import SingleArmSignPost from '../product-pages/SingleArmSignPost';
import RollUpBanners from '../product-pages/RollUpBanners';
import CustomFlags from '../product-pages/CustomFlags';
import TableCovers from '../product-pages/TableCovers';
import MagneticSigns from '../product-pages/MagneticSigns';
import MaxMetalLaminated from '../product-pages/MaxMetalLaminated';
import FoamSignsLaminated from '../product-pages/FoamSignsLaminated';
import CoroplastSignsLaminated from '../product-pages/CoroplastSignsLaminated';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import ProductOverview from '../pages/product-overview/ProductOverview';
import ProductListPage from '../pages/product-list-page/ProductListPage.tsx';
import ProductDetailPage from '../pages/product-detail-page/ProductDetailPage.tsx';



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
        <Route path="/business-cards" element={<BusinessCard />} />
        <Route path="/flyers" element={<Flyers />} />
        <Route path="/door-hangers" element={<DoorHangers />} />
        <Route path="/envelopes" element={<Envelopes />} />
        <Route path="/letter-heads" element={<LetterHeads />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/pocket-folders" element={<PocketFolders />} />
        <Route path="/recordatorios" element={<Recordatorios />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/banners" element={<Banners />} />
        <Route path="/booklets" element={<Booklets />} />
        <Route path="/invitations" element={<Invitations />} />
        <Route path="/vinyl-stickers" element={<VinylStickers />} />
        <Route
          path="/printed-vinyl-laminated"
          element={<PrinitedVinylLaminated />}
        />
        <Route path="/realtor-signs" element={<RealtorSigns />} />
        <Route path="/coroplast-signs" element={<CoroplastSigns />} />
        <Route path="/a-frame" element={<AFrame />} />
        <Route path="/arrow-signs" element={<ArrowSigns />} />
        <Route path="/single-arm-sign-post" element={<SingleArmSignPost />} />
        <Route path="/roll-up-banners" element={<RollUpBanners />} />
        <Route path="/custom-flags" element={<CustomFlags />} />
        <Route path="/table-covers" element={<TableCovers />} />
        <Route path="/magnetic-signs" element={<MagneticSigns />} />
        <Route path="/max-metal-laminated" element={<MaxMetalLaminated />} />
        <Route path="/foam-signs-laminated" element={<FoamSignsLaminated />} />
        <Route
          path="/coroplast-signs-laminated"
          element={<CoroplastSignsLaminated />}
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}
