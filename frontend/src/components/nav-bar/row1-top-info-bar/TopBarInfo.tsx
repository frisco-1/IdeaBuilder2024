
import { FaPhoneAlt } from 'react-icons/fa';

function TopBarInfo() {
  return (
     <div className="flex w-full items-center justify-between bg-gray-100 px-6 py-2 text-sm text-gray-700 whitespace-nowrap">
      <span>Design Custom T-shirts & More</span>

       <div className='flex items-center gap-6'>
        <a href="tel:+15617211473" className="flex items-center gap-2">
          <FaPhoneAlt className="text-xs" />
          (561) 721-1473
        </a>

        
       </div>
      

    </div>
  )
}

export default TopBarInfo