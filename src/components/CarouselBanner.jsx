import Carousel from 'react-bootstrap/Carousel';
import styles from '../pages/Home/styles.module.css';
import { useEffect, useState } from 'react';
import { bannerAds } from '../apiServices/bannerAds';
import Image from 'react-bootstrap/Image';

function CarouselBanner() {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    const handleGetBanner = async () => {
      try {
        const result = await bannerAds();
        if (result) setBanners(result.banners);
      } catch (error) {
        console.log(error);
      }
    }
    handleGetBanner();
  }, []);

  const carouselItem = banners.map((banner) => (
    <Carousel.Item key={banner.id} className={`${styles.borderStyle} h-100`}  interval={1000}>
      <Image className={'rounded-pill'} src={banner.image_url} height={314} width={'100%'}/>
      <Carousel.Caption>
        <div className="row">
          <div className="col-lg-6">
            <p className="small text-uppercase mb-2 text-light">{banner.title}</p>
            <h1 className="h2 text-uppercase mb-3">{banner.content}</h1>
            <a className="btn btn-dark rounded-3" href={banner.link}>Xem thêm</a>
          </div>
        </div>
      </Carousel.Caption>
    </Carousel.Item>
  ));

  return (
    <Carousel className={styles.bannerStyle} height={550} variant=''>
      {carouselItem}
    </Carousel>
  );
}

export default CarouselBanner;