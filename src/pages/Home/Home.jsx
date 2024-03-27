/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import styles from './styles.module.css';
import URL_PATH from "../../config/UrlPath";
import HTML_DOT from "../../config/PageHtml";
import * as getCategory from "../../apiServices/getCategory";
import * as getProducts  from "../../apiServices/getProducts";
import CarouselCard from "../../components/CarouselCard";
import MegaMenu from "../../components/MegaMenu";
import ToastMenu from "../../components/ToastMenu";

function Home(){
    const [categories,setCategories] = useState([]);
    const [productsHot,setProductsHot] = useState([]);
    const [productsNew,setProductsNew] = useState([]);
    const [productsLaptop,setProductsLaptop] = useState([]);
    const [productsPC,setProductsPC] = useState([]);
    const [productsWatch,setProductsWatch] = useState([]);
    // const [productsAudio,setProductsAudio] = useState([]);
    const [productsTablet,setProductsTablet] = useState([]);
    const [loading,setLoading] = useState(true);
    const [show,setShow] = useState(false);
    const hasLogin = sessionStorage.getItem("hasLogin");   
    useEffect(()=>{
        const fetchData = async () =>{
            try {
                setLoading(true);
                const result = await getCategory.fetchData();
                setCategories(result);
                const productHot = await getProducts.fetchHotProduct();
                setProductsHot(productHot);
                const productNew = await getProducts.fetchNewProduct();
                setProductsNew(productNew);
                const productLaptop = await getProducts.fetchLaptopProduct();
                setProductsLaptop(productLaptop.data);
                const productPC = await getProducts.fetchPCProduct();
                setProductsPC(productPC.data);
                const productTablet = await getProducts.fetchTabletProduct();
                setProductsTablet(productTablet.data);
                const productWatch = await getProducts.fetchWatchProduct();
                setProductsWatch(productWatch.data);
                setLoading(false);
            } catch(error) {
                setLoading(true)
                setCategories([])
                setProductsHot([])
                setProductsLaptop([])
                setProductsPC([])
                setProductsTablet([])
                setProductsWatch([])
            }
        }
        if(loading && categories.length == 0){
            fetchData();
            setLoading(false)
        } 
    },[]);    
    // const category = categories.map(category=>{
    //     return(
    //         <div key={category.id} className="col-sm-12 col-xl-2 mb-4 " style={{width:262,minHeight:75,maxHeight:80}}>
    //             <a href={'/'+URL_PATH+'/danh-muc/'+category.slug+HTML_DOT}>
    //                 <button className="text-start rounded-3 btn btn-light w-100 h-100 " >
    //                     <p className="m-1 overflow-hidden">{category.name}</p>
    //                 </button>
    //             </a>
    //         </div>   
    //     )
    // }
    // );
    const handleMouseEnter = () => {
        setShow(true);
      };
    
    const handleMouseLeave = () => {
    setShow(false);
    };
    
    const mainCategory = categories.map((category) => {
        if(category.parent_category_id === null)
        return(
            <div key={category.id} className={`mb-1`} href={category.slug} target="_self" 
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
            >
                <div className="text-start row border rounded-3 p-1">
                    <div className="col-sm-6 text-start p-1">
                        <a href={"danh-muc/"+category.slug+HTML_DOT} target="_self" >
                            <span className="text-dark fw-medium">{category.name}</span>
                        </a>
                    </div>
                    <div className="col-sm-6 text-end p-0">
                        <span><svg fill="#000000" height="30px" width="30px" version="1.1" id="XMLID_287_" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" viewBox="-5.52 -5.52 35.04 35.04" xmlSpace="preserve" stroke="#000000" strokeWidth="1.008" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="3.408"> <g id="next"> <g> <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12 "></polygon> </g> </g> </g><g id="SVGRepo_iconCarrier"> <g id="next"> <g> <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12 "></polygon> </g> </g> </g></svg> </span>
                    </div>
                </div>
                <MegaMenu showModal={show}/>
                <ToastMenu/>
            </div>
        );
    })

    // const productNew = productsNew.map(product=>{
    //     return(
    //         <div key={product.id} className={`col-lg-3 col-sm-6`}>
    //         <div className={`product text-start bg-light  mb-3 ${styles.borderProduct} ${styles.paddingImageProduct}`}>
    //           <div className="position-relative mb-3">
    //             {product.product.product_type == 'hot' &&(
    //               <div className="badge text-white bg-danger">Hot</div>
    //             ) }
    //             <a className="d-block" to={product.product.slug}><img className={`img-fluid ${styles.borderImageProduct}`} loading="lazy" src={product.image_url} data-src={product.image_url} alt={product.image_url}/></a>
    //             <div className="product-overlay">
    //                 <ul className="mb-0 list-inline">
    //                   {!hasLogin ? <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href={"dang-nhap.html"}><i className="fa fa-cart-plus"></i> Thêm vào giỏ</a></li>
    //                   : <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href={"/"+URL_PATH+"/cua-hang/"+product.product.slug+'.html'}><i className="fa fa-cart-plus"></i> Thêm vào giỏ </a></li>}
    //                 </ul>
    //             </div>
    //           </div>
    //           <h6 className="mb-4 mt-2 fs-6 text-break fw-bolder text-truncate"><a className="reset-anchor text-center" href={"/"+URL_PATH+"/cua-hang/"+product.product.slug+'.html'}>{product.product.name}</a></h6>
    //           <div key={product.id} className="d-flex align-items-center">
    //             <p className="fw-bold m-1 text-danger">{parseInt(product.price_sale).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}<span className="text-small">đ</span></p>
    //             <p className="m-1 text-secondary text-decoration-line-through" style={{fontSize:'13px'}}>{parseInt(product.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}<span className="text-small">đ</span></p>
    //           </div>
    //           <div className="d-flex align-items-center justify-content-around ">
    //             <h6 className="mb-0 fs-6 me-5 ">5<span className="text-warning">sao</span></h6>
    //             <h6 className="mb-0 fs-6 ms-3 fw-normal"> Yêu thích</h6>
    //           </div>
    //         </div>
    //       </div>
    //     )
    // });

    const productTablet = productsTablet.map(product=>{
        return(
            <div key={product.id} className={`col-lg-3 col-sm-6`}>
            <div className={`product text-start bg-light  mb-3 ${styles.borderProduct} ${styles.paddingImageProduct}`}>
              <div className="position-relative mb-3">
                {product.product.product_type == 'hot' &&(
                  <div className="badge text-white bg-danger">Hot</div>
                ) }
                <a className="d-block" to={product.product.slug}><img className={`img-fluid ${styles.borderImageProduct}`} loading="lazy" src={product.image_url} data-src={product.image_url} alt={product.image_url}/></a>
                <div className="product-overlay">
                    <ul className="mb-0 list-inline">
                      {!hasLogin ? <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href={"dang-nhap.html"}><i className="fa fa-cart-plus"></i> Thêm vào giỏ</a></li>
                      : <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href={"/"+URL_PATH+"/cua-hang/"+product.product.slug+'.html'}><i className="fa fa-cart-plus"></i> Thêm vào giỏ </a></li>}
                    </ul>
                </div>
              </div>
              <h6 className="mb-4 mt-2 fs-6 text-break fw-bolder text-truncate"><a className="reset-anchor text-center" href={"/"+URL_PATH+"/cua-hang/"+product.product.slug+'.html'}>{product.product.name}</a></h6>
              <div key={product.id} className="d-flex align-items-center">
                <p className="fw-bold m-1 text-danger">{parseInt(product.price_sale).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}<span className="text-small">đ</span></p>
                <p className="m-1 text-secondary text-decoration-line-through" style={{fontSize:'13px'}}>{parseInt(product.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}<span className="text-small">đ</span></p>
              </div>
              <div className="d-flex align-items-center justify-content-around ">
                <h6 className="mb-0 fs-6 me-5 ">5<span className="text-warning">sao</span></h6>
                <h6 className="mb-0 fs-6 ms-3 fw-normal"> Yêu thích</h6>
              </div>
            </div>
          </div>
        )
    });
    const productLaptop = productsLaptop.map(product=>{
        return(
            <div key={product.id} className={`col-lg-3 col-sm-6`}>
            <div className={`product text-start bg-light  mb-3 ${styles.borderProduct} ${styles.paddingImageProduct}`}>
              <div className="position-relative mb-3">
                {product.product.product_type == 'hot' &&(
                  <div className="badge text-white bg-danger">Hot</div>
                ) }
                <a className="d-block" to={product.product.slug}><img className={`img-fluid ${styles.borderImageProduct}`} loading="lazy" src={product.image_url} data-src={product.image_url} alt={product.image_url}/></a>
                <div className="product-overlay">
                    <ul className="mb-0 list-inline">
                      {!hasLogin ? <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href={"dang-nhap.html"}><i className="fa fa-cart-plus"></i> Thêm vào giỏ</a></li>
                      : <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href={"/"+URL_PATH+"/cua-hang/"+product.product.slug+'.html'}><i className="fa fa-cart-plus"></i> Thêm vào giỏ </a></li>}
                    </ul>
                </div>
              </div>
              <h6 className="mb-4 mt-2 fs-6 text-break fw-bolder text-truncate"><a className="reset-anchor text-center" href={"/"+URL_PATH+"/cua-hang/"+product.product.slug+'.html'}>{product.product.name}</a></h6>
              <div key={product.id} className="d-flex align-items-center">
                <p className="fw-bold m-1 text-danger">{parseInt(product.price_sale).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}<span className="text-small">đ</span></p>
                <p className="m-1 text-secondary text-decoration-line-through" style={{fontSize:'13px'}}>{parseInt(product.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}<span className="text-small">đ</span></p>
              </div>
              <div className="d-flex align-items-center justify-content-around ">
                <h6 className="mb-0 fs-6 me-5 ">5<span className="text-warning">sao</span></h6>
                <h6 className="mb-0 fs-6 ms-3 fw-normal"> Yêu thích</h6>
              </div>
            </div>
          </div>
        )
    });
    const productPC = productsPC.map(product=>{
        return(
            <div key={product.id} className={`col-lg-3 col-sm-6`}>
            <div className={`product text-start bg-light  mb-3 ${styles.borderProduct} ${styles.paddingImageProduct}`}>
              <div className="position-relative mb-3">
                {product.product.product_type == 'hot' &&(
                  <div className="badge text-white bg-danger">Hot</div>
                ) }
                <a className="d-block" to={product.product.slug}><img className={`img-fluid ${styles.borderImageProduct}`} loading="lazy" src={product.image_url} data-src={product.image_url} alt={product.image_url}/></a>
                <div className="product-overlay">
                    <ul className="mb-0 list-inline">
                      {!hasLogin ? <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href={"dang-nhap.html"}><i className="fa fa-cart-plus"></i> Thêm vào giỏ</a></li>
                      : <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href={"/"+URL_PATH+"/cua-hang/"+product.product.slug+'.html'}><i className="fa fa-cart-plus"></i> Thêm vào giỏ </a></li>}
                    </ul>
                </div>
              </div>
              <h6 className="mb-4 mt-2 fs-6 text-break fw-bolder text-truncate"><a className="reset-anchor text-center" href={"/"+URL_PATH+"/cua-hang/"+product.product.slug+'.html'}>{product.product.name}</a></h6>
              <div key={product.id} className="d-flex align-items-center">
                <p className="fw-bold m-1 text-danger">{parseInt(product.price_sale).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}<span className="text-small">đ</span></p>
                <p className="m-1 text-secondary text-decoration-line-through" style={{fontSize:'13px'}}>{parseInt(product.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}<span className="text-small">đ</span></p>
              </div>
              <div className="d-flex align-items-center justify-content-around ">
                <h6 className="mb-0 fs-6 me-5 ">5<span className="text-warning">sao</span></h6>
                <h6 className="mb-0 fs-6 ms-3 fw-normal"> Yêu thích</h6>
              </div>
            </div>
          </div>
        )
    });
    // const productAudio = productsAudio.map(product=>{
    //     return(
    //         <div key={product.id} className={`col-lg-3 col-sm-6`}>
    //         <div className={`product text-start bg-light  mb-3 ${styles.borderProduct} ${styles.paddingImageProduct}`}>
    //           <div className="position-relative mb-3">
    //             {product.product.product_type == 'hot' &&(
    //               <div className="badge text-white bg-danger">Hot</div>
    //             ) }
    //             <a className="d-block" to={product.product.slug}><img className={`img-fluid ${styles.borderImageProduct}`} loading="lazy" src={product.image_url} data-src={product.image_url} alt={product.image_url}/></a>
    //             <div className="product-overlay">
    //                 <ul className="mb-0 list-inline">
    //                   {!hasLogin ? <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href={"dang-nhap.html"}><i className="fa fa-cart-plus"></i> Thêm vào giỏ</a></li>
    //                   : <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href={"/"+URL_PATH+"/cua-hang/"+product.product.slug+'.html'}><i className="fa fa-cart-plus"></i> Thêm vào giỏ </a></li>}
    //                 </ul>
    //             </div>
    //           </div>
    //           <h6 className="mb-4 mt-2 fs-6 text-break fw-bolder text-truncate"><a className="reset-anchor text-center" href={"/"+URL_PATH+"/cua-hang/"+product.product.slug+'.html'}>{product.product.name}</a></h6>
    //           <div key={product.id} className="d-flex align-items-center">
    //             <p className="fw-bold m-1 text-danger">{parseInt(product.price_sale).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}<span className="text-small">đ</span></p>
    //             <p className="m-1 text-secondary text-decoration-line-through" style={{fontSize:'13px'}}>{parseInt(product.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}<span className="text-small">đ</span></p>
    //           </div>
    //           <div className="d-flex align-items-center justify-content-around ">
    //             <h6 className="mb-0 fs-6 me-5 ">5<span className="text-warning">sao</span></h6>
    //             <h6 className="mb-0 fs-6 ms-3 fw-normal"> Yêu thích</h6>
    //           </div>
    //         </div>
    //       </div>
    //     )
    // });

    return(
        <section>
        {/* <!-- HERO SECTION-->*/}
            <div className="container">
                <div className="row">
                    <div className="col-md-2 col-lg-2" id="danh-muc">
                        <section>
                            {mainCategory}
                        {/*
                        <MegaMenu key={value.id} id={value.id} name={value.name}/>
                         */}
                        </section>
                    </div>
                    <div className="col-md-10 col-lg-10">
                        <section className={`hero pb-3 bg-cover bg-center d-flex align-items-center ${styles.bannerStyle}`}>
                            <div className="container py-5">
                                <div className="row px-4 px-lg-5">
                                    <div className="col-lg-6">
                                        <p className="text-muted small text-uppercase mb-2">New Inspiration 2020</p>
                                        <h1 className="h2 text-uppercase mb-3">20% off on new season</h1><a className="btn btn-dark rounded-3" href="shop.html">Xem ngay những sản phẩm mới</a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                
                {/*<!-- CATEGORIES ALL SECTION-->
                <section className="pt-5">
                    <header className="text-start">
                        <p className="small text-muted small text-uppercase mb-1">Dưới đây là danh mục sản phẩm của chúng tôi</p>
                        <h2 className="h5 text-uppercase mb-4">Tìm hiểu danh mục sau đây</h2>
                    </header>
                    <div className="row">
                        {category}
                    </div>
                </section>
                */}
                {/*<!-- CATEGORIES SECTION-->*/}
                <section className="pt-5">
                    <header className="text-center">
                        <p className="small text-muted small text-uppercase mb-1">Dưới đây là danh mục sản phẩm của chúng tôi</p>
                        <h2 className="h5 text-uppercase mb-4">Tìm hiểu danh mục sau đây</h2>
                    </header>
                    <div className="row">
                        <div className="col-md-4"><a className={`category-item ${styles.heightImageProduct}`} href="shop.html"><img className={`img-fluid ${styles.categoryBorderStyle}`}  src="img/banner_1.jpg" alt="banner_1.jpg" /><strong className="category-item-title rounded-3">MacBook</strong></a>
                        </div>
                        <div className="col-md-4"><a className="category-item mb-4" href="shop.html"><img className={`img-fluid ${styles.categoryBorderStyle}`} src="img/banner_2.jfif" alt="banner_2.jfif" /><strong className="category-item-title rounded-3">Ipad</strong></a><a className="category-item" href="shop.html"><img className={`img-fluid ${styles.categoryBorderStyle}`} src="img/banner_3.jpg" alt="" /><strong className="category-item-title rounded-3">Apple Watch</strong></a>
                        </div>
                        <div className="col-md-4"><a className={`category-item ${styles.heightImageProduct}`} href="shop.html"><img className={`img-fluid ${styles.categoryBorderStyle}`} src="img/banner_4.jpg" alt="banner_4.jpg" /><strong className="category-item-title rounded-3">Iphone</strong></a>
                        </div>
                    </div>
                </section>
                {/*<!-- NEW PRODUCTS-->*/}
                <section className="py-5">
                    <header>
                        <p className="small text-muted small text-uppercase mb-1">Made the hard way</p>
                        <h2 className="h5 text-uppercase mb-4">Top sản phẩm hot</h2>
                    </header>
                    <div className="row">
                        {/*<!-- PRODUCT-->*/}
                        <CarouselCard products={productsHot} className={`bg-danger ${styles.borderImageProduct}`}
                        title={`
                            <div class="row mt-4">
                                <div class="col-lg-6 col-md-6">
                                    <div class="d-flex justify-content-center">
                                            <img class="" width="350" src='https://cdn2.cellphones.com.vn/x/media/catalog/product/h/o/hotsale-gia-soc-20-03-gif.gif'/>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <h2 class="fw-bold text-light">Kết thúc sau: <span>12:50:60</span></h2>
                                </div>
                            </div>
                        `}/>
                    </div>
                </section>
                {/*<!-- HOT PRODUCTS-->*/}
                <section className="py-5">
                    <header>
                        <p className="small text-muted small text-uppercase mb-1">Made the hard way</p>
                        <h2 className="h5 text-uppercase mb-4">Sản phẩm mới</h2>
                    </header>
                    <div className="row">
                        {/*<!-- PRODUCT-->*/}
                        <CarouselCard products={productsNew}/>
                    </div>
                </section>
                {/*<!-- Tablet PRODUCTS-->*/}
                <section className="py-5">
                    <header>
                        <p className="small text-muted small text-uppercase mb-1">Made the hard way</p>
                        <h2 className="h5 text-uppercase mb-4">Tablet</h2>
                    </header>
                    <div className="row">
                        {/*<!-- PRODUCT-->*/}
                        {productTablet}
                    </div>
                </section>
                {/*<!-- Laptop PRODUCTS-->*/}
                <section className="py-5">
                    <header>
                        <p className="small text-muted small text-uppercase mb-1">Made the hard way</p>
                        <h2 className="h5 text-uppercase mb-4">Danh mục Laptop</h2>
                    </header>
                    <div className="row">
                        {/*<!-- PRODUCT-->*/}
                        {productLaptop}
                    </div>
                </section>
                {/*<!-- PC PRODUCTS-->*/}
                <section className="py-5">
                    <header>
                        <p className="small text-muted small text-uppercase mb-1">Made the hard way</p>
                        <h2 className="h5 text-uppercase mb-4">Danh mục PC</h2>
                    </header>
                    <div className="row">
                        {/*<!-- PRODUCT-->*/}
                        {productPC}
                    </div>
                </section>
                {/*<!-- Watch PRODUCTS-->*/}
                <section className="py-5">
                    <header>
                        <p className="small text-muted small text-uppercase mb-1">Made the hard way</p>
                        <h2 className="h5 text-uppercase mb-4">Danh mục Đồng hồ</h2>
                    </header>
                    <div className="row">
                        {/*<!-- PRODUCT-->*/}
                        <CarouselCard products={productsWatch}/>
                    </div>
                </section>
                {/*<!-- Audio PRODUCTS-->*/}
                <section className="py-5">
                    <header>
                        <p className="small text-muted small text-uppercase mb-1">Made the hard way</p>
                        <h2 className="h5 text-uppercase mb-4">Danh mục Âm thanh</h2>
                    </header>
                    <div className="row">
                        {/*<!-- PRODUCT-->*/}
                        {/*productAudio*/}
                    </div>
                </section>
                {/*<!-- SERVICES-->*/}
                <section className="py-5 bg-light">
                <div className="container">
                    <div className="row text-center gy-3">
                    <div className="col-lg-4">
                        <div className="d-inline-block">
                        <div className="d-flex align-items-end">
                            <svg className="svg-icon svg-icon-big svg-icon-light">
                                <use xlinkHref="#delivery-time-1"> </use>
                            </svg>
                            <div className="text-start ms-3">
                            <h6 className="text-uppercase mb-1">Free shipping</h6>
                            <p className="text-sm mb-0 text-muted">Free shipping worldwide</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="d-inline-block">
                        <div className="d-flex align-items-end">
                            <svg className="svg-icon svg-icon-big svg-icon-light">
                                <use xlinkHref="#helpline-24h-1"></use>
                            </svg>
                            <div className="text-start ms-3">
                            <h6 className="text-uppercase mb-1">24 x 7 service</h6>
                            <p className="text-sm mb-0 text-muted">Free shipping worldwide</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="d-inline-block">
                        <div className="d-flex align-items-end">
                            <svg className="svg-icon svg-icon-big svg-icon-light">
                                <use xlinkHref="#label-tag-1"> </use>
                            </svg>
                            <div className="text-start ms-3">
                            <h6 className="text-uppercase mb-1">Festivaloffers</h6>
                            <p className="text-sm mb-0 text-muted">Free shipping worldwide</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
                {/*<!-- NEWSLETTER-->*/}
                <section className="py-5">
                    <div className="container p-0">
                        <div className="row gy-3">
                        <div className="col-lg-6">
                            <h5 className="text-uppercase">{`Let's be friends !`}</h5>
                            <p className="text-sm text-muted mb-0">{`Nisi nisi tempor consequat laboris nisi.`}</p>
                        </div>
                        <div className="col-lg-6">
                            <form action="#">
                            <div className="input-group">
                                <input onChange={()=>{}}  className="form-control form-control-lg" type="email" placeholder="Enter your email address" aria-describedby="button-addon2"/>
                                <button className="btn btn-dark" id="button-addon2" type="submit">{`Subscribe`}</button>
                            </div>
                            </form>
                        </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
}

export default Home;