import { NavLink } from "react-router-dom";
import FormSearch from "../components/FormSearch";
import URL_PATH from '@/config/UrlPath';
import {menuListLogin} from '@/config/Menu';
import UserInfo from "./component/UserInfo";
import MenuRight from "./component/MenuRight";
import MenuLeft from "./component/MenuLeft";

function Header() {
  // const param = useParams();
  // const [modalShow, setModalShow] = useState(false);
  // const [dataUsers, setDataUsers] = useState([]);
  const hasLogin = sessionStorage.getItem("hasLogin");
 
  const menuLogin = menuListLogin.map((menu) => {
    if (menu.show)
      return (
        <li className="nav-item" key={menu.name}>
          <NavLink
            className={`nav-link fs-6`}
            style={{fontFamily:"Arial"}}
            to={URL_PATH.concat(menu.link)}
          >
            <i className="fas fa-user me-1 text-gray fw-normal"></i>
            {menu.name}
          </NavLink>
        </li>
      );
  });

  return (
    <section id="header">
      <header 
      className="header bg-black">
        <div className="container px-lg-3">
          <nav className="navbar navbar-expand-lg text-white text-sm navbar-light py-0 w-100 px-lg-0">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <span className="me-3 text-white">
                    <i className="fas fa-mobile-alt"></i> +84012345678910
                  </span>
                </li>
                <li className="nav-item">
                  <span className="">
                    <i className="far fa-envelope"></i> laziStore5@lazi.com
                  </span>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    <i className="fab fa-pinterest-p"></i>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      
      <header className="header bg-white">
        <nav 
        className="navbar navbar-expand-lg navbar-light px-lg-0 mt-3" style={{height:"6.5vh"}}>
          <div className="container">
            <div className="row ps-3 w-100">
              <div className="col-lg-5 col-md-6 col-sm-12">
                <a className="m-auto" href={"/"}>
                  <span 
                  className="text-uppercase text-nowrap" style={{fontSize:"33.8px", lineHeight:"4.5vh" ,fontFamily:"Audiowide, sans-serif, bold"}}>Lazi Store</span>
                  <p className="m-0" style={{fontSize:"12px",fontFamily:"Roboto, sans-serif, bold"}}>Cửa hàng thiết bị công nghệ & phụ kiện</p>
                </a>  
              </div>
              <div className="col-lg-7 col-md-6 col-sm-12 my-auto">
                <FormSearch />
              </div>
            </div>
          </div>
        </nav>
        <hr/>
      </header>
      
      <header 
      className="header bg-white">
        <div className="container px-lg-3 d-flex justify-content-evenly">
          <nav 
          className="navbar navbar-expand-lg navbar-light pt-0 py-3 px-lg-0">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto">
                <MenuLeft/>
               
                {hasLogin && <MenuRight/>}
                {hasLogin ? (<li className="nav-item dropdown me-3"><UserInfo/></li>) : (menuLogin)}
              </ul>
            </div>
          </nav>
        </div>
      </header>
      {/*
      <ModalChangePass show={modalShow} onHide={() => setModalShow(false)} user={dataUsers}/>
     */}
    </section>
  );
}
export default Header;
