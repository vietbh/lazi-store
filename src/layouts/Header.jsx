import { Link, useParams } from "react-router-dom";
import FormSearch from "../components/FormSearch";

function Header() {
  const currentPath = window.location.pathname;
  const Param = useParams();
  if (localStorage.length > 0) {
    var hasLogin = localStorage.getItem("hasLogin");
    var userName = localStorage.getItem("userName");
  }
  const handleLogout = () => {
    alert('Đăng xuất thành công');
    localStorage.removeItem('hasLogin');
    localStorage.removeItem('userName');
  };
  // console.log(currentPath);
  // console.log(Param);
  return (
    <>
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
                  <span className=""><i className="far fa-envelope"></i> appleStore5@gmail.com</span>
                </li>
               
                {/*
                 */}
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
            <a className="navbar-brand" href="/lazi-store">
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      Param === "/" || Param === "" ? "active" : " "
                    }`}
                    to="/lazi-store"
                  >
                    Trang chủ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      Param === "/cua-hang" || currentPath === "/cua-hang"
                        ? "active"
                        : " "
                    }`}
                    to="/cua-hang"
                  >
                    Cửa hàng
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      Param === "/bai-viet" || currentPath === "/bai-viet"
                        ? "active"
                        : " "
                    }`}
                    to="/bai-viet"
                  >
                    Blog
                  </Link>
                </li>
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
                    <div
                      className="dropdown-menu mt-3 shadow-sm"
                      aria-labelledby="pagesDropdownSearch"
                    >
                      <div
                        className="dropdown-item border-0"
                        style={{width:450}}
                      >
                      {/**
                      */}
                        <FormSearch />
                      </div>
                    </div>
                  </div>
                </li>
                {/*
                 */}
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      Param === "/gio-hang" ? "active" : " "
                    }`}
                    to="/gio-hang"
                  >
                    {" "}
                    <i className="fas fa-dolly-flatbed me-1 text-gray"></i>Giỏ
                    hàng<small className="text-gray fw-normal">(2)</small>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="#!">
                    {" "}
                    <i className="far fa-heart me-1"></i>
                    <small className="text-gray fw-normal"> (0)</small>
                  </Link>
                </li>
                {hasLogin ? (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      id="pagesDropdown"
                      href="#"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-user me-1 text-gray fw-normal"></i>
                      {userName}
                    </a>
                    <div
                      className="dropdown-menu mt-3 shadow-sm"
                      aria-labelledby="pagesDropdown"
                    >
                      <a
                        className="dropdown-item border-0 transition-link"
                        href="index.html"
                      >
                        Thông tin khách hàng
                      </a>
                      <a
                        className="dropdown-item border-0 transition-link"
                        href="detail.html"
                      >
                        Lịch sử đặt hàng
                      </a>
                      <a
                        className="dropdown-item border-0 transition-link"
                        href="cart.html"
                      >
                        Quá trình giao hàng
                      </a>
                      <a
                        className="dropdown-item border-0 transition-link"
                        href="cart.html"
                      >
                        Trở thành đối tác
                      </a>
                      <a
                        className="dropdown-item border-0 transition-link"
                        href="/lazi-store"
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </a>
                    </div>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        Param === "/dang-nhap" ? "active" : " "
                      }`}
                      to="/dang-nhap"
                    >
                      <i className="fas fa-user me-1 text-gray fw-normal"></i>
                      Đăng nhập
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
export default Header;
