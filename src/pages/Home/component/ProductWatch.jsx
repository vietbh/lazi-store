import React, { useEffect, useState } from 'react';
import CarouselCard from '@/components/CarouselCard';
import * as getProducts  from "@/apiServices/getProducts";

function ProductWatch() {
    const [productsWatch,setProductsWatch] = useState([]);
    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const productWatch = await getProducts.fetchWatchProduct();
                setProductsWatch(productWatch.data);
            } catch(error) {
                console.log(error);        
            }
        }
        fetchData();
    },[]);

    return (
        <React.Fragment>
            {productsWatch.length >= 4 && (
                <section className="py-5">
                    <header>
                        <p className="small text-muted small text-uppercase mb-1">Sản phẩm thuộc</p>
                        <h2 className="text-uppercase mb-4">Danh mục Đồng hồ</h2>
                    </header>
                    <div className="row">
                        <div className="d-flex justify-content-end mb-2"><a href={'danh-muc/'+'dong-ho.html'}>Xem toàn bộ</a></div>
                        {/*<!-- PRODUCT-->*/}
                        <CarouselCard products={productsWatch}/>
                    </div>
                </section>
            )}
        </React.Fragment>
    );
}

export default ProductWatch;