import {Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SearchPage from '../pages/SearchPage';
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


export default function Routing() {
  return (
    <>
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
        </Routes>
    </>
  )
}
