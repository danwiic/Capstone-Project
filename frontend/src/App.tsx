import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProvider from "./context/userContext";
import { CartProvider } from "./context/cartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Test from "./pages/Test";
import ProductDetails from "./pages/ProductDetails";
import Brand from "./pages/Brand";
import Dashboard from "./pages/pos/Dashboard";
import PosTerminal from "./pages/pos/PosTerminal";
import Products from "./pages/pos/Products";
import Orders from "./pages/pos/Orders";
import History from "./pages/pos/History";
import Employee from "./pages/pos/Employee";
import Sales from "./pages/pos/Sales";
import User from "./pages/pos/User";
import ScrollToTop from "./utils/scrollToTop";
import Settings from "./pages/pos/Settings";
import CartComponent from "./components/Cart/Cart";
import Wishlist from "./pages/Wishlist";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import TrackOrder from "./pages/TrackOrder";
import Address from "./pages/Address";
import SignIn from "./pages/SignIn";

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <ScrollToTop />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/test" element={<Test />} />
              <Route path="/cart" element={<CartComponent />} />
              <Route
                path="/wishlist"
                element={
                  <ProtectedRoute
                    element={<Wishlist />}
                    allowedRoles={["admin", "user"]}
                    redirectPath="/login"
                  />
                }
              />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/products" element={<Brand />} />
              <Route path="/orders" element={<MyOrders />} />
              <Route path="/track" element={<TrackOrder />} />
              <Route path="/address" element={<Address />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/pos">
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="terminal" element={<PosTerminal />} />
                <Route path="sales" element={<Sales />} />
                <Route path="products" element={<Products />} />
                <Route path="orders" element={<Orders />} />
                <Route path="history" element={<History />} />
                <Route path="employees" element={<Employee />} />
                <Route path="user" element={<User />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </UserProvider>
  );
}
