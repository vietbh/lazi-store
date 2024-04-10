import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {menuRights} from '@/config/Menu';


function MenuRight(param,title){
  const [countCart, setCountCart] = useState(0);
  useEffect(() => {   
      const cacheCountCart = JSON.parse(sessionStorage.getItem('countCart'));
      const handleCountCart = ()=>{
        if (cacheCountCart && countCart != cacheCountCart) {
          setCountCart(cacheCountCart)
        }
      } 
      handleCountCart();
      const interval = setInterval(handleCountCart, 1500);
      return () => {
        clearInterval(interval);
      };
  }, [countCart]);
    
  const menuRight = menuRights.map((menu) => {
    if(param['*'] === "/"+menu.link){
      title(menu.name);
    }
    return(
      <li key={menu.id} className="nav-item">
        <Link className={`nav-link ${param['*'] == menu.link ? "active" : "" }`}
          to={menu.link}
        >
          {" "}
          <i className={menu.icon}></i>
          <span>{menu.name} <small className="text-gray fw-normal">({countCart >= 99 ? '(+99)' : countCart})</small></span>
        </Link>
      </li>
    );
  });
  
  return (
    <React.Fragment>
      {menuRight}
    </React.Fragment>
  );
}

export default MenuRight;