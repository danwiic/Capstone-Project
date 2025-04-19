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
import Dashboard from "./pages/pos/Dashboard";
import SalesForecast from "./pages/pos/SalesForecast";
import PosTerminal from "./pages/pos/PosTerminal";
import Products from "./pages/pos/Products";
import Inventory from "./pages/pos/Inventory";
import Orders from "./pages/pos/Orders";
import History from "./pages/pos/History";
import Employee from "./pages/pos/Employee";
import User from "./pages/pos/User";
import Analytics from "./pages/pos/Analytics";

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
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="terminal" element={<PosTerminal />} />
              <Route path="forecast" element={<SalesForecast />} />
              <Route path="products" element={<Products />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="orders" element={<Orders />} />
              <Route path="history" element={<History />} />
              <Route path="employees" element={<Employee />} />
              <Route path="user" element={<User />} />
              <Route path="analytics" element={<Analytics />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}
