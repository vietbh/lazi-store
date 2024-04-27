import React, { useEffect, useState } from 'react';
import CarouselCard from '@/components/CarouselCard';
import * as getProducts  from "@/apiServices/getProducts";

function ProductAudio() {
    const [productsAudio,setProductsAudio] = useState([]);
    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const productAudio = await getProducts.fetchAudioProduct();
                setProductsAudio(productAudio.data);
            } catch(error) {
                console.log(error);        
            }
        }
        fetchData();
    },[]);

    return (
        <React.Fragment>
            {productsAudio.length >= 4 && (
                <section className="py-5">
                    <header>
                        <p className="small text-muted small text-uppercase mb-1">Sản phẩm thuộc</p>
                        <h2 className="text-uppercase mb-4">Danh mục Âm thanh</h2>
                    </header>
                    <div className="row">
                        {/*<!-- PRODUCT-->*/}
                        <div className="d-flex justify-content-end mb-2"><a href={'danh-muc/am-thanh.html'}>Xem toàn bộ</a></div>
                        <CarouselCard products={productsAudio}/>
                    </div>
                </section>
            )}
        </React.Fragment>
    );
}

export default ProductAudio;