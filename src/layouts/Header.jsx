import { Link, useNavigate, useParams } from "react-router-dom";
import FormSearch from "../components/FormSearch";
import URL_PATH from "@/config/UrlPath";
import { menuLefts, menuListLogin, loginSettings } from "@/config/Menu";
import UserInFo from "./component/UserInFo";
import MenuRight from "./component/MenuRight";
import API_URL from "../config/Api";
import axios from "axios";

function Header() {
  const param = useParams();
  const navigate = useNavigate();
  const hasLogin = sessionStorage.getItem("hasLogin");

  const handleLogout = async () => {
    console.log("logout");
    try {
      const response = await axios.post(`${API_URL}/logout`, {}, {
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.status === 200) {
        alert('Đăng xuất thành công');
        sessionStorage.removeItem('hasLogin');
        sessionStorage.removeItem('userInfo');
        localStorage.removeItem('userInfo');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderMenu = () => {
    if (hasLogin) {
      return (
        <>
          <MenuRight />
          <li className="nav-item dropdown me-3">
            <UserInFo />
            <div className="dropdown-menu mt-3 shadow-sm w-25" aria-labelledby="pagesDropdown">
              {loginSettings.map((setting) => (
                <Link
                  key={setting.id}
                  className="dropdown-item border-0 transition-link"
                  to={URL_PATH.concat(setting.link)}
                  onClick={setting.logout ? handleLogout : undefined}
                >
                  {setting.name}
                </Link>
              ))}
            </div>
          </li>
        </>
      );
    } else {
      return menuListLogin.map((menu) => (
        <li className="nav-item" key={menu.name}>
          <Link
            className={`nav-link ${param['*'] === URL_PATH.concat(menu.link) ? "active" : ''}`}
            to={URL_PATH.concat(menu.link)}
          >
            <i className="fas fa-user me-1 text-gray fw-normal"></i>
            {menu.name}
          </Link>
        </li>
      ));
    }
  };

  return (
    <section id="header">
      {/* Header content */}
      <header className="header">
        <div className="container px-lg-3">
          <nav className="navbar navbar-expand-lg navbar-light py-3 px-lg-0">
            {/* Navbar content */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto">
                {/* Left menu items */}
                {menuLefts.map((menu) => (
                  <li className="nav-item" key={menu.name}>
                    {menu.href ? (
                      <a className="nav-link" href={menu.link}>
                        {menu.name}
                      </a>
                    ) : (
                      <Link
                        className={`nav-link ${param['*'] === URL_PATH.concat(menu.link) ? "active" : ""
                          }`}
                        to={URL_PATH.concat(menu.link)}
                      >
                        {menu.name}
                      </Link>
                    )}
                  </li>
                ))}
                {/* Search form */}
                <li className="nav-item dropdown">
                  <div>
                    <a
                      className="nav-link"
                      id="pagesDropdownSearch"
                      href="#"
                      data-bs-toggle="dropdown"
                      aria-haspopup="false"
                      aria-expanded="true"
                    >
                      <i className="fas fa-search"></i> Tìm kiếm
                    </a>
                    <div className="dropdown-menu mt-3 shadow-sm" aria-labelledby="pagesDropdownSearch">
                      <div className="dropdown-item border-0 px-2" style={{ width: 280 }}>
                        <FormSearch />
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              {/* Right menu items */}
              <ul className="navbar-nav ms-auto">
                {/* Conditional rendering of menu */}
                {renderMenu()}
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </section>
  );
}

export default Header;
