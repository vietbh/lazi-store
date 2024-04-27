
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Loading from "../../components/Loading";
import * as getProducts from '../../apiServices/getProducts'; // Đường dẫn đến file chứa hàm fetchProducts


function Product() {
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(false); 
    const hasLogin = sessionStorage.getItem("hasLogin");   
  
    useEffect(()=>{
      const fetchApi = async () =>{
        setLoading(true);
        const result = await getProducts.fetchData();
        setProducts(result); 
        sessionStorage.setItem('products', JSON.stringify(products)); // Lưu dữ liệu vào session storage
        setLoading(false);
      }
      fetchApi()
    },[])

    // useEffect(() => {
    //   // Đặt điều kiện để chỉ gọi fetchData khi loading là true
    //   if (loading) {
    //       // fetchProducts();
    //       // fetchDataCategory();
    //   }
    // }, [loading]);

    // const category = categories.map((category)=>{
    //   return(
    //     <div key={category.id} className="col-sm-12 col-xl-1 mb-2" style={{width:260,minHeight:52,maxHeight:60}}>
    //       <a href={'danh-muc/'+category.slug+HTML_DOT}>
    //         <button className="text-start rounded-3 btn btn-light w-100 h-100" >
    //             <p className="m-1 overflow-hidden">{category.name}</p>
    //         </button>
    //       </a>
    //     </div>   
    //   );
    // });
    console.log(products);
    const product = products.map((product) => {
      return (
        <div key={product.id} className={`col-lg-3 col-sm-6 mb-3`}>
          <div className={`product text-start bg-light mb-3 ${styles.borderProduct} ${styles.paddingImageProduct}`}>
            <div className="position-relative mb-3">
              {product.product.product_type == 'hot' && <div className="badge text-white bg-danger">Hot</div>}
              <a className="d-block" to={product.product.slug}><img className={`img-fluid ${styles.borderImageProduct}`} loading="lazy" src={product.image_url} data-src={product.image_url} alt={product.image_url}/></a>
              <div className="product-overlay">
                  <ul className="mb-0 list-inline">
                    {!hasLogin ? <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href={"dang-nhap.html"}><i className="fa fa-cart-plus"></i> Thêm vào giỏ</a></li>
                    : <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href={"cua-hang/"+product.product.slug+'.html'}><i className="fa fa-cart-plus"></i> Thêm vào giỏ </a></li>}
                  </ul>
              </div>
            </div>
            {/**
            <h6 className=""> <Link className="reset-anchor" to={product.slug+'.html'}>Iphone</Link></h6>
             */}
            <h6 className="mb-4 mt-2 fs-6 text-break fw-bolder text-truncate"><a className="reset-anchor text-center" href={"cua-hang/"+product.product.slug+'.html'}>{product.product.name}</a></h6>
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
    });

    return (
        <section>
        
          <div className="container">   
            {/* <!-- HERO SECTION-->*/}
            <section className="py-5 bg-light">
              <div className="container">
                <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                  <div className="col-lg-6">
                    <h1 className="h2 text-uppercase mb-0">Cửa hàng</h1>
                  </div>
                  <div className="col-lg-6 text-lg-end">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
                        <li className="breadcrumb-item"><a className="text-dark" href="/">Trang chủ</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Cửa hàng</li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </section>
            {/*<!-- CATEGORIES ALL SECTION-->*/}
            <section className="pt-4">
              <header className="text-start">
                  <h2 className="h5 text-uppercase mb-4">Danh sách danh mục</h2>
              </header>
              {loading && <div className="col-lg-12 col-sm-12"><Loading className={'d-flex justify-content-center'} width={50}  /></div> }  
              <div className="row gy-2">
                {/*categoey */}
              </div>
            </section>
            <section className="pt-4">
              <header className="text-start">
                  <h2 className="h5 text-uppercase mb-4">Bộ lọc sản phẩm</h2>
              </header>
              <div className="bg-light">
                <div className="row gy-2 px-4 py-2">
                  {/*<!-- SHOP SIDEBAR-->*/}
                  <div className="col-lg-4 order-2 order-lg-1 mb-2">
                    <h6 className="text-uppercase mb-1">Mức giá</h6>
                    <div className="row pt-2">
                      <div className="col-6">
                        <button name="min" className="bg-white d-flex justify-content-center form-control rounded-3" type="button"><span className="small">Thấp nhất</span></button>
                      </div>
                      <div className="col-6">
                        <button name="max" className="bg-white d-flex justify-content-center form-control rounded-3" type="button" ><span className="small">Cao nhất</span></button>
                      </div>
                    </div>
                  </div>  
                  <div className="col-lg-4 order-2 order-lg-1">
                    <h6 className="text-uppercase mb-3">Chỉ xem</h6>
                    <div className="row">
                        <div className="col-lg-6 form-check mb-1">
                          <input className="form-check-input" type="checkbox" id="checkbox_1"/>
                          <label className="form-check-label" to="checkbox_1">Returns Accepted</label>
                        </div>
                        <div className="col-lg-6 form-check mb-1">
                          <input className="form-check-input" type="checkbox" id="checkbox_2"/>
                          <label className="form-check-label" to="checkbox_2">Returns Accepted</label>
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 form-check mb-1">
                        <input className="form-check-input" type="checkbox" id="checkbox_3"/>
                        <label className="form-check-label" to="checkbox_3">Completed Items</label>
                      </div>
                      <div className="col-lg-6 form-check mb-1">
                        <input className="form-check-input" type="checkbox" id="checkbox_4"/>
                        <label className="form-check-label" to={"checkbox_4"}>Sold Items</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 form-check mb-1">
                        <input className="form-check-input" type="checkbox" id="checkbox_5"/>
                        <label className="form-check-label" to="checkbox_5">Deals &amp; Savings</label>
                      </div>
                      <div className="col-lg-6 form-check mb-1">
                        <input className="form-check-input" type="checkbox" id="checkbox_6"/>
                        <label className="form-check-label" to="checkbox_6">Authorized Seller</label>
                      </div>  
                    </div>
                  </div>
                  <div className="col-lg-4 order-2 order-lg-1">
                    <h6 className="text-uppercase mb-3">Loại sản phẩm</h6>
                    <div className="d-flex justify-content-evenly">
                      <div className="form-check mb-1">
                        <input className="form-check-input" type="radio" name="customRadio" id="radio_1"/>
                        <label className="form-check-label" to="radio_1">Toàn bộ</label>
                      </div>
                      <div className="form-check mb-1">
                        <input className="form-check-input" type="radio" name="customRadio" id="radio_2"/>
                        <label className="form-check-label" to="radio_2">Bán chạy</label>
                      </div>
                      <div className="form-check mb-1">
                        <input className="form-check-input" type="radio" name="customRadio" id="radio_3"/>
                        <label className="form-check-label" to="radio_3">Đánh giá cao</label>
                      </div>
                      <div className="form-check mb-1">
                        <input className="form-check-input" type="radio" name="customRadio" id="radio_4"/>
                        <label className="form-check-label" to="radio_4">Giá thấp</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="py-5" style={{height:'135vh'}}>
              <div className="container p-0">
                <div className="row">
                  {/*<!-- SHOP LISTING-->*/}
                  <header className="text-start">
                      <h2 className="h5 text-uppercase mb-4">Danh sách sản phẩm</h2>
                  </header>
                  {loading && <div className="col-lg-12 col-sm-12"><Loading className={'d-flex justify-content-center'}/></div> }  
                  <div className="col-lg-12 order-1 order-lg-2 mb-5 mb-lg-0">
                    <div className="row">
                      {/*<!-- PRODUCT-->*/}
                      {product}
                      {/*product*/}
                    </div>
                    {/*<!-- PAGINATION-->*/}
                    {/*{!loading &&(
                      <nav aria-label="Page navigation example ">
                        <ul className="pagination justify-content-center justify-content-lg-end ">
                          <li className="page-item mx-1"><a className="page-link" href="#!" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
                          <li className="page-item mx-1 active"><a className="page-link" href="#!">1</a></li>
                          <li className="page-item mx-1"><a className="page-link" href="#!">2</a></li>
                          <li className="page-item mx-1"><a className="page-link" href="#!">3</a></li>
                          <li className="page-item ms-1"><a className="page-link" href="#!" aria-label="Next"><span aria-hidden="true">»</span></a></li>
                        </ul>
                      </nav>
                    )}*/}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
    );
}

export default Product;