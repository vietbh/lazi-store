import React, { useEffect, useState } from 'react';
import CarouselCard from '@/components/CarouselCard';
import * as getProducts  from "@/apiServices/getProducts";

function ProductPC() {
    const [productsPC,setProductsPC] = useState([]);
    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const productPC = await getProducts.fetchPCProduct();
                console.log(productPC);
                setProductsPC(productPC.data?productPC.data:[]);
            } catch(error) {
                console.log(error);        
            }
        }
        fetchData();
    },[]);

    return (
        <React.Fragment>
            {productsPC.length >= 4 && (
                <section className="py-5">
                    <header>
                        <p className="small text-muted small text-uppercase mb-1">Sản phẩm thuộc</p>
                        <h2 className="text-uppercase mb-4">Danh mục PC</h2>
                    </header>
                    <div className="row">
                        <div className="d-flex justify-content-end mb-2"><a href={'danh-muc/pc.html'}>Xem toàn bộ</a></div>
                        {/*<!-- PRODUCT-->*/}
                        { <CarouselCard products={productsPC}/>}
                    </div>
                </section>
            )}
        </React.Fragment>
    );
}

export default ProductPC;