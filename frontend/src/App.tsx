import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProvider from "./context/userContext"; 
import CartProvider from './context/cartContext';

import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from './pages/Signup';
import Test from './pages/Test';
import ProductDetails from './pages/ProductDetails';

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}
