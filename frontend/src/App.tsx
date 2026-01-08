 import Routing from "./components/Routing";
 import Footer from "./components/Footer";
 import NavbarComp from "./components/nav-bar/NavbarComponent";
 import ErrorBoundary from "./components/ErrorBoundary";
 import "bootstrap/dist/css/bootstrap.min.css";
 import '../styles/reactBootstrap.css'
const App = () => {
  
  return (
    <>
    <ErrorBoundary>
      <NavbarComp/>
      <Routing/>
      <Footer/>
    </ErrorBoundary>
    </>
  );
};

export default App;
