import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {menuRights} from '@/config/Menu';
import * as getCart from '@/apiServices/getCart';


function MenuRight(param,title){
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
    if(param['*'] === "/"+menu.link){
      title(menu.name);
    }
    return(
      <li key={menu.id} className="nav-item">
        <Link className={`nav-link ${param['*'] == menu.link ? "active" : "" }`}
          to={menu.link}
        >
          
        <i className={menu.icon}></i>
        <span>{menu.name} </span>
        {/*<small className="text-gray fw-normal">({countCart >= 99 ? '(+99)' : countCart})</small> */}
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