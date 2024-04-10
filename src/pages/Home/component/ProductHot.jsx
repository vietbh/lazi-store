import React, { useEffect, useState } from 'react';
import CarouselCard from '@/components/CarouselCard';
import * as getProducts  from "@/apiServices/getProducts";
import styles from '../styles.module.css';

function ProductHot() {
    const [productsHot,setProductsHot] = useState([]);
    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const productHot = await getProducts.fetchHotProduct();
                setProductsHot(productHot);
            } catch(error) {
                console.log(error);        
            }
        }
        fetchData();
    },[]);

    const titleProduct = ()=> {
        return(
            <React.Fragment>
                <div className="row mb-2 px-0 mx-0 mt-4">
                    <div className="col-lg-6 col-md-6">
                        <div className="d-flex justify-content-center">
                                <img className="" width="350" src='https://cdn2.cellphones.com.vn/x/media/catalog/product/h/o/hotsale-gia-soc-20-03-gif.gif'/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <h2 className="fw-bold text-light">Kết thúc sau: <span>12:50:60</span></h2>
                    </div>
                </div>
            </React.Fragment>
        )
    };

    return (
        <React.Fragment>
            {productsHot.length >= 4 && (
                <section className="py-5">
                    <header className=" py-4">
                        <div className="mb-2">
                            <p className="small text-muted small text-uppercase mb-1">Sản phẩm thuộc</p>
                            <h2 className="text-uppercase mb-4">Top sản phẩm hot</h2>
                        </div>
                    </header>
                    <div className="row">
                        {/*<!-- PRODUCT-->*/}
                        <CarouselCard products={productsHot} className={`bg-danger ${styles.borderImageProduct}`} Title={titleProduct}/>
                    </div>
                </section>
            )}
        </React.Fragment>
    );
}

export default ProductHot;