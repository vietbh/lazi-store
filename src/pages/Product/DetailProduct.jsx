import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import * as detailProduct from '@/apiServices/detailProduct';
import { numberFormat } from "@/components/NumberFormat";
import AlertStatus from "@/components/AlertStatus";

const DetailProduct = () => {
    const slug = useParams()['slug'];
    const path = 'https://vietbh.github.io/lazi-store/';
    const [product,setProduct] = useState([]);
    const [variations,setVariations] = useState([]);
    const [color,setColor] = useState('');
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(false);
    // const hasLogin = sessionStorage.getItem("hasLogin");   
    useEffect(()=>{
        const fetchData = async () =>{
            const result = await detailProduct.detailProduct(slug);
            sessionStorage.setItem('product',JSON.stringify(result.product))
            sessionStorage.setItem('variations',JSON.stringify(result.variation))
            setProduct(result.product);
            setVariations(result.variation);
            const colorDefault = result.variation.at(0)
            setColor(colorDefault.color_type);
        }
        const cacheProduct = JSON.parse(sessionStorage.getItem('product'));
        const cacheVariations = JSON.parse(sessionStorage.getItem('variations'));
        if(cacheProduct && cacheVariations){
            setProduct(cacheProduct);
            setVariations(cacheVariations);
        }
        if(product.length == 0 && variations.length == 0){
            fetchData();
        }
    },[]);

    const addProduct = async(e)=>{
        try {
            const res = await detailProduct.addProduct(e);
            console.log(res);
            if(res == 200)setSuccess(true);
            if(res == 401)setError(true);
            const timeout = setTimeout(()=>{setSuccess(false),setError(false)},5000);
            return ()=>clearTimeout(timeout);
        } catch(error) {
            setSuccess(false);
            setError(true);
        }
        
    }

    const handleAddItem = (e)=>{
        addProduct(e);
    }
    
    return (
        <section className="py-5">
            <div className="container">
                {success && !error && <AlertStatus title={'Đã thêm sản phẩm vào giỏ'}/>}
                {!success && error && <AlertStatus type={"warning"} title={"Vui lòng đăng nhập"}/>}
                <div className="row mb-5">
                    <div className="col-lg-7">
                    {/* <!-- PRODUCT SLIDER--> */}
                        <div className="row m-sm-0">
                            <div className="col-sm-10 order-1 order-sm-2">
                                <div className="swiper product-slider">
                                {variations.map((variation) => {
                                    if(variation.color_type == color){
                                        return(
                                            <div key={variation.id} className=" h-auto">
                                                <a className="glightbox product-view" href={variation.image_url} data-gallery="gallery1" data-glightbox={`Product item ${variation.id}`} >
                                                    <img className="img-fluid w-100" src={variation.image_url} alt="..." />
                                                </a>
                                            </div>
                                        )
                                    }
                                })}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- PRODUCT DETAILS--> */}
                    <div  className="col-lg-5" id='san-pham'>
                        <h3 className="mb-4">{product.name}</h3>
                        <h6 className="text-secondary ">Chọn màu để xem giá</h6>
                        <div className="row d-flex justify-content-start mb-4 mt-1">
                        {variations.map((variation,index) => {
                            if(index == 0 && color == '') setColor(variation.color_type);
                            if(variation.color_type == color){
                                return(
                                    <div key={variation.id} className="col-lg-4 mb-3">
                                        <div className="card border border-4 border-danger rounded-3">
                                            <div className="card-body px-2 py-1 border border-danger rounded-3">
                                                <button className={`btn-hover-none p-0 text-start ${styles.buttonColor}`} type="button" >
                                                    <p className="fw-bolder text-secondary p-0 m-0">{variation.color_type}</p>
                                                    <p className="fw-normal text-secondary p-0 m-0"> {numberFormat(variation.price_sale)}<span className="text-small">đ</span></p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }else{
                                return(
                                    <div key={variation.id} className="col-lg-4 mb-3">
                                        <div className="card border border-4 border-secondary rounded-3">
                                            <div className="card-body px-2 py-1 border border-secondary rounded-3">
                                                <button className={`btn-hover-none p-0 text-start ${styles.buttonColor}`} onClick={()=>setColor(variation.color_type)}>
                                                    <p className="fw-bolder text-secondary p-0 m-0">{variation.color_type}</p>
                                                    <p className="fw-normal text-secondary p-0 m-0"> {numberFormat(variation.price_sale)}<span className="text-small">đ</span></p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                        </div>
                        <div className="row align-items-stretch mb-4">
                            {/* 
                            */}
                            {variations.map((variation,index) => {
                                if(index == 0 && color == '') setColor(variation.color_type);
                                if(variation.color_type == color){
                                    return (
                                        <div key={variation.id} className="row">
                                            <div className="col-sm-7 col-lg-9 pl-sm-0 mb-4 p-0">
                                                {/*!hasLogin && ()*/}
                                                <button className="btn btn-danger btn-block w-100 py-3 fs-5 fw-bold rounded-3 text-uppercase" 
                                                onClick={()=>{handleAddItem(variation)}} disabled={success || error && true}>Mua ngay</button>
                                            </div>
                                            <div className="col-sm-5 col-lg-3 pl-sm-0 mb-4 ">
                                                <button className="btn btn-outline-danger btn-block w-100 p-1 fs-6 rounded-3 "  onClick={()=>{handleAddItem(variation)}}>
                                                    <span>
                                                        <svg width="37px" height="37px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000">
                                                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                                <g id="SVGRepo_iconCarrier">
                                                                    <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M11.5 7L13.5 9M13.5 9L15.5 7M13.5 9V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
                                                                </g>
                                                        </svg>                                          
                                                    </span>    
                                                    <p className="mb-0 pb-0" style={{fontSize:'10px'}}>Thêm vào giỏ</p>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                            <div className="row pe-4 mb-4 mt-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title text-center">Thông số kĩ thuật</h5>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td scope="row">1</td>
                                                    <td>@mdo</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row pe-4 mb-4 mt-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title text-center">Tin tức liên quan đến sản phẩm</h5>
                                        content
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- DETAILS TABS--> */}
                <div className="row mb-5">
                    <div className="col-lg-7 col-sm-12">
                        <ul className="nav nav-tabs border-0" id="myTab" role="tablist">
                            <li className="nav-item"><a className="nav-link text-uppercase active" id="description-tab" data-bs-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Thông tin</a></li>
                            <li className="nav-item"><a className="nav-link text-uppercase" id="reviews-tab" data-bs-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false">Đánh giá</a></li>
                        </ul>
                        <div className="tab-content mb-5" id="myTabContent">
                            <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                                <div className="p-4 p-lg-12 bg-white">
                                    <div className="row">
                                        <div className={`text-md mb-0`} dangerouslySetInnerHTML={{ __html: product.description }} />
                                    </div>
                                </div>
                            </div>
                            {/**Binh luan */}
                            <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                                <div className="p-4 p-lg-5 bg-white">
                                    <div className="row">
                                    <div className="col-lg-12">
                                        <div className="d-flex mb-5">
                                            <div className="flex-shrink-0"><img className="rounded-circle" src={`${path}img/customer-1.png`} alt="" width="50"/></div>
                                            <div className="ms-3 flex-shrink-1">
                                                <h6 className="mb-0 text-uppercase">Jason Doe</h6>
                                                <p className="small text-muted mb-0 text-uppercase">20 May 2020</p>
                                                <p className="text-sm mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="flex-shrink-0"><img className="rounded-circle" src={`${path}img/customer-2.png`} alt="" width="50"/></div>
                                            <div className="ms-3 flex-shrink-1">
                                                <h6 className="mb-0 text-uppercase">Jane Doe</h6>
                                                <p className="small text-muted mb-0 text-uppercase">20 May 2020</p>
                                                <p className="text-sm mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            {/**end Binh luan */}
                        </div>
                    </div>
                </div>
                {/* <!-- RELATED PRODUCTS--> */}
                <h2 className="h5 text-uppercase mb-4">Sản phẩm liên quan</h2>
                <div className="row">
                    {/* <!-- PRODUCT--> */}
                    <div className="col-lg-3 col-sm-6">
                    <div className="product text-center skel-loader">
                        <div className="d-block mb-3 position-relative"><a className="d-block" href="detail.html"><img className="img-fluid w-100" src={`${path}img/product-1.jpg`} alt="..." /></a>
                        <div className="product-overlay">
                            <ul className="mb-0 list-inline">
                                <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href="#!">Add to cart</a></li>
                            </ul>
                        </div>
                        </div>
                        <h6> <a className="reset-anchor" href="detail.html">Kui Ye Chen’s AirPods</a></h6>
                        <p className="small text-muted">$250</p>
                    </div>
                    </div>
                    {/* <!-- PRODUCT--> */}
                    <div className="col-lg-3 col-sm-6">
                    <div className="product text-center skel-loader">
                        <div className="d-block mb-3 position-relative"><a className="d-block" href="detail.html"><img className="img-fluid w-100" src={`${path}img/product-2.jpg`} alt="..." /></a>
                        <div className="product-overlay">
                            <ul className="mb-0 list-inline">
                            <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-outline-dark" href="#!"><i className="far fa-heart"></i></a></li>
                            <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href="#!">Add to cart</a></li>
                            <li className="list-inline-item mr-0"><a className="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal"><i className="fas fa-expand"></i></a></li>
                            </ul>
                        </div>
                        </div>
                        <h6> <a className="reset-anchor" href="detail.html">Air Jordan 12 gym red</a></h6>
                        <p className="small text-muted">$300</p>
                    </div>
                    </div>
                    {/* <!-- PRODUCT--> */}
                    <div className="col-lg-3 col-sm-6">
                    <div className="product text-center skel-loader">
                        <div className="d-block mb-3 position-relative"><a className="d-block" href="detail.html"><img className="img-fluid w-100" src={`${path}img/product-3.jpg`} alt="..." /></a>
                        <div className="product-overlay">
                            <ul className="mb-0 list-inline">
                            <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-outline-dark" href="#!"><i className="far fa-heart"></i></a></li>
                            <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href="#!">Add to cart</a></li>
                            <li className="list-inline-item mr-0"><a className="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal"><i className="fas fa-expand"></i></a></li>
                            </ul>
                        </div>
                        </div>
                        <h6> <a className="reset-anchor" href="detail.html">Cyan cotton t-shirt</a></h6>
                        <p className="small text-muted">$25</p>
                    </div>
                    </div>
                    {/* <!-- PRODUCT--> */}
                    <div className="col-lg-3 col-sm-6">
                    <div className="product text-center skel-loader">
                        <div className="d-block mb-3 position-relative"><a className="d-block" href="detail.html"><img className="img-fluid w-100" src={`${path}img/product-4.jpg`} alt="..." /></a>
                        <div className="product-overlay">
                            <ul className="mb-0 list-inline">
                            <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-outline-dark" href="#!"><i className="far fa-heart"></i></a></li>
                            <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href="#!">Add to cart</a></li>
                            <li className="list-inline-item mr-0"><a className="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal"><i className="fas fa-expand"></i></a></li>
                            </ul>
                        </div>
                        </div>
                        <h6> <a className="reset-anchor" href="detail.html">Timex Unisex Originals</a></h6>
                        <p className="small text-muted">$351</p>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailProduct;