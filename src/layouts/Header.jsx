import { Link, useParams } from "react-router-dom";
import FormSearch from "../components/FormSearch";
import URL_PATH from '@/config/UrlPath';
import {menuLefts,menuListLogin,loginSettings} from '@/config/Menu';
import UserInFo from "./component/UserInFo";
import MenuRight from "./component/MenuRight";

function Header() {
  const param = useParams();

  const hasLogin = sessionStorage.getItem("hasLogin");
  const title = function(value){
    document.title = value;
  } 
  
  const handleLogout = () => {
    alert('Đăng xuất thành công');
    sessionStorage.removeItem('hasLogin');
    sessionStorage.removeItem('userInfo');
    localStorage.removeItem('userInfo');
    // history.go(0);
    location.href='/';
  };
 

  const menuLogin = menuListLogin.map((menu) => { 
    if(param['*'] === URL_PATH.concat(menu.link)) title(menu.name);
    if(menu.show)
    return(
      <li className="nav-item" key={menu.name}>
        <Link
          className={`nav-link ${param['*'] === URL_PATH.concat(menu.link) ? "active" : ''}`}
          to={URL_PATH.concat(menu.link)}
        >
        <i className="fas fa-user me-1 text-gray fw-normal"></i>
          {menu.name}
        </Link>
      </li>
    );
  });
  const setting = loginSettings.map((setting) => {
    return(
      <Link key={setting.id} className="dropdown-item border-0 transition-link" to={URL_PATH.concat(setting.link)} onClick={setting.logout ? handleLogout : ''}>
        {setting.name}
      </Link>
    );
  });
  const menuLeft = menuLefts.map((menu) => {
    if(param['*'] === URL_PATH.concat(menu.link)){
      title(menu.name);
    }
    return(
      <li className="nav-item" key={menu.name}>
      {menu.href ? <a className={`nav-link`} href={menu.link} >{menu.name}</a>
       :<Link className={`nav-link 
          ${param['*'] === URL_PATH.concat(menu.link) ? "active" : ''}`} to={URL_PATH.concat(menu.link)}>
          {menu.name}
        </Link>
      }
      </li>
    );
  });
  
  return (
    <section id="header">
      <header className="header bg-black">
        <div className="container px-lg-3">
          <nav className="navbar navbar-expand-lg text-white text-sm navbar-light py-0 w-100 px-lg-0">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <span className="me-3 text-white"><i className="fas fa-mobile-alt"></i> +84012345678910</span>
                </li>
                <li className="nav-item">
                  <span className=""><i className="far fa-envelope"></i> laziStore5@lazi.com</span>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"><a className='nav-link text-white' href="#"><i className="fab fa-twitter"></i></a></li>
                <li className="nav-item"><a className='nav-link text-white' href="#"><i className="fab fa-instagram"></i></a></li>
                <li className="nav-item"><a className='nav-link text-white' href="#"><i className="fab fa-pinterest-p"></i></a></li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <header className="header bg-white">
        <div className="container px-lg-3">
          <nav className="navbar navbar-expand-lg navbar-light py-3 px-lg-0">
            <a className="navbar-brand" href={'/'}>
              <span className="fw-bold text-uppercase text-dark">
                LaziStore
              </span>
            </a>
            <button
              className="navbar-toggler navbar-toggler-end"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent" >
              <ul className="navbar-nav me-auto">
                {menuLeft}
                <li className="nav-item dropdown">
                  <div>
                    <a
                    className="nav-link "
                    id="pagesDropdownSearch"
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-haspopup="false"
                    aria-expanded="true"
                  >
                  <i className="fas fa-search"></i>
                    {' Tìm kiếm'}
                  </a>
                    <div className="dropdown-menu mt-3 shadow-sm" aria-labelledby="pagesDropdownSearch">
                      <div className="dropdown-item border-0 px-2" style={{width:280}}>
                        <FormSearch />
                      </div>
                    </div>
                  </div>
                </li>
                {/*
                 */}
              </ul>
              <ul className="navbar-nav ms-auto">
                {hasLogin && <MenuRight param={param} title={title}/>}
                {hasLogin ? (
                  <li className="nav-item dropdown me-3">
                    <UserInFo/>
                    <div className="dropdown-menu mt-3 shadow-sm w-25" aria-labelledby="pagesDropdown">
                      {setting}
                    </div>
                  </li>
                ):(menuLogin)}
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </section>
  );
}
export default Header;
