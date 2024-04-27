import React, { useEffect, useRef, useState } from 'react';
import CarouselCard from '@/components/CarouselCard';
import * as getProducts  from "@/apiServices/getProducts";
import styles from '../styles.module.css';

function ProductHot() {
    const [productsHot,setProductsHot] = useState([]);
    const [countdown, setCountdown] = useState(18000); // Đếm ngược 1 giờ (3600 giây)
    const endTimeRef = useRef(null);
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
    useEffect(() => {
        endTimeRef.current = new Date().getTime() + countdown * 1000;
      }, [countdown]);
    
    useEffect(() => {
    const interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDiff = endTimeRef.current - currentTime;
        const seconds = Math.floor(timeDiff / 1000);

        if (seconds <= 0) {
        clearInterval(interval);
        }

        setCountdown(seconds);
    }, 1000);

    return () => {
        clearInterval(interval);
    };
    }, []);

    const hours = Math.floor(countdown / 3600);
    const minutes = Math.floor((countdown % 3600) / 60);
    const seconds = countdown % 60;
    

    const titleProduct = ()=> {
        return(
            <React.Fragment>
                <div className="row mb-2 px-0 mx-0 mt-4">
                    <div className="col-lg-6 col-md-6">
                        <div className="d-flex justify-content-center">
                            <h2 className='text-uppercase text-white text-start'>
                            <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#810e0e"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.926 20.574a7.26 7.26 0 0 0 3.039 1.511c.107.035.179-.105.107-.175-2.395-2.285-1.079-4.758-.107-5.873.693-.796 1.68-2.107 1.608-3.865 0-.176.18-.317.322-.211 1.359.703 2.288 2.25 2.538 3.515.394-.386.537-.984.537-1.511 0-.176.214-.317.393-.176 1.287 1.16 3.503 5.097-.072 8.19-.071.071 0 .212.072.177a8.761 8.761 0 0 0 3.003-1.442c5.827-4.5 2.037-12.48-.43-15.116-.321-.317-.893-.106-.893.351-.036.95-.322 2.004-1.072 2.707-.572-2.39-2.478-5.105-5.195-6.441-.357-.176-.786.105-.75.492.07 3.27-2.063 5.352-3.922 8.059-1.645 2.425-2.717 6.89.822 9.808z" fill="#ce0d0d"></path></g></svg>
                            Siêu sale sản phẩm hot</h2>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <h2 className="fw-bold text-light">Kết thúc sau: <span>{hours} Giờ : {minutes} Phút : {seconds} Giây</span></h2>
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