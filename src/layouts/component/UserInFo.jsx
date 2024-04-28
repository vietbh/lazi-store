import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import URL_PATH from '../../config/UrlPath';
import { loginSettings } from '../../config/Menu';

const UserInfo = () => {
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {   
        const userInfos = JSON.parse(sessionStorage.getItem('userInfo'));
        if (userInfos) {
          setDataUser(userInfos);
        }
    },[])

    const handleLogout = () => {
        alert('Đăng xuất thành công');
        sessionStorage.removeItem('hasLogin');
        sessionStorage.removeItem('userInfo');
        localStorage.removeItem('userInfo');
        // history.go(0);
        location.href='/';
    };

    const setting = loginSettings.map((setting) => {
        return (
          <Link
            key={setting.id}
            className="dropdown-item border-0 transition-link"
            style={{fontFamily:"arial"}}
            to={URL_PATH.concat(setting.link)}
            onClick={setting.logout ? handleLogout : ""}
          >
            {setting.name}
          </Link>
        );
    });
    return (
        <React.Fragment>
            <Link className="nav-link dropdown-toggle fs-6"
            
            id="pagesDropdown" href="#" data-bs-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false"
            >   
            {dataUser.image_url ? <img className="rounded-circle me-1 " src={dataUser.image_url} style={{width:'28px'}} /> : <i className="fas fa-user me-1 text-gray fw-normal"></i>} 
            <span>{dataUser.name}</span>
            </Link>
            <div className="dropdown-menu mt-1 shadow-sm w-25" aria-labelledby="pagesDropdown">
                {setting}
            </div>
        </React.Fragment>
    );
};

export default UserInfo;