import React, { useEffect, useState } from 'react';
import CarouselCard from '@/components/CarouselCard';
import * as getProducts  from "@/apiServices/getProducts";

function ProductNew() {
    const [productsNew,setProductsNew] = useState([]);
    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const productNew = await getProducts.fetchNewProduct();
                setProductsNew(productNew);
            } catch(error) {
                console.log(error);        
            }
        }
        fetchData();
    },[]);

    return (
        <React.Fragment>
            {productsNew.length >= 4 && (
                <section className="py-5">
                    <header>
                        <p className="small text-muted small text-uppercase mb-1">Sản phẩm thuộc</p>
                        <h2 className="text-uppercase mb-4">Sản phẩm mới</h2>
                        <div className="d-flex justify-content-end mb-2"><a href={'danh-muc/'+'san-pham-moi.html'}>Xem toàn bộ</a></div>
                    </header>
                    <div className="row">
                        {/*<!-- PRODUCT-->*/}
                        <CarouselCard products={productsNew}/>
                    </div>
                </section>
            )}
        </React.Fragment>
    );
}

export default ProductNew;