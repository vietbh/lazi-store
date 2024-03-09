// import React from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
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
                            <li className="breadcrumb-item"><Link className="text-dark" to="/gio-hang">Giỏ hàng</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Thanh toán</li>
                        </ol>
                        </nav>
                    </div>
                    </div>
                </div>
                </section>
                <section className="py-5">
                {/* <!-- BILLING ADDRESS--> */}
                <h2 className="h5 text-uppercase mb-4">Thông tin hóa đơn</h2>
                <div className="row">
                    <div className="col-lg-8">
                    <form action="#">
                        <div className="row gy-3">
                        <div className="col-lg-6">
                            <label className="form-label text-sm text-uppercase" htmlFor="fullName">Họ và Tên </label>
                            <input className="form-control form-control-lg" autoComplete='fullName' type="text" id="fullName" name='fullName' placeholder="Enter your last name" />
                        </div>
                        <div className="col-lg-6">
                            <label className="form-label text-sm text-uppercase" htmlFor="email">Địa chỉ Email </label>
                            <input className="form-control form-control-lg" autoComplete='email' type="email" id="email" name='email' placeholder="e.g. Jason@example.com" />
                        </div>
                        <div className="col-lg-6">
                            <label className="form-label text-sm text-uppercase" htmlFor="phoneNumber">Số điện thoại </label>
                            <input className="form-control form-control-lg" autoComplete='phoneNumber' type="tel" id="phoneNumber" name='phoneNumber'  placeholder="e.g. +02 245354745" />
                        </div>
                        {/* <div className="col-lg-6">
                            <label className="form-label text-sm text-uppercase" htmlFor="company">Company name (optional) </label>
                            <input className="form-control form-control-lg" type="text" id="company" placeholder="Your company name">
                        </div> */}
                        <div className="col-lg-6">
                            <label className="form-label text-sm text-uppercase" htmlFor="city">Thành phố </label>
                            <input className="form-control form-control-lg" type="text" id="city" />
                        </div>
                        <div className="col-lg-12">
                            <label className="form-label text-sm text-uppercase" htmlFor="address">Địa chỉ giao hàng </label>
                            <input className="form-control form-control-lg" type="text" id="address" placeholder="Mời nhập chi tiết thông tin địa chỉ" />
                        </div>
                        <div className="col-lg-12 form-group">
                            <button className="btn btn-dark" type="submit">Tiến hành thanh toán</button>
                        </div>
                        </div>
                    </form>
                    </div>
                    {/* <!-- ORDER SUMMARY--> */}
                    <div className="col-lg-4">
                    <div className="card border-0 rounded-0 p-lg-4 bg-light">
                        <div className="card-body">
                        <h5 className="text-uppercase mb-4">Đơn hàng của bạn gồm <span>(5)</span></h5>
                        <ul className="list-unstyled mb-0">
                            <li className="d-flex align-items-center justify-content-between"><strong className="small fw-bold">Red digital smartwatch</strong><span className="text-muted small">$250</span></li>
                            <li className="border-bottom my-2"></li>
                            <li className="d-flex align-items-center justify-content-between"><strong className="small fw-bold">Gray Nike running shoes</strong><span className="text-muted small">$351</span></li>
                            <li className="border-bottom my-2"></li>
                            <li className="d-flex align-items-center justify-content-between"><strong className="text-uppercase small fw-bold">Total</strong><span>$601</span></li>
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