 import Routing from "./components/Routing";
 import Footer from "./components/Footer";
 import NavbarComp from "./components/nav-bar/NavbarComponent";
 import ErrorBoundary from "./pages/error-boundary-page/ErrorBoundary";
 import "bootstrap/dist/css/bootstrap.min.css";
 import '../styles/reactBootstrap.css'
 import ScrollToTop from "./components/ScrollToTop";
 
const App = () => {
  
  return (
    <>
    <ErrorBoundary>
      <NavbarComp/>
      <ScrollToTop/>
      <Routing/>
      <Footer/>
    </ErrorBoundary>
    </>
  );
};

export default App;
