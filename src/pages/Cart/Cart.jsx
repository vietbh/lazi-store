import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../../state/cartSlice";
import URL_PATH from '../../config/UrlPath';
import { NumericFormat } from 'react-number-format';
import { useEffect, useState } from 'react';
// import { Button, Modal } from 'bootstrap';

function Cart(){
     //Sử dụng redux  
     const dispatch = useDispatch();
     // Biến lưu trữ thông tin sản phẩm
     const globalstate = useSelector(state=>state.cartState);
     // Xóa SP trong giỏ,tăng, giảm số lượng sản phẩm 
     const { remove,increase,decrease } = cartSlice.actions; 
     // Tổng tiền 
     const totalCart = globalstate.reduce((previousValue, currentValue) => {
         // return previousValue+ currentValue.quantity
         return previousValue+400 * currentValue.quantity
     }, 0);
     let countCart = globalstate.length;    
     const [itemsCart,setItemsCart] = useState([]);
    //  const [show, setShow] = useState([]);
 
    //  const handleCancel = () => {
    //      setShow([]);
    //  };
     //   
     useEffect(()=>{
        if(globalstate.lenght > 0){
            sessionStorage.setItem('itemsCart',JSON.stringify(globalstate));
        }
        const cacheItemsCart =  JSON.parse(sessionStorage.getItem('itemsCart'));
        if(cacheItemsCart && itemsCart.length === 0){
            setItemsCart(cacheItemsCart);
        }

     },[globalstate,itemsCart]);
    
    const itemCart = globalstate.map((item,index) => {
        const price = item.variations.map((variation,index) => {
            if(index == 0 ){
              return(
                <p key={variation.id} className="mb-0 small">
                  <NumericFormat disabled className="btn text-start p-0 fw-bold text-dark" value={variation.price_sale} thousandSeparator=',' decimalSeparator="." suffix=' đ'/>
                </p>
              );
            }
        });
        return (
            <tr key={item.id}>
                <th className="p-3 align-middle border-light">
                    <p className="mb-0 small">1</p>
                </th>
                <th className="ps-0 py-3 border-light" scope="row">
                    <div className="d-flex align-items-center"><a className="reset-anchor d-block animsition-link" href="detail.html"><img src={item.image_url} alt={item.image_url} width="70"/></a>
                    <div className="ms-3"><strong className="h6"><a className="reset-anchor animsition-link" href="detail.html">{item.name}</a></strong></div>
                    </div>
                </th>
                <td className="p-3 align-middle border-light">
                    {price}
                </td>
                <td className="p-3 align-middle border-light">
                    <div className="border d-flex align-items-center justify-content-between px-3"><span className="small text-uppercase text-gray headings-font-family">Số lượng</span>
                    <div className="quantity">
                        <button className="dec-btn p-0"><i className="fas fa-caret-left"></i></button>
                        <input className="form-control form-control-sm border-0 shadow-0 p-0" type="text" value={item.quantity} onChange={()=>{}} />
                        <button className="inc-btn p-0"><i className="fas fa-caret-right"></i></button>
                    </div>
                    </div>
                </td>
                <td className="p-3 align-middle border-light">
                    <p className="mb-0 small">$250</p>
                </td>
                <td className="p-3 align-middle border-light">
                    <button className="reset-anchor" onClick={()=>{
                        dispatch(remove(item));
                        }}
                    >
                        <i className="fas fa-trash-alt small text-danger"></i>
                    </button>
                </td>  
            </tr>
        );
    });
        {/**
            <Modal centered  show={show[index]} onHide={handleCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title><h4 className="text-danger">Thông báo</h4></Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <Modal.Title><h2 className="fs-5 text-sm">Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng</h2></Modal.Title>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCancel}>
                        Hủy
                        </Button>
                        <Button variant="primary" onClick={()=>{
                            dispatch(remove(item));
                            const newShow = [...show];
                            newShow[index] = false;
                            setShow(newShow);
                        }}>
                        Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>
         */}

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
                                {countCart === 0 ? (
                                    <tr>
                                        <th colSpan={10}><h5 className='text-md text-center'>Không có sản phẩm nào trong giỏ hàng <span><a href={'/'+URL_PATH+'/cua-hang'} className='text-decoration-underline'>trở lại mua hàng</a></span></h5></th>
                                    </tr>
                                ): itemCart }
                        
                            </tbody>
                        </table>
                    </div>
                    {/* <!-- CART NAV--> */}
                    {countCart > 0 &&(
                        <div className="bg-light px-4 py-3">
                            <div className="row align-items-center text-center">
                            <div className="col-md-6 mb-3 mb-md-0 text-md-start"><Link className="btn btn-link p-0 text-dark btn-sm" to="/cua-hang"><i className="fas fa-long-arrow-alt-left me-2"> </i>Tiếp tục mua sắm</Link></div>
                            <div className="col-md-6 text-md-end"><Link className="btn btn-outline-dark btn-sm" to="/tien-hanh-dat-hang">Tiến hành đặt hàng<i className="fas fa-long-arrow-alt-right ms-2"></i></Link></div>
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
                            <li className="d-flex align-items-center justify-content-between"><strong className="text-uppercase small font-weight-bold">Tạm tính</strong><span className="text-muted small">{totalCart}đ</span></li>
                            <li className="border-bottom my-2"></li>
                            <li className="d-flex align-items-center justify-content-between mb-4"><strong className="text-uppercase small font-weight-bold">Tổng cộng</strong><span>{totalCart}đ</span></li>
                            {countCart > 0 &&(
                                <li>
                                <form action="#">
                                    <div className="input-group mb-0">
                                    <input className="form-control" type="text" placeholder="Nhập coupon để được giảm giá " onChange={()=>{}}/>
                                    <button className="btn btn-dark btn-sm w-100" type="submit"> <i className="fas fa-gift me-2"></i>Sử dụng coupon</button>
                                    </div>
                                </form>
                                </li>
                            )}
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