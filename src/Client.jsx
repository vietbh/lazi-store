
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Product/Product";
import DetailProduct from "./pages/Product/DetailProduct";
import Checkout from "./pages/Checkout/Checkout";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import Page403 from './pages/Admin/400/Page403';
import Contact from "./pages/FAQ/Contact";
import URL_PATH from "./config/UrlPath";
import AuthRoute from "./Auth/AuthRoute";
import DetailUser from "./pages/User/DetailUser";
import OrderUser from "./pages/User/OrderUser";
import HTML_DOT from "./config/PageHtml";
import Category from "./pages/Product/Category";

 function Client(){
  const isAuthenticated = !!sessionStorage.getItem('hasLogin');
  return(
      <div className="container" style={{minHeight:'90vh'}}>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={URL_PATH.concat("/trang-chu")} element={<Home />} /> 
          <Route path={URL_PATH.concat("/danh-muc")} element={<Home />} /> 
          <Route path={URL_PATH.concat("/lien-he").concat(HTML_DOT)} element={<Contact />} />
          <Route path={URL_PATH.concat("/chi-tiet-san-pham/:slug").concat(HTML_DOT)} element={<DetailProduct />} />
          <Route path={URL_PATH.concat("/tim-kiem/").concat(":slug")} element={<Product />} />
          <Route path={URL_PATH.concat("/danh-muc/:slug").concat(HTML_DOT)} element={<Category />} />
          <Route path={URL_PATH.concat("/gio-hang").concat(HTML_DOT)} element={<Cart />} />
          <Route path={URL_PATH.concat("/lien-he").concat(HTML_DOT)} element={<Contact />} />
          <Route path={URL_PATH.concat("/tien-hanh-dat-hang").concat(HTML_DOT)} element={<Checkout />} />
          <Route path={URL_PATH.concat("/lich-su-dat-hang").concat(HTML_DOT)} element={<AuthRoute element={OrderUser} isAuthenticated={isAuthenticated} redirectPath={URL_PATH} />}/>
          <Route path={URL_PATH.concat("/thong-tin-khach-hang").concat(HTML_DOT)} element={<AuthRoute element={DetailUser} isAuthenticated={isAuthenticated} redirectPath={URL_PATH} />}/>
          <Route path="*" element={<Page403 />} />
          <Route path={URL_PATH.concat("/dang-nhap").concat(HTML_DOT)} element={<AuthRoute element={Login} isAuthenticated={!isAuthenticated} redirectPath={URL_PATH} />}/>
          <Route path={URL_PATH.concat("/dang-ky").concat(HTML_DOT)} element={<AuthRoute element={Register} isAuthenticated={!isAuthenticated} redirectPath={URL_PATH} />}/>
          <Route path={URL_PATH.concat("/quen-mat-khau").concat(HTML_DOT)} element={<AuthRoute element={ForgetPassword} isAuthenticated={!isAuthenticated} redirectPath={URL_PATH} />}/>
        </Routes>
      </div>
    );
 }
 export default Client;