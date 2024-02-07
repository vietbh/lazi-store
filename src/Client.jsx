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
import Contact from "./pages/FAQ/Contact";
import URL_PATH from "./config/UrlPath";
'use client'

 function Client(){
  
    return(
        <div className="page-holder">
          <Header />
          <div style={{minHeight:550}}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path={URL_PATH} element={<Home />} />
              <Route path={URL_PATH.concat("/lien-he")} element={<Contact />} />
              <Route path={URL_PATH.concat("/cua-hang")} element={<Product />} />
              <Route path={URL_PATH.concat("/bai-viet")} element={<Blog />} />
              <Route path={URL_PATH.concat("/dang-nhap")} element={<Login />} />
              <Route path={URL_PATH.concat("/dang-ky")} element={<Register />} />
              <Route path={URL_PATH.concat("/quen-mat-khau")} element={<ForgetPassword />} />
              <Route path={URL_PATH.concat("/gio-hang")} element={<Cart />} />
              <Route path={URL_PATH.concat("/cua-hang/:slugSanPham")} element={<DetailProduct />} />
              <Route path={URL_PATH.concat("/tien-hanh-dat-hang")} element={<Checkout />} />
              <Route path={URL_PATH.concat("/chi-tiet-bai-viet")} element={<DetailBlog />} />
              <Route path="*" element={<Page403 />} />
            </Routes>
          </div>
          <Footer />
        </div>
    );
 }
 export default Client;