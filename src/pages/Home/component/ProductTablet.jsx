import React, { useEffect, useState } from 'react';
import * as getProducts  from "@/apiServices/getProducts";
import { numberFormat } from '@/components/NumberFormat';
import styles from '../styles.module.css';

function ProductTablet() {
    const [productsTablet,setProductsTablet] = useState([]);

    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const productTablet = await getProducts.fetchTabletProduct();
                setProductsTablet(productTablet.data);
            } catch(error) {
                console.log(error);        
            }
        }
        fetchData();
    },[]);
    const productTablet = productsTablet.map(product=>{
        return(
            <div key={product.id} className={`col-lg-3 col-sm-6`}>
            <div className={`product text-start bg-light  mb-3 ${styles.borderProduct} ${styles.paddingImageProduct}`}>
              <div className="position-relative mb-3">
                {product.product.product_type == 'hot' &&(
                  <div className="badge text-white bg-danger">Hot</div>
                ) }
                <a className="d-block" to={"/cua-hang/"+product.product.slug}><img className={`img-fluid ${styles.borderImageProduct}`} loading="lazy" src={product.image_url} data-src={product.image_url} alt={product.image_url}/></a>
                <div className="product-overlay">
                    <ul className="mb-0 list-inline">
                      {/*!hasLogin ? <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href={"dang-nhap.html"}><i className="fa fa-cart-plus"></i> Thêm vào giỏ</a></li>
                : <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href={"/"+URL_PATH+"/cua-hang/"+product.product.slug+'.html'}><i className="fa fa-cart-plus"></i> Thêm vào giỏ </a></li>*/}
                    </ul>
                </div>
              </div>
              <h6 className="mb-4 mt-2 fs-6 text-break fw-bolder text-truncate"><a className="reset-anchor text-center" href={"/cua-hang/"+product.product.slug+'.html'}>{product.product.name}</a></h6>
              <div key={product.id} className="d-flex align-items-center">
                <p className="fw-bold m-1 text-danger">{numberFormat(product.price_sale)}<span className="text-small">đ</span></p>
                <p className="m-1 text-secondary text-decoration-line-through" style={{fontSize:'13px'}}>{numberFormat(product.price)}<span className="text-small">đ</span></p>
              </div>
              <div className="d-flex align-items-center justify-content-around ">
                <h6 className="mb-0 fs-6 me-5 ">5<span className="text-warning">sao</span></h6>
                <h6 className="mb-0 fs-6 ms-3 fw-normal"> Yêu thích</h6>
              </div>
            </div>
          </div>
        )
    });

    return (
        <React.Fragment>
            {productsTablet.length >= 4 && (
                <section className="py-5">
                    <header>
                        <p className="small text-muted small text-uppercase mb-1">Sản phẩm thuộc</p>
                        <h2 className="text-uppercase mb-4">Tablet</h2>
                    </header>
                    <div className="row">
                        <div className="d-flex justify-content-end mb-2"><a href={'danh-muc/'+'tablet.html'}>Xem toàn bộ</a></div>
                        {/*<!-- PRODUCT-->*/}
                        {productTablet}
                    </div>
                </section>
            )}
        </React.Fragment>
    );
}

export default ProductTablet;