import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import {menuRights} from '@/config/Menu';
import * as getCart from '@/apiServices/getCart';


function MenuRight(){
  const [countCart, setCountCart] = useState(0);
  useEffect(() => {   
    const cacheCart = JSON.parse(sessionStorage.getItem('countCart'));
    const handleCountCart = async ()=>{
      const result = await getCart.getCartItems();
      setCountCart(result.products.length);
    } 
    if(cacheCart && cacheCart !== countCart){
      setCountCart(cacheCart)
      handleCountCart();
    }
    handleCountCart();
  }, [countCart]);
    
  const menuRight = menuRights.map((menu) => {
    return(
      <li key={menu.id} className="nav-item">
        <NavLink 
        className={`nav-link fs-6`}
        style={{fontFamily:"arial"}}
        to={menu.link}>
          {" "}
          <span>
            <i className={menu.icon}></i>
            {menu.name} 
            <small className="text-gray fw-normal">({countCart >= 99 ? '(+99)' : countCart})</small>
          </span>
        </NavLink>
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