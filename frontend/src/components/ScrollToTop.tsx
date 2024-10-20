//Scroll to Top component uses the useLocation hook to monitor changes int eh current route under {pathname}
//Whenevr the route changes, the useEffect hook runs and calls window.scrollTo(0, 0) to scroll to the top of the page

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
