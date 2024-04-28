import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import * as detailProduct from '@/apiServices/detailProduct';
import { numberFormat } from "@/components/NumberFormat";
import CarouselCard from '@/components/CarouselCard';
import FormComment from "./component/FormComment";
import BreadcrumbCustom from "@/components/BreadcrumbCustom";
import AlertBootrap from "@/components/AlertBootrap";

const DetailProduct = () => {
    const slug = useParams()['slug'];
    const [product,setProduct] = useState([]);
    const [products,setProducts] = useState([]);
    const [variations,setVariations] = useState([]);
    const [specifications,setSpecifications] = useState([]);
    const [categories,setCategories] = useState([]);
    const [subCategories,setSubCategories] = useState([]);
    const [color,setColor] = useState('');
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(false);
    const [showDescrip,setShowDescrip] = useState(false);
    // const hasLogin = sessionStorage.getItem("hasLogin");   
    useEffect(()=>{
        const fetchData = async () =>{
            const result = await detailProduct.detailProduct(slug);
            sessionStorage.setItem('product',JSON.stringify(result.product))
            sessionStorage.setItem('variations',JSON.stringify(result.variation))
            setProduct(result.product);
            setVariations(result.variation);
            setProducts(result.productRela.data);
            setSpecifications(result.speci);
            setSubCategories(result.subcategories);
            setCategories(result.category);
            const colorDefault = result.variation.at(0);
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
    console.log(categories);
    console.log(subCategories);
    const addProduct = async(e)=>{
        try {
            const res = await detailProduct.addProduct(e);
            console.log(res);
            if(res == 200)setSuccess(true);
            if(res == 401)setError(true);
            const timeout = setTimeout(()=>{setSuccess(false),setError(false)},1500);
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
        <React.Fragment>
            <section className="py-4">
                {success && !error && <AlertBootrap type={"success"} title={'Đã thêm sản phẩm vào giỏ'}/>}
                {!success && error && <AlertBootrap type={"warning"} title={"Vui lòng đăng nhập"}/>}
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-lg-7">
                        <BreadcrumbCustom item={categories && categories} itemActive={subCategories && subCategories.name}/>
                        {/* <!-- PRODUCT SLIDER--> */}
                            <div className="row m-sm-0">
                                <div className="col-sm-10 order-1 order-sm-2">
                                    <div className="swiper product-slider">
                                    {variations.map((variation) => {
                                        if(variation.color_type == color){
                                            return(
                                                <div key={variation.id} className="h-auto">
                                                    <a className="glightbox product-view" href={variation.image_url} data-gallery="gallery1" data-glightbox={`Product item ${variation.id}`} >
                                                        <img className="img-fluid w-100" src={variation.image_url} alt="..." />
                                                    </a>
                                                </div>
                                            );
                                        }
                                    })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- PRODUCT DETAILS--> */}
                        <div  className="col-lg-5" id='san-pham'>
                            <h3 className="mb-4 mt-1" style={{fontFamily: "Roboto Medium",textTransform: "capitalize"}}>{product.name}</h3>
                            <h6 className="text-secondary text-base mb-3">Chọn màu sắc</h6>
                            
                            <div className="row d-flex justify-content-start mb-4">
                            {variations.map((variation,index) => {
                                if(index == 0 && color == '') setColor(variation.color_type);
                                if(variation.color_type == color){
                                    return(
                                        <div key={variation.id} className="col-lg-4 mb-2">
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
                            {variations.map((variation,index) => {
                                if(index == 0 && color == '') setColor(variation.color_type);
                                if(variation.color_type == color){
                                    return(
                                        <div key={variation.id} className="col-lg-12 mb-3">
                                            <div className="d-flex mt-1">
                                                <h6 className="text-black ">Số lượng:</h6>
                                                <span className="bagde text-secondary rounded-3 ms-2 text-sm"> {variation.quantity} sản phẩm</span>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                            </div>
                            <div className="row align-items-stretch mb-4">
                        
                                {variations.map((variation,index) => {
                                    if(index == 0 && color == '') setColor(variation.color_type);
                                    if(variation.color_type == color){
                                        return (
                                            <div key={variation.id} className="row">
                                                <div className="col-sm-12 col-lg-11 pl-sm-0 mb-4 p-0">
                                                    <button className="btn btn-danger btn-block w-100 py-3 fs-5 fw-bold rounded-pill text-uppercase" 
                                                    onClick={()=>{handleAddItem(variation)}} disabled={success || error && true}>
                                                        <span>
                                                            <svg width="37px" height="37px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                                <g id="SVGRepo_iconCarrier">
                                                                    <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M11.5 7L13.5 9M13.5 9L15.5 7M13.5 9V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
                                                                </g>
                                                            </svg>                                          
                                                        </span>  
                                                        <span className="ms-3" style={{fontSize:'17px',fontFamily:'Arial'}}>Thêm vào giỏ</span>                                                
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
                                            <table className="table table-bordered text-uppercase fw-medium">
                                                <thead>
                                                    {specifications.map((specification) => {
                                                        <tr key={specification.id}>
                                                            <th>{specifications.name}</th>
                                                            <th>{specifications.value}</th>
                                                        </tr>
                                                    })}
                                                </thead>
                                            
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="row pe-4 mb-4 mt-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title text-center">Tin tức liên quan đến sản phẩm</h5>
                                            <p>Chưa cập nhật</p>
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
                                    <div className="p-1 p-lg-12 bg-white">
                                        <div className={`${showDescrip ? styles.showDescription : styles.hiddenDescription} ${styles.descriptionImage} mb-3 mt-4`}>
                                            <div className="mt-2"
                                            dangerouslySetInnerHTML={{ __html: product.description }} />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button
                                            className="btn btn-dark rounded-pill fw-bold w-25 py-2" onClick={()=>setShowDescrip(!showDescrip)}> {showDescrip ? 'Đóng lại' : 'Xem thêm'}</button>
                                        </div>
                                    </div>
                                </div>
                                {/**Đánh giá */}
                                <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                                    <div className="p-4 p-lg-5 bg-white">
                                        <div className="row">
                                            <div className="col-lg-12 mb-4 overflow-auto" style={{height:'50vh'}}>
                                                <div className="d-flex mb-5" >
                                                    <div className="flex-shrink-0 w-25"><img className="rounded-2 w-50" src={`img/customer-1.png`} alt=""/></div>
                                                    <div className="ms-3 flex-shrink-1">
                                                        <h6 className="mb-0 text-uppercase">Jason Doe</h6>
                                                        <p className="small text-muted mb-0 text-uppercase">20 May 2020</p>
                                                        <p className="text-sm mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex mb-5" >
                                                    <div className="flex-shrink-0 w-25"><img className="rounded-2 w-50" src={`img/customer-1.png`} alt=""/></div>
                                                    <div className="ms-3 flex-shrink-1">
                                                        <h6 className="mb-0 text-uppercase">Jason Doe</h6>
                                                        <p className="small text-muted mb-0 text-uppercase">20 May 2020</p>
                                                        <p className="text-sm mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex mb-5" >
                                                    <div className="flex-shrink-0 w-25"><img className="rounded-2 w-50" src={`img/customer-1.png`} alt=""/></div>
                                                    <div className="ms-3 flex-shrink-1">
                                                        <h6 className="mb-0 text-uppercase">Jason Doe</h6>
                                                        <p className="small text-muted mb-0 text-uppercase">20 May 2020</p>
                                                        <p className="text-sm mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                    </div>
                                                </div>
                                            
                                            </div>
                                            <FormComment />
                                        </div>
                                    </div>
                                </div>
                                {/**end Đánh giá */}
                            </div>
                        </div>
                        <div className="col-lg-5 col-sm-12 pe-4 mb-4 mt-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Các bình luận hỏi đáp</h5>
                                    <hr/>
                                    <div className="row">
                                        <div className="mb-3">
                                        <FormComment />
                                        </div>
                                        <div className="col-lg-12 mb-4 overflow-auto" style={{height:'50vh'}}>
                                            <div className="d-flex mb-5" >
                                                <div className="flex-shrink-0 w-25"><img className="rounded-2 w-50" src={`img/customer-1.png`} alt=""/></div>
                                                <div className="ms-3 flex-shrink-1">
                                                    <h6 className="mb-0 text-uppercase">Jason Doe</h6>
                                                    <p className="small text-muted mb-0 text-uppercase">20 May 2020</p>
                                                    <p className="text-sm mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                            </div>
                                            <div className="d-flex mb-5" >
                                                <div className="flex-shrink-0 w-25"><img className="rounded-2 w-50" src={`img/customer-1.png`} alt=""/></div>
                                                <div className="ms-3 flex-shrink-1">
                                                    <h6 className="mb-0 text-uppercase">Jason Doe</h6>
                                                    <p className="small text-muted mb-0 text-uppercase">20 May 2020</p>
                                                    <p className="text-sm mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                            </div>
                                            <div className="d-flex mb-5" >
                                                <div className="flex-shrink-0 w-25"><img className="rounded-2 w-50" src={`img/customer-1.png`} alt=""/></div>
                                                <div className="ms-3 flex-shrink-1">
                                                    <h6 className="mb-0 text-uppercase">Jason Doe</h6>
                                                    <p className="small text-muted mb-0 text-uppercase">20 May 2020</p>
                                                    <p className="text-sm mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                            </div>
                                        
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    {/* <!-- RELATED PRODUCTS--> */}
                    <h2 className="h5 text-uppercase mb-4">Sản phẩm liên quan</h2>
                    <div className="row">
                        <CarouselCard products={products}/>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default DetailProduct;