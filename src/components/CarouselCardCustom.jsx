import { Carousel } from 'primereact/carousel';
import styles from '@/pages/Home/styles.module.css'
import { numberFormat } from './NumberFormat';
import React from 'react';
import PropTypes from 'prop-types';

function CarouselCardCustom({
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
                <div className={`ms-2 product text-start bg-light mb-3 ${styles.borderProduct} ${styles.paddingImageProduct}`} style={{width:"19vw"}}>
                    <div className="position-relative mb-3">
                        { product.product_type_hot && (
                            <div className="badge text-white bg-danger">Hot</div>
                        )}
                        { product.product_type_new && (
                            <div className="badge text-white bg-success mt-2">New</div>
                        )}
                        <a href={"/chi-tiet-san-pham/"+product.slug+'.html'}><img className={` ${styles.borderImageProduct}`} 
                          loading="lazy" src={product.image_url} width={275} height={250} data-src={product.image_url} alt={product.image_url}/></a>
                    </div>
                    <h6 className="mb-4 mt-2 fs-6 text-break fw-bolder text-truncate"><a className="reset-anchor text-center" href={"/chi-tiet-san-pham/"+product.slug+'.html'}>{product.name} ({product.color_type})</a></h6>
                    <div className="d-flex align-items-center">
                        <p className="fw-bold m-1 text-danger">{numberFormat(product.price_sale != 0 ? product.price_sale : product.price)}<span className="text-small">đ</span></p>
                        {product.price_sale != 0 && (
                            <p className="m-1 text-secondary text-decoration-line-through text-truncate" style={{fontSize:'13px'}}>{numberFormat(product.price)}<span className="text-small">đ</span></p>
                        )}
                    </div>
                    {/**
                    <div className="d-flex align-items-center justify-content-end ">
                        <h6 className="mb-0 fs-6 me-5 d-none"><span className="text-warning">5<i className="far fa-star"></i></span></h6>
                        <h6 className="mb-0 fs-6 me-5 fw-normal"><i className="far fa-heart text-danger"></i></h6>
                    </div>
                     */}
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
CarouselCardCustom.propTypes = {
    products: PropTypes.array,
    className: PropTypes.string,
    Title:PropTypes.func
};

export default CarouselCardCustom;
