import Header from "./layouts/Header";
import Home from "./pages/Home/Home";
import Footer from "./layouts/Footer";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Product/Product";
import DetailProduct from "./pages/Product/DetailProduct";
import Checkout from "./pages/Checkout/Checkout";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import Blog from "./pages/Blog/Blog";
import Page403 from './pages/Admin/400/Page403';
import DetailBlog from "./pages/Blog/DetailBlog";


 function Client(){
    return(
        <div className="page-holder">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cua-hang" element={<Product />} />
            <Route path="/bai-viet" element={<Blog />} />
            <Route path="/dang-nhap" element={<Login />} />
            <Route path="/dang-ky" element={<Register />} />
            <Route path="/quen-mat-khau" element={<ForgetPassword />} />
            <Route path="/gio-hang" element={<Cart />} />
            <Route path="/chi-tiet-san-pham" element={<DetailProduct />} />
            <Route path="/tien-hanh-dat-hang" element={<Checkout />} />
            <Route path="/chi-tiet-bai-viet" element={<DetailBlog />} />
            <Route path="*" element={<Page403 />} />
            </Routes>
          <Footer />
        </div>
    );
 }
 export default Client;