import {Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SearchPage from '../pages/SearchPage';
import ScrollToTop from './ScrollToTop';
import BusinessCard from '../pages/BusinessCard';
import Flyers from '../pages/Flyers';
import DoorHangers from '../pages/DoorHangers';
import Envelopes from '../pages/Envelopes';
import LetterHeads from '../pages/LetterHeads';
import Invoices from '../pages/Invoices';
import PocketFolders from '../pages/PocketFolders';
import Recordatorios from '../pages/Recordatorios';
import Tickets from '../pages/Tickets';
import Banners from '../pages/Banners';
import Booklets from '../pages/Booklets';
import Invitations from '../pages/Invitations';
import VinylStickers from '../pages/VinylStickers';
import PrinitedVinylLaminated from '../pages/PrintedVinylLaminated';
import RealtorSigns from '../pages/RealtorSigns';
import CoroplastSigns from '../pages/CoroplastSigns';
import AFrame from '../pages/AFrame';
import ArrowSigns from '../pages/ArrowSigns';
import SingleArmSignPost from '../pages/SingleArmSignPost';
import RollUpBanners from '../pages/RollUpBanners';
import CustomFlags from '../pages/CustomFlags';
import TableCovers from '../pages/TableCovers';
import MagneticSigns from '../pages/MagneticSigns';
import MaxMetalLaminated from '../pages/MaxMetalLaminated';


export default function Routing() {
  return (
    <>
        <ScrollToTop/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/search' element={<SearchPage/>} />
          <Route path='/business-cards' element={<BusinessCard/>}/>
          <Route path='/flyers' element={<Flyers/>}/>
          <Route path='/door-hangers' element={<DoorHangers/>}/>
          <Route path='/envelopes' element={<Envelopes/>}/>
          <Route path='/letter-heads' element={<LetterHeads/>}/>
          <Route path='/invoices' element={<Invoices/>}/>
          <Route path='/pocket-folders' element={<PocketFolders/>}/>
          <Route path='/recordatorios' element={<Recordatorios/>}/>
          <Route path='/tickets' element ={<Tickets/>} />
          <Route path='/banners' element={<Banners/>}/>
          <Route path='/booklets' element={<Booklets/>}/>
          <Route path='/invitations' element={<Invitations/>}/>
          <Route path='/vinyl-stickers' element={<VinylStickers/>}/>
          <Route path='/printed-vinyl-laminated' element={<PrinitedVinylLaminated/>}/>
          <Route path='/realtor-signs' element={<RealtorSigns/>}/>
          <Route path='/coroplast-signs' element={<CoroplastSigns/>}/>
          <Route path='/a-frame' element={<AFrame/>}/>
          <Route path='/arrow-signs' element={<ArrowSigns/>}/>
          <Route path='/single-arm-sign-post' element={<SingleArmSignPost/>}/>
          <Route path='/roll-up-banners' element={<RollUpBanners/>}/>
          <Route path='/custom-flags' element={<CustomFlags/>}/>
          <Route path='/table-covers' element={<TableCovers/>}/>
          <Route path='/magnetic-signs' element={<MagneticSigns/>}/>
          <Route path='/max-metal-laminated' element={<MaxMetalLaminated/>}/>
        </Routes>
    </>
  )
}
