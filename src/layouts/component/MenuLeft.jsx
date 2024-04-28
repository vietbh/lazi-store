import React from 'react';
import { menuLefts } from '@/config/Menu';
import URL_PATH from '@/config/UrlPath';
import { NavLink } from 'react-router-dom';

const MenuLeft = () => {
    
    const menuLeft = menuLefts.map((menu) => {
        return (
          <li 
          key={menu.name} className="nav-item">
            <NavLink
            className={`nav-link fs-6`}
            style={{fontFamily:"Arial"}}
            to={URL_PATH.concat(menu.link)}
            >
              {menu.name}
            </NavLink>
          </li>
        );
    });

    return (
        <React.Fragment>
            {menuLeft}
        </React.Fragment>
    );
};

export default MenuLeft;