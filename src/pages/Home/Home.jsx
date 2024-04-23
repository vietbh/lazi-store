import React, { useEffect, useState } from "react";
import HTML_DOT from "@/config/PageHtml";
import * as getCategory from "@/apiServices/getCategory";
import CarouselBanner from "@/components/CarouselBanner";
import ProductHot from "./component/ProductHot";
import ProductNew from "./component/ProductNew";
import ProductLaptop from "./component/ProductLaptop";
import ProductPC from "./component/ProductPC";
import ProductTablet from "./component/ProductTablet";
import ProductWatch from "./component/ProductWatch";
import ProductAudio from "./component/ProductAudio";

function Home(){
    const [categories,setCategories] = useState([]);
    const [loading,setLoading] = useState(true);
    // const [show,setShow] = useState(false);
    // const hasLogin = sessionStorage.getItem("hasLogin");   
    useEffect(()=>{
        const fetchData = async () =>{
            try {
                setLoading(true);
                const result = await getCategory.fetchData();
                setCategories(result);
                
                setLoading(false);
            } catch(error) {
                console.log(error);
                setLoading(true)
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
    // const handleMouseEnter = () => {
    //     setShow(true);
    // };

    // const handleMouseLeave = () => {
    //     setShow(!show);
    // };
    const mainCategory = categories.map((category) => {
        if(category.parent_category_id === null)
        return(
            <div key={category.id} className={`mb-1`} href={category.slug} target="_self" 
                // onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
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
                {/*
                <MegaMenu visible={show} />
                 */}
            </div>
        );
    })

    return(
        <React.Fragment>
        {/* <!-- HERO SECTION-->*/}
            <div className="container">
                <div className="row">
                    <div className="col-md-2 col-lg-3" id="danh-muc">
                        <section>
                            {mainCategory}
                            {/*
                            <MegaMenu key={value.id} id={value.id} name={value.name}/>
                            */}
                        </section>
                    </div>
                    <div className="col-md-10 col-lg-9">
                        <section className={`d-flex align-items-center`}>
                            <div className="container-fluid">
                                <div className="row">
                                    <CarouselBanner />        
                                </div>
                            </div>
                        </section>
                        {/*
                        */}
                    </div>
                </div>
                
                {/*<!-- CATEGORIES ALL SECTION-->
                    <section className="pt-5">
                        <header className="text-start">
                            <p className="small text-muted small text-uppercase mb-1">Dưới đây là danh mục sản phẩm của chúng tôi</p>
                            <h2 className="text-uppercase mb-4">Tìm hiểu danh mục sau đây</h2>
                        </header>
                        <div className="row">
                            {category}
                        </div>
                    </section>
                */}
                {/*<!-- CATEGORIES SECTION-->
                <section className="pt-5">
                    <header className="text-center">
                        <p className="small text-muted small text-uppercase mb-1">Dưới đây là danh mục sản phẩm của chúng tôi</p>
                        <h2 className="text-uppercase mb-4">Tìm hiểu danh mục sau đây</h2>
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
                */}
                <section className="pt-5">
                    <header className="text-center">
                        <p className="small text-muted small text-uppercase mb-1">Dưới đây là danh mục sản phẩm của chúng tôi</p>
                        <h2 className="text-uppercase mb-4">Tìm hiểu danh mục sau đây</h2>
                    </header>
                </section>
                {/*<!-- HOT PRODUCTS-->*/}
                <ProductHot />
                {/*<!-- NEW PRODUCTS-->*/}
                <ProductNew />
                {/*<!-- Tablet PRODUCTS-->*/}
                <ProductTablet />
                {/*<!-- Laptop PRODUCTS-->*/}
                <ProductLaptop/>
                {/*<!-- PC PRODUCTS-->*/}
                <ProductPC />
                {/*<!-- Watch PRODUCTS-->*/}
                <ProductWatch />
                {/*<!-- Audio PRODUCTS-->*/}
                <ProductAudio />
                {/*<!-- SERVICES-->*/}
                {/*
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
                */}
                {/*<!-- NEWSLETTER-->*/}
                {/*
                    <section className="py-5">
                        <div className="container p-0">
                            <div className="row gy-3">
                            <div className="col-lg-6">
                                <className="text-uppercase">{`Let's be friends !`}</
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
                 */}
            </div>
        </React.Fragment>
    );
}

export default Home;