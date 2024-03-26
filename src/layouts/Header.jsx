import { Link, useParams } from "react-router-dom";
import FormSearch from "../components/FormSearch";
import URL_PATH from "../config/UrlPath";
import { useEffect, useState } from "react";
import ModalChangePass from "../components/ModalChangePass";
function Header() {
  const param = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [dataUsers, setDataUsers] = useState([]);
  const hasLogin = sessionStorage.getItem("hasLogin");
  const title = function (value) {
    document.title = value;
  };

  const handleLogout = () => {
    alert("Đăng xuất thành công");
    sessionStorage.removeItem("hasLogin");
    sessionStorage.removeItem("userInfo");
    if (localStorage.getItem("hasLogin") && localStorage.getItem("userInfo")) {
      localStorage.removeItem("hasLogin");
      localStorage.removeItem("userInfo");
    }
  };
  const menuLefts = [
    { id: 1, name: "Trang chủ", link: "/" },
    { id: 2, name: "Danh mục", link: "/cua-hang.html" },
    { id: 3, name: "Tin tức", link: "/tin-tuc.html" },
  ];
  const menuListLogin = [
    { id: 1, name: "Đăng nhập", link: "/dang-nhap.html", show: true },
    { id: 2, name: "Đăng ký", link: "/dang-ky.html", show: false },
  ];
  const menuRights = [
    {
      id: 1,
      name: "Giỏ hàng",
      link: "/gio-hang.html",
      icon: "fas fa-dolly-flatbed me-1 text-gray",
    },
    // {id:2, name:'Thông báo',link:'/thong-bao.html',icon:'far fa-heart me-1 text-gray'},
  ];
  const loginSettings = [
    { id: 1, name: "Thông tin khách hàng", link: "/thong-tin-khach-hang.html" },
    { id: 2, name: "Lịch sử đặt hàng", link: "/lich-su.html" },
    { id: 3, name: "Quá trình giao hàng", link: "/gia-hang.html" },
    { id: 4, name: "Mã giảm giá", link: "/ma-giam-gia.html" },
    { id: 5, name: "Đăng xuất", link: "/", logout: true },
  ];
  const userInfos = sessionStorage.getItem("userInfo");
  const dataParse = JSON.parse(userInfos);

  useEffect(() => {
    if (dataUsers.length === 0 && userInfos) {
      setDataUsers(dataParse);
    }
  }, [dataParse, dataUsers, userInfos]);

  const menuLogin = menuListLogin.map((menu) => {
    if (param["*"] === URL_PATH.concat(menu.link)) title(menu.name);
    if (menu.show)
      return (
        <li className="nav-item" key={menu.name}>
          <Link
            className={`nav-link ${
              param["*"] === URL_PATH.concat(menu.link) ? "active" : ""
            }`}
            to={URL_PATH.concat(menu.link)}
          >
            <i className="fas fa-user me-1 text-gray fw-normal"></i>
            {menu.name}
          </Link>
        </li>
      );
  });
  const setting = loginSettings.map((setting) => {
    return (
      <Link
        key={setting.id}
        className="dropdown-item border-0 transition-link"
        to={URL_PATH.concat(setting.link)}
        onClick={setting.logout ? handleLogout : ""}
      >
        {setting.name}
      </Link>
    );
  });
  const menuLeft = menuLefts.map((menu) => {
    if (param["*"] === URL_PATH.concat(menu.link)) {
      title(menu.name);
    }
    return (
      <li className="nav-item" key={menu.name}>
        <Link
          className={`nav-link ${
            param["*"] === URL_PATH.concat(menu.link) ? "active" : ""
          }`}
          to={URL_PATH.concat(menu.link)}
        >
          {menu.name}
        </Link>
      </li>
    );
  });
  const menuRight = menuRights.map((menu) => {
    if (param["*"] === URL_PATH.concat(menu.link)) {
      title(menu.name);
    }
    return (
      <li key={menu.id} className="nav-item">
        <Link
          className={`nav-link ${
            param["*"] === URL_PATH.concat(menu.link) ? "active" : ""
          }`}
          to={URL_PATH.concat(menu.link)}
        >
          {" "}
          <i className={menu.icon}></i>
          {!hasLogin ? (
            <span>
              {menu.name} <small className="text-gray fw-normal">(0)</small>
            </span>
          ) : (
            <small className="text-gray fw-normal">(+99)</small>
          )}
        </Link>
      </li>
    );
  });
  const userInfo = dataUsers.map((user) => {
    return (
      <a
        key={user.id}
        className="nav-link dropdown-toggle"
        id="pagesDropdown"
        href="#"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {user.image_url ? (
          <img className="rounded-circle" src={user.image_url} width={50} />
        ) : (
          <i className="fas fa-user me-1 text-gray fw-normal"></i>
        )}
        <span>{user.name}</span>
      </a>
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
        <div className="container px-lg-3">
          <nav className="navbar navbar-expand-lg navbar-light py-3 px-lg-0">
            <a className="navbar-brand" href={"/"}>
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
                      {" Tìm kiếm"}
                    </a>
                    <div
                      className="dropdown-menu mt-3 shadow-sm"
                      aria-labelledby="pagesDropdownSearch"
                    >
                      <div
                        className="dropdown-item border-0 px-2"
                        style={{ width: 280 }}
                      >
                        <FormSearch />
                      </div>
                    </div>
                  </div>
                </li>
                {/*
                 */}
              </ul>
              <ul className="navbar-nav ms-auto">
                {menuRight}
                {hasLogin ? (
                  <li className="nav-item dropdown me-3">
                    {userInfo}
                    <div
                      className="dropdown-menu mt-3 shadow-sm w-25"
                      aria-labelledby="pagesDropdown"
                    >
                      <div
                        className="dropdown-item border-0 transition-link"
                        onClick={() => setModalShow(true)}
                      >
                        Đổi mật khẩu
                      </div>
                      {setting}
                    </div>
                  </li>
                ) : (
                  menuLogin
                )}
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <ModalChangePass show={modalShow} onHide={() => setModalShow(false)} user={dataUsers}/>
    </section>
  );
}
export default Header;
