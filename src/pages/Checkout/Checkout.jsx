// import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormCheckout from '@/components/FormCheckout';
import { numberFormat } from '@/components/NumberFormat';
import * as getCart from '@/apiServices/getCart';

const Checkout = () => {
    const [cartItems,setCartItems] = useState([]);
    useEffect(()=>{
        const fetchGetCartItems = async () => {
            try {
                // setLoading(true);
                const res = await getCart.getCartItems();
                await setCartItems(res.products);
                // const cacheCartItems = JSON.parse(sessionStorage.getItem('itemsCart'));
                // if(cacheCartItems){
                //     setCartItems(cacheCartItems.products);
                // }        
                // setLoading(false);
            } catch(error) {
                console.error(error);
                // setLoading(true);
            }
        };

        fetchGetCartItems();
        // const cacheCartItems = JSON.parse(sessionStorage.getItem('itemsCart'));
        // if(cacheCartItems){
        //     setCartItems(cacheCartItems.products);
        // }
    },[])


    const orderInfo = cartItems.map((item) => {
        return(
            <div key={item.product_varia.id}>
                <li  className="d-flex align-items-center justify-content-between">
                    <strong className="small fw-bold text-truncate">({item.quantity_item}){item.product_varia.product.name}</strong>
                    <span className="text-muted small">{numberFormat(item.product_varia.price_sale)}đ</span></li>
                <li className="border-bottom my-2"></li>
            </div>
        )
    })

    return (
        <section>
            <div className="container">
                {/* <!-- HERO SECTION--> */}
                <section className="py-5 bg-light">
                <div className="container">
                    <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                    <div className="col-lg-6">
                        <h1 className="h2 text-uppercase mb-0">Tiến hành đặt hàng</h1>
                    </div>
                    <div className="col-lg-6 text-lg-end">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
                                <li className="breadcrumb-item"><Link className="text-dark" to="/">Trang chủ</Link></li>
                                <li className="breadcrumb-item"><Link className="text-dark" to="/gio-hang.html">Giỏ hàng</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Thanh toán</li>
                            </ol>
                        </nav>
                    </div>
                    </div>
                </div>
                </section>
                <section className="py-5">
                {/* <!-- BILLING ADDRESS--> */}
                <h2 className="h5 text-uppercase mb-4">Thông tin giao hàng</h2>
                <div className="row">
                    <div className="col-lg-7">
                        <FormCheckout />
                    </div>
                    {/* <!-- ORDER SUMMARY--> */}
                    <div className="col-lg-5">
                        <div className="card border-0 rounded-0 p-lg-4 bg-light">
                            <div className="card-body">
                                <h5 className="text-uppercase mb-4">Đơn hàng gồm<span>({cartItems.reduce((previousValue, currentValue) => {return previousValue += currentValue.quantity_item}, 0)}) </span></h5>
                                <ul className="list-unstyled mb-0">
                                    {orderInfo}
                                    {/**
                                    <li className="d-flex align-items-center justify-content-between mb-4"><strong className="text-uppercase small font-weight-bold">Tổng cộng</strong><span>{numberFormat(totalCart)}đ</span></li>
                                     */}
                                     
                                    <li>
                                    <form action="#">
                                        <div className="input-group mb-0">
                                        <input className="form-control" type="text" placeholder="Nhập coupon để được giảm giá " onChange={()=>{}}/>
                                        <button className="btn btn-dark btn-sm w-100" type="submit"> <i className="fas fa-gift me-2"></i>Sử dụng coupon</button>
                                        </div>
                                    </form>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                </section>
            </div>
        </section>
    );
};

export default Checkout;