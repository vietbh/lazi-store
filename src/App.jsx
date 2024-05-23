import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Client from "./Client";
import Admin from "./Admin";
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import Cart2 from './pages/Cart/Cart2';
import Checkout from './pages/Checkout/Checkout2';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Client />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cart" element={<Cart2/>} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/user-profile" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
