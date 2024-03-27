import { Carousel } from 'primereact/carousel';
import URL_PATH from '../config/UrlPath';
import styles from '../../src/pages/Home/styles.module.css'

export default function CarouselCard(prop) {
    {/**
        <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
        <div className="mb-3">
            <img src={product.image_url} alt={product.product.name} className="w-6 shadow-2" />
        </div>
        <div>
            <h4 className="mb-1">{product.name}</h4>
            <h6 className="mt-0 mb-3">${product.price_sale}</h6>
            <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
            <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                <Button icon="pi pi-search" className="p-button p-button-rounded" />
                <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
            </div>
        </div>
        </div>
         */}
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

    // const getSeverity = (product) => {
    //     switch (product.inventoryStatus) {
    //         case 'INSTOCK':
    //             return 'success';

    //         case 'LOWSTOCK':
    //             return 'warning';

    //         case 'OUTOFSTOCK':
    //             return 'danger';

    //         default:
    //             return null;
    //     }
    // };
      
    const productTemplate = (product) => {
        return (
            <div className='me-1' style={{width:'19vw'}}>
                <div className={`product text-start bg-light mb-3 ${styles.borderProduct} ${styles.paddingImageProduct}`}>
                    <div className="position-relative mb-3">
                        {product.product.product_type_hot &&(
                        <div className="badge text-white bg-danger">Hot</div>
                        ) }
                        {product.product.product_type_new &&(
                        <div className="badge text-white bg-danger">New</div>
                        ) }
                        <a className="d-block" to={product.product.slug}><img className={` ${styles.borderImageProduct} w-100`} 
                        width={250} height={250}  loading="lazy" src={product.image_url} data-src={product.image_url} alt={product.image_url}/></a>
                        <div className="product-overlay">
                            <ul className="mb-0 list-inline">
                            {/*!hasLogin ? <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href={"dang-nhap.html"}><i className="fa fa-cart-plus"></i> Thêm vào giỏ</a></li>
                        : <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href={"/"+URL_PATH+"/cua-hang/"+product.product.slug+'.html'}><i className="fa fa-cart-plus"></i> Thêm vào giỏ </a></li>*/}
                            </ul>
                        </div>
                    </div>
                    <h6 className="mb-4 mt-2 fs-6 text-break fw-bolder text-truncate"><a className="reset-anchor text-center" href={"/"+URL_PATH+"/cua-hang/"+product.product.slug+'.html'}>{product.product.name}</a></h6>
                    <div className="d-flex align-items-center">
                        <p className="fw-bold m-1 text-danger">{parseInt(product.price_sale).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}<span className="text-small">đ</span></p>
                        <p className="m-1 text-secondary text-decoration-line-through" style={{fontSize:'13px'}}>{parseInt(product.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}<span className="text-small">đ</span></p>
                    </div>
                    <div className="d-flex align-items-center justify-content-around ">
                        <h6 className="mb-0 fs-6 me-5 ">5<span className="text-warning">sao</span></h6>
                        <h6 className="mb-0 fs-6 ms-3 fw-normal"> Yêu thích</h6>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className={`container ${prop.className} px-0`}>
            <div className='mb-2 px-0 mx-0' dangerouslySetInnerHTML={{ __html: prop.title }}></div>
            <div className='pt-2 px-0 mx-0'>
                <Carousel value={prop.products} numScroll={2} numVisible={4}
                className="container px-0 mx-0" circular autoplayInterval={3000}
                nextIcon={<button className='btn btn-white rounded-3 pe-1'><i className="fas fa-chevron-right"></i></button>}
                prevIcon={<button className='btn btn-white rounded-3 ps-2 '><i className="fas fa-chevron-left"></i></button>}
                responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
            </div>
        </div>
        
    )
}
         
