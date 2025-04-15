import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProvider from "./context/userContext";
import CartProvider from "./context/cartContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Test from "./pages/Test";
import ProductDetails from "./pages/ProductDetails";
import Brand from "./pages/Brand";
import PosLogin from "./pages/pos/PosLogin";
import PosMain from "./pages/pos/PosMain";

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
            <Route path="/brand/:id" element={<Brand />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />

            <Route path="/pos">
              <Route path="" element={<PosMain />} />
              <Route path="#" element={<PosLogin />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}
