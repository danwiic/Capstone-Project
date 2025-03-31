
import Home from "./pages/Home"
import Login from "./pages/Login";
import NotFound from "./pages/NotFound"
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return(
    <>
       <Router>
        <Routes>
          <Route path="*" element={<NotFound/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          
        </Routes>
      </Router>
    </>
  )
}