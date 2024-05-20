import { Link } from 'react-router-dom';
import URL_PATH from '@/config/UrlPath';
import { useEffect, useState } from 'react';
import * as getCart  from '@/apiServices/getCart';
import { numberFormat } from '@/components/NumberFormat';

function Cart(){
    const [itemsCarts,setItemsCarts] = useState([]); 
    const [loading,setLoading] = useState(true);
    // Tổng tiền 
    const totalCart = itemsCarts.reduce((previousValue, currentValue) => {
          return previousValue + currentValue.product_varia.price_sale * currentValue.quantity_item
    }, 0);
    let countCart = 0;
    let i = 1;

    const fetchGetCartItems = async () => {
        try {
            setLoading(true);
            const res = await getCart.getCartItems();
            await setItemsCarts(res.products);
            const cacheCartItems = JSON.parse(sessionStorage.getItem('itemsCart'));
            if(cacheCartItems){
                setItemsCarts(cacheCartItems.products);
            }        
            setLoading(false);
        } catch(error) {
            console.error(error);
            setLoading(true);
        }
    };
    const removeCartItem = async (id)=>{
        try {
            setLoading(true);
            const res = await getCart.removeCartItem(id);
            console.log(res);
            fetchGetCartItems();
            setLoading(false);
        } catch(error) {
            console.log(error);
            setLoading(true);
        }
    }
    const updateCartItem = async (id,type)=>{
        try {
            setLoading(true);
            const res = await getCart.updateCartItem(id,type);
            console.log(res);            
            fetchGetCartItems();
            setLoading(false);
        } catch(error) {
            console.log(error);
            setLoading(true);
        }
    }

    useEffect(() => {
        fetchGetCartItems();
    }, []);

    // Xóa sản phẩm và cập nhật 
  
    const handleRemoveItem = (item) => {
        removeCartItem(item);
    };

    const handleQuantityChange = (id, value) => {
        // Kiểm tra nếu value là một số hợp lệ
        if (!isNaN(value) && value >= 0) {
          // Thực hiện logic để cập nhật số lượng cho sản phẩm với id tương ứng
          updateCartItem(id,value)
        }
      };
    const handleQuantityItem = (id,type) => {
        updateCartItem(id,type)
        // Thực hiện logic để cập nhật số lượng cho sản phẩm với id tương ứng
        // ...
    };
    

    if(itemsCarts.length > 0){
        countCart = itemsCarts.length;   
    }
    const itemCart = itemsCarts.map((item) => {
        return (
            <tr key={item.product_varia.id}>
                <th className="p-3 align-middle border-light">
                    <p className="mb-0 small">{i++}</p>
                </th>
                <th className="ps-0 py-3 border-light" scope="row">
                    <div className="d-flex align-items-center">
                        <a className="reset-anchor d-block animsition-link" href={'/chi-tiet-san-pham/'+item.product_varia.product.slug+'.html'}><img src={item.product_varia.image_url} alt={item.product_varia.image_url} width="70"/></a>
                        <div className="ms-3"><strong className="h6"><a className="reset-anchor animsition-link text-wrap" href={`cua-hang/${item.product_varia.product.slug}.html`}>{item.product_varia.product.name}</a></strong></div>
                    </div>
                </th>
                <td className="p-3 align-middle border-light">
                    <p className="fw-bold small text-secondary p-0 m-0"> {numberFormat(item.product_varia.price_sale)}<span className="text-small">đ</span></p>
                </td>
                <td className="p-3 align-middle border-light">
                    <div className="border d-flex align-items-center justify-content-between px-3"><span className="small text-uppercase text-gray headings-font-family">Số lượng</span>
                    <div className="quantity">
                        <button className="dec-btn p-0" onClick={() => handleQuantityItem(item.product_varia.id, 'minus')}><i className="fas fa-caret-left"></i></button>
                        <input
                        className="form-control form-control-sm border-0 shadow-0 p-0"
                        type="text"
                        name="quantity" disabled
                        value={item.quantity_item}
                        onChange={(event) => handleQuantityChange(item.product_varia.id, event.target.value)}
                        />
                        <button className="inc-btn p-0" onClick={() => handleQuantityItem(item.product_varia.id, 'plus')}><i className="fas fa-caret-right"></i></button>
                    </div>
                    </div>
                </td>
                <td className="p-3 align-middle border-light">
                    <p className="mb-0 small">{numberFormat(item.product_varia.price_sale * item.quantity_item)}<span className="text-small">đ</span></p>
                </td>
                <td className="p-3 align-middle border-light">
                    <button className="btn reset-anchor" onClick={()=>{handleRemoveItem(item.product_varia.id)}}
                    >
                        <i className="fas fa-trash-alt small text-danger"></i>
                    </button>
                </td>  
            </tr>
        );
    });

    return (
        <section>
            <div className="container">
                {/* <!-- HERO SECTION--> */}
                <section className="py-5 bg-light">
                <div className="container">
                    <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                    <div className="col-lg-6">
                        <h1 className="h2 text-uppercase mb-0">Giỏ hàng</h1>
                    </div>
                    <div className="col-lg-6 text-lg-end">
                        <nav aria-label="breadcrumb">
                        <ol className="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
                            <li className="breadcrumb-item"><Link className="text-dark" to="/">Trang chủ</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Giỏ hàng</li>
                        </ol>
                        </nav>
                    </div>
                    </div>
                </div>
                </section>
                <section className="py-5">
                <h2 className="h5 text-uppercase mb-4">Giỏ hàng</h2>
                <div className="row">
                    <div className="col-lg-8 mb-4 mb-lg-0">
                    {/* <!-- CART TABLE--> */}
                    <div className="table-responsive  mb-4">
                        <table className="table table-fixed text-nowrap">
                            <thead className="bg-light">
                                <tr>
                                <th className="border-0 p-3" scope="col"> <strong className="text-sm text-uppercase">STT</strong></th>
                                <th className="border-0 p-3" scope="col"> <strong className="text-sm text-uppercase">Tên sản phẩm</strong></th>
                                <th className="border-0 p-3" scope="col"> <strong className="text-sm text-uppercase">Giá</strong></th>
                                <th className="border-0 p-3" scope="col"> <strong className="text-sm text-uppercase">Số lượng</strong></th>
                                <th className="border-0 p-3" scope="col"> <strong className="text-sm text-uppercase">Tổng tiền</strong></th>
                                <th className="border-0 p-3" scope="col"> <strong className="text-sm text-uppercase"></strong></th>
                                </tr>
                            </thead>
                            <tbody className="border-0">
                                {!loading && countCart == 0 ? (
                                    <tr>
                                        <th colSpan={10}><h5 className='text-md text-center'>Không có sản phẩm nào trong giỏ hàng <span><a href={'/'} className='text-decoration-underline'>trở lại mua hàng</a></span></h5></th>
                                    </tr>
                                ): itemCart }
                            </tbody>
                        </table>
                    </div>
                    {/* <!-- CART NAV--> */}
                    { countCart > 0 &&(
                        <div className="bg-light px-4 py-3">
                            <div className="row align-items-center text-center">
                            <div className="col-md-6 mb-3 mb-md-0 text-md-start"><Link className="btn btn-link p-0 text-dark btn-sm" to={"/"+URL_PATH+"/"}><i className="fas fa-long-arrow-alt-left me-2"> </i>Tiếp tục mua sắm</Link></div>
                            <div className="col-md-6 text-md-end"><Link className="btn btn-outline-dark btn-sm" to={"/tien-hanh-dat-hang.html"}>Tiến hành đặt hàng<i className="fas fa-long-arrow-alt-right ms-2"></i></Link></div>
                            </div>
                        </div>
                    )}
                    </div>
                    {/* <!-- ORDER TOTAL--> */}
                    <div className="col-lg-4">
                        <div className="card border-0 rounded-0 p-lg-4 bg-light">
                            <div className="card-body">
                            <h5 className="text-uppercase mb-4">Sản phẩm <span>({countCart})</span></h5>
                            <ul className="list-unstyled mb-0">
                                <li className="d-flex align-items-center justify-content-between"><strong className="text-uppercase small font-weight-bold">Tạm tính</strong><span className="text-muted small">{numberFormat(totalCart)}đ</span></li>
                                <li className="border-bottom my-2"></li>
                                <li className="d-flex align-items-center justify-content-between mb-4"><strong className="text-uppercase small font-weight-bold">Tổng cộng</strong><span>{numberFormat(totalCart)}đ</span></li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
                </section>
            </div>
        </section>
    );
}
export default Cart