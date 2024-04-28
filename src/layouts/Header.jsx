import { NavLink } from "react-router-dom";
import FormSearch from "../components/FormSearch";
import URL_PATH from '@/config/UrlPath';
import {menuListLogin} from '@/config/Menu';
import UserInfo from "./component/UserInfo";
import MenuRight from "./component/MenuRight";
import MenuLeft from "./component/MenuLeft";
// import React, { useState } from "react";
// import ModalChangePass from "../components/ModalChangePass";
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
      
      <header 
      className="header bg-white">
        <nav 
        className="navbar navbar-expand-lg navbar-light px-lg-0 mt-3" style={{height:"8vh"}}>
          <div className="container-fluid">
            <a className="navbar-brand" href={"/"}>
              <span className="text-uppercase" style={{fontSize:"50px", fontFamily:"Audiowide, sans-serif, bold"}}>
                Lazi Store
              </span>
            </a>  
          </div>
        </nav>
        <hr/>
      </header>
      
      <header 
      className="header bg-white">
        <div className="container px-lg-3 d-flex justify-content-around">
          <nav 
          className="navbar navbar-expand-lg navbar-light pt-0 py-3 px-lg-0">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto ">
                <MenuLeft/>
                <li className="nav-item dropdown">
                  <div>
                    <a
                      className="nav-link fs-6"
                      style={{fontFamily:"Arial"}}
                      id="pagesDropdownSearch"
                      href="#"
                      data-bs-toggle="dropdown"
                      aria-haspopup="false"
                      aria-expanded="true"
                    >
                      <i className="fas fa-search text-secondary me-1"></i>
                      {"Tìm kiếm"}
                    </a>
                    <div
                      className="dropdown-menu shadow-sm"
                      aria-labelledby="pagesDropdownSearch"
                    >
                      <div
                        className="dropdown-item border-0 px-2"
                        style={{ width: 380 }}
                      >
                        <FormSearch />
                      </div>
                    </div>
                  </div>
                </li>
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
