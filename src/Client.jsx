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
'use client'

 function Client(){
   const isAuthenticated = localStorage.getItem('hasLogin') === 'true';
  //  const slug = useParams()['slug'];
    return(
        <div className="page-holder">
          <Header />
          <div style={{minHeight:550}}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path={URL_PATH} element={<Home />} />
              <Route path={URL_PATH.concat("/lien-he.html")} element={<Contact />} />
              <Route path={URL_PATH.concat("/cua-hang.html")} element={<Product />} />
              <Route path={URL_PATH.concat("/tin-tuc.html")} element={<Blog />} />
              <Route path={URL_PATH.concat("/cua-hang/:slug.html")} element={<DetailProduct />} />
              <Route path={URL_PATH.concat("/tin-tuc/:slug")} element={<DetailBlog />} />
              <Route path={URL_PATH.concat("/tin-tuc/:danh-muc/:slug")} element={<DetailBlog />} />
              <Route path={URL_PATH.concat("/quen-mat-khau")} element={<ForgetPassword/>}/>
              <Route path="*" element={<Page403 />} />
              <Route path={URL_PATH.concat("/tien-hanh-dat-hang.html")} element={<AuthRoute element={Checkout} isAuthenticated={!isAuthenticated} redirectPath={URL_PATH} />}/>
              <Route path={URL_PATH.concat("/gio-hang.html")} element={<AuthRoute element={Cart} isAuthenticated={!isAuthenticated} redirectPath={URL_PATH} />}/>
              <Route path={URL_PATH.concat("/lich-su-dat-hang.html")} element={<AuthRoute element={OrderUser} isAuthenticated={!isAuthenticated} redirectPath={URL_PATH} />}/>
              <Route path={URL_PATH.concat("/thong-tin-khach-hang.html")} element={<AuthRoute element={DetailUser} isAuthenticated={!isAuthenticated} redirectPath={URL_PATH} />}/>
              <Route path={URL_PATH.concat("/dang-nhap.html")} element={<AuthRoute element={Login} isAuthenticated={!isAuthenticated} redirectPath={URL_PATH} />}/>
              <Route path={URL_PATH.concat("/dang-ky.html")} element={<AuthRoute element={Register} isAuthenticated={!isAuthenticated} redirectPath={URL_PATH} />}/>
            </Routes>
          </div>
          <Footer />
        </div>
    );
 }
 export default Client;