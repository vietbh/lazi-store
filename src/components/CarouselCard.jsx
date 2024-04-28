import { Carousel } from 'primereact/carousel';
import styles from '@/pages/Home/styles.module.css'
import { numberFormat } from './NumberFormat';
import React from 'react';
import PropTypes from 'prop-types';

function CarouselCard({
    products = [],
    className='',
    Title=()=>{}}) {
    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 4,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    const productTemplate = (product) => {
        return (
            <React.Fragment>
                <div className={`ms-2 product text-start bg-light mb-3 ${styles.borderProduct} ${styles.paddingImageProduct}`} style={{width:"283px"}}>
                    <div className="position-relative mb-3">
                        { product.product.product_type_hot != null && product.product.product_type_hot == 1 && (
                            <div className="badge text-white bg-danger">Hot</div>
                        )}
                        <a href={"/chi-tiet-san-pham/"+product.product.slug+'.html'}><img className={`img-fluid ${styles.borderImageProduct}`} 
                          loading="lazy" src={product.image_url} data-src={product.image_url} alt={product.image_url}/></a>
                        {/*
                        <div className="product-overlay">
                            <ul className="mb-0 list-inline">
                            !hasLogin ? <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href={"dang-nhap.html"}><i className="fa fa-cart-plus"></i> Thêm vào giỏ</a></li>
                        : <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href={"/"+URL_PATH+"/chi-tiet-san-pham/"+product.product.slug+'.html'}><i className="fa fa-cart-plus"></i> Thêm vào giỏ </a></li>
                        </ul>
                        </div>
                         */}
                    </div>
                    <h6 className="mb-4 mt-2 fs-6 text-break fw-bolder text-truncate"><a className="reset-anchor text-center" href={"/chi-tiet-san-pham/"+product.product.slug+'.html'}>{product.product.name}</a></h6>
                    <div className="d-flex align-items-center">
                        <p className="fw-bold m-1 text-danger">{numberFormat(product.price_sale)}<span className="text-small">đ</span></p>
                        <p className="m-1 text-secondary text-decoration-line-through text-truncate" style={{fontSize:'13px'}}>{numberFormat(product.price)}<span className="text-small">đ</span></p>
                    </div>
                    <div className="d-flex align-items-center justify-content-end ">
                        <h6 className="mb-0 fs-6 me-5 d-none"><span className="text-warning">5<i className="far fa-star"></i></span></h6>
                        <h6 className="mb-0 fs-6 me-5 fw-normal"><i className="far fa-heart text-danger"></i></h6>
                    </div>
                </div>
            </React.Fragment>
        );
    };
    return (
        <div className={`container px-0 ${className}`}>
            <Title/>
            <div className="pt-2 px-0 mx-0">
                <Carousel value={products} numScroll={2} numVisible={4}
                className="container px-0 mx-0" circular autoplayInterval={3000}
                nextIcon={<button className='btn btn-white text-secondary rounded-3 pe-2'><i className="fas fa-chevron-right"></i></button>}
                prevIcon={<button className='btn btn-white text-secondary rounded-3 ps-2 '><i className="fas fa-chevron-left"></i></button>}
                responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
            </div>
        </div>
        
    )
}
CarouselCard.propTypes = {
    products: PropTypes.array,
    className: PropTypes.string,
    Title:PropTypes.func
};

export default CarouselCard;
