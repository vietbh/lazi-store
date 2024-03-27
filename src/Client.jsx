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
import AuthRoute from "./Auth/AuthRoute";
import DetailUser from "./pages/User/DetailUser";
import OrderUser from "./pages/User/OrderUser";
import HTML_DOT from "./config/PageHtml";
import Category from "./pages/Product/Category";
'use client'
// <Route path={URL_PATH.concat("/cua-hang").concat(HTML_DOT)} element={<Product />} />

 function Client(){
  const isAuthenticated = !!sessionStorage.getItem('hasLogin');
  return(
        <div className="page-holder">
          <Header />
          <div style={{minHeight:'340vh'}}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path={URL_PATH} element={<Home />} /> 
              <Route path={URL_PATH.concat("/lien-he").concat(HTML_DOT)} element={<Contact />} />
              <Route path={URL_PATH.concat("/cua-hang/:slug").concat(HTML_DOT)} element={<DetailProduct />} />
              <Route path={URL_PATH.concat("/tim-kiem/:slug").concat(HTML_DOT)} element={<Product />} />
              <Route path={URL_PATH.concat("/danh-muc/:slug").concat(HTML_DOT)} element={<Category />} />
              <Route path={URL_PATH.concat("/gio-hang").concat(HTML_DOT)} element={<Cart />} />
              <Route path={URL_PATH.concat("/tien-hanh-dat-hang").concat(HTML_DOT)} element={<Checkout />} />
              <Route path={URL_PATH.concat("/lich-su-dat-hang/:userId")} element={<AuthRoute element={OrderUser} isAuthenticated={isAuthenticated} redirectPath={URL_PATH} />}/>
              <Route path={URL_PATH.concat("/thong-tin-khach-hang/:userId")} element={<AuthRoute element={DetailUser} isAuthenticated={isAuthenticated} redirectPath={URL_PATH} />}/>
              <Route path="*" element={<Page403 />} />
              <Route path={URL_PATH.concat("/tin-tuc").concat(HTML_DOT)} element={<Blog />} />
              <Route path={URL_PATH.concat("/tin-tuc/:slug").concat(HTML_DOT)} element={<DetailBlog />} />
              <Route path={URL_PATH.concat("/dang-nhap").concat(HTML_DOT)} element={<AuthRoute element={Login} isAuthenticated={!isAuthenticated} redirectPath={URL_PATH} />}/>
              <Route path={URL_PATH.concat("/dang-ky").concat(HTML_DOT)} element={<AuthRoute element={Register} isAuthenticated={!isAuthenticated} redirectPath={URL_PATH} />}/>
              <Route path={URL_PATH.concat("/quen-mat-khau").concat(HTML_DOT)} element={<AuthRoute element={ForgetPassword} isAuthenticated={!isAuthenticated} redirectPath={URL_PATH} />}/>
            </Routes>
          </div>
          <Footer />
        </div>
    );
 }
 export default Client;