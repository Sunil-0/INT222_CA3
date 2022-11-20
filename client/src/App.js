import './App.css';
import Navbar from './components/header/Navbar';
import Newnav from './components/newnavbar/Newnav';
import Maincomponent from './components/home/Maincomponent';
//import Banner from './components/home/Banner';
import Footer from './components/footer/footer';
import {Routes, Route} from "react-router-dom";
import SignIn from './components/signup_signin/SignIn';
import SignUp from './components/signup_signin/SignUp';
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';


function App() {
  return (
    <>
      <Navbar />
      <Newnav />
      <Routes>
        <Route path="/" element={ <Maincomponent /> }/>
        <Route path="/login" element={ <SignIn /> } />
        <Route path="/register" element={ <SignUp /> } />
        <Route path="/getproductsone/:id" element={ <Cart /> } />
        <Route path="/buynow" element={ <Buynow /> } />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
