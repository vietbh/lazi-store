
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../../config/Api";
import styles from "./styles.module.css";
import { NumericFormat } from 'react-number-format';
import Loading from "../../components/Loading";
function Product() {
    const [products,setProducts] = useState([]);
    const [categories,setCategories] = useState([]);
    const [loading,setLoading] = useState(false);   
    const fetchDataCategory = async() => {
      try {
          setLoading(true);
          const response = await axios.get(API_URL.concat('/danh-muc-san-pham'));
          const data = await response.data;
          if(response.status == 200){
            setLoading(false);
            // setCategories(data);
            // Lưu trữ dữ liệu sản phẩm trong bộ nhớ session của trình duyệt
            sessionStorage.setItem('categories', JSON.stringify(data));
          }
        }catch(error) {
          setLoading(true);
          console.log(error);
      }
    }
    const fetchData = async() => {
      try {
          setLoading(true);
          const response = await axios.get(API_URL.concat('/san-pham'));
          const data = await response.data;         
          if(response.status == 200){
            setLoading(false);
            // Lưu trữ dữ liệu sản phẩm trong bộ nhớ session của trình duyệt
            sessionStorage.setItem('products', JSON.stringify(data));
          }
        }catch(error) {
          setLoading(true);
          console.log(error);
      }
    }
    useEffect(() => {
      const data = [
        {id:999,name:'Điện thoại',slug:'dien-thoai'},
        {id:998,name:'Máy tính',slug:'may-tinh'},
        {id:997,name:'Đồng hồ thông minh',slug:'dong-ho-thong-min'},
        {id:996,name:'Tai nghe không dây',slug:'tai-nghe-khong-day'},
        {id:995,name:'Tai nghe có dây',slug:'tai-nghe-co-day'},
        {id:994,name:'Ốp lưng',slug:'op-lung'},
        {id:993,name:'Kính VR',slug:'kinh-vr'},
        {id:992,name:'Loa không dây',slug:'loa-khong-day'},
        {id:991,name:'Loa có dây',slug:'loa-co-day'},
        {id:990,name:'Sạc dự phòng',slug:'sac-du-phong'},
      ];  
      if(sessionStorage.getItem('categories')) {
        const cachedCategories = JSON.parse(sessionStorage.getItem('categories'));
        if(cachedCategories.length > 0 && categories.length == 0){
          if(cachedCategories.length < 6){
            const newData = [...cachedCategories,...data];
            setCategories(newData);
          }else{
            setCategories(cachedCategories);
          }
        }else{
          setCategories(data);
        }
        if(categories.length !== cachedCategories.length){
          setLoading(true);
          fetchDataCategory()
        }
        setLoading(false);
      }else{
        setLoading(true);
        fetchDataCategory();
      }
      if(sessionStorage.getItem('products')) {
        // Lấy dữ liệu từ bộ nhớ session
        const cachedProducts = JSON.parse(sessionStorage.getItem('products'));
        if(cachedProducts.length > 0 && product.length == 0){
          setProducts(cachedProducts);
        }
        if(products.length !== cachedProducts.length){
          setLoading(true);
          fetchData();
        }
        setLoading(false);
      }else{
        setLoading(true);
        fetchData();
      }
    }, [products.length, categories.length,product.length,category.length]);
    useEffect(() => {
      // Đặt điều kiện để chỉ gọi fetchData khi loading là true
      if (loading) {
          fetchData();
          fetchDataCategory();
      }
    }, [loading]);
    const category = categories.map((category)=>{
      return(
          <div key={category.id} className="col-sm-12 col-xl-1 mb-2" style={{width:260,minHeight:52,maxHeight:60}}>
            <a href={category.slug}>
              <button className="text-start rounded-3 btn btn-light w-100 h-100" >
                  <p className="m-1 overflow-hidden">{category.name}</p>
              </button>
            </a>
          </div>   
      )
    }
    );
    const product = products.map((product) => {
      const price = product.variations.map((variation,index) => {
        if(index == 0 ){
          return(
            <div key={variation.id} className="text-danger">
              <NumericFormat disabled className="btn text-start p-0 fw-bold text-danger" value={variation.price_sale} thousandSeparator=',' decimalSeparator="." suffix=' đ'/>
              <NumericFormat disabled className="btn text-sm text-start p-0 fw-normal text-secondary text-decoration-line-through" value={variation.price} thousandSeparator=',' decimalSeparator="." suffix='đ'/>
            </div>
            );
        }
      });
      return (
        <div key={product.id} className={`col-lg-4 col-sm-6`}>
          <div className={`product text-start bg-light p-3 mb-3 ${styles.borderImageProduct}`}>
            <div className="position-relative mb-3">
              <div className="badge text-white bg-danger">Hot</div><a className="d-block" to={product.slug}><img className={`img-fluid ${styles.borderImageProduct}`} src={product.image_url} alt={product.image_url}/></a>
              <div className="product-overlay">
                  <ul className="mb-0 list-inline">
                    <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-outline-dark" href="#!"><i className="far fa-heart"></i></a></li>
                    <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href="cart.html"><i className="fa fa-cart-plus"></i> Thêm vào giỏ</a></li>
                    <li className="list-inline-item me-0"><a className="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal"><i className="fas fa-expand"></i></a></li>
                  </ul>
              </div>
            </div>
            <h6> <Link className="reset-anchor" to={product.slug}>Iphone</Link></h6>
            <h6> <Link className="reset-anchor text-center" to={product.slug}>{product.name}</Link></h6>
            <p>{price}</p>
          </div>
        </div>
      );
    });  
    return (
        <section>
          {/*Modal */}
          <div className="modal fade" id="productView" tabIndex="-1">
              <div className="modal-dialog modal-lg modal-dialog-centered">
                  <div className="modal-content overflow-hidden border-0">
                      <button className="btn-close p-4 position-absolute top-0 end-0 z-index-20 shadow-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                      <div className="modal-body p-0">
                      <div className="row align-items-stretch">
                          <div className="col-lg-6 p-lg-0"><a className={`glightbox product-view d-block h-100 bg-cover bg-center ${styles.linkStyle}`} href="img/product-5.jpg" data-gallery="gallery1" data-glightbox="Red digital smartwatch"></a><a className="glightbox d-none" href="img/product-5-alt-1.jpg" data-gallery="gallery1" data-glightbox="Red digital smartwatch"></a><a className="glightbox d-none" href="img/product-5-alt-2.jpg" data-gallery="gallery1" data-glightbox="Red digital smartwatch"></a></div>
                          <div className="col-lg-6">
                          <div className="p-4 my-md-4">
                              <ul className="list-inline mb-2">
                              <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                              <li className="list-inline-item m-0 1"><i className="fas fa-star small text-warning"></i></li>
                              <li className="list-inline-item m-0 2"><i className="fas fa-star small text-warning"></i></li>
                              <li className="list-inline-item m-0 3"><i className="fas fa-star small text-warning"></i></li>
                              <li className="list-inline-item m-0 4"><i className="fas fa-star small text-warning"></i></li>
                              </ul>
                              <h2 className="h4">Red digital smartwatch</h2>
                              <p className="text-muted">$250</p>
                              <p className="text-sm mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Vestibulum ultricies aliquam convallis.</p>
                              <div className="row align-items-stretch mb-4 gx-0">
                              <div className="col-sm-7">
                                  <div className="border d-flex align-items-center justify-content-between py-1 px-3"><span className="small text-uppercase text-gray mr-4 no-select">Quantity</span>
                                  <div className="quantity">
                                      <button className="dec-btn p-0"><i className="fas fa-caret-left"></i></button>
                                      <input className="form-control border-0 shadow-0 p-0" type="text" onChange={()=>{}} value="1"/>
                                      <button className="inc-btn p-0"><i className="fas fa-caret-right"></i></button>
                                  </div>
                                  </div>
                              </div>
                              <div className="col-sm-5"><a className="btn btn-dark btn-sm w-100 h-100 d-flex align-items-center justify-content-center px-0" href="cart.html">Add to cart</a></div>
                              </div><a className="btn btn-link text-dark text-decoration-none p-0" href="#!"><i className="far fa-heart me-2"></i>Add to wish list</a>
                          </div>
                          </div>
                      </div>
                      </div>
                  </div>
              </div>
          </div>
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
            <section className="pt-5">
              <header className="text-start">
                  <h2 className="h5 text-uppercase mb-4">Danh sách danh mục</h2>
              </header>
              <div className="row gy-2">
                  {category}
              </div>
            </section>
            <section className="py-5">
              <div className="container p-0">
                <div className="row">
                  {/*<!-- SHOP SIDEBAR-->*/}
                  <div className="col-lg-3 order-2 order-lg-1">
                    <div className="py-2 px-4 bg-dark text-white mb-3"><strong className="small text-uppercase fw-bold">Bộ lọc sản phẩm</strong></div>
                    <h6 className="text-uppercase mb-1">Mức giá</h6>
                    <div className="price-range mb-4">
                      <div id="range"></div>
                      <div className="row pt-2">
                        <div className="col-6"><span className="small">Thấp nhất</span>
                          <input name="min" className="d-flex justify-content-center form-range rounded-3" type="input" />
                        </div>
                        <div className="col-6"><span className="small">Cao nhất</span>
                          <input className="d-flex justify-content-center form-range rounded-3" type="input" />
                        </div>
                      </div>
                    </div>
                    <h6 className="text-uppercase mb-3">Chỉ xem</h6>
                    <div className="form-check mb-1">
                      <input className="form-check-input" type="checkbox" id="checkbox_1"/>
                      <label className="form-check-label" to="checkbox_1">Returns Accepted</label>
                    </div>
                    <div className="form-check mb-1">
                      <input className="form-check-input" type="checkbox" id="checkbox_2"/>
                      <label className="form-check-label" to="checkbox_2">Returns Accepted</label>
                    </div>
                    <div className="form-check mb-1">
                      <input className="form-check-input" type="checkbox" id="checkbox_3"/>
                      <label className="form-check-label" to="checkbox_3">Completed Items</label>
                    </div>
                    <div className="form-check mb-1">
                      <input className="form-check-input" type="checkbox" id="checkbox_4"/>
                      <label className="form-check-label" to={"checkbox_4"}>Sold Items</label>
                    </div>
                    <div className="form-check mb-1">
                      <input className="form-check-input" type="checkbox" id="checkbox_5"/>
                      <label className="form-check-label" to="checkbox_5">Deals &amp; Savings</label>
                    </div>
                    <div className="form-check mb-4">
                      <input className="form-check-input" type="checkbox" id="checkbox_6"/>
                      <label className="form-check-label" to="checkbox_6">Authorized Seller</label>
                    </div>
                    <h6 className="text-uppercase mb-3">Loại sản phẩm</h6>
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
                    {/*<!-- SHOP LISTING-->*/}
                  <div className="col-lg-9 order-1 order-lg-2 mb-5 mb-lg-0">
                    <div className="row">
                      {loading && <Loading className={'col-lg-12 col-sm-12'}/> }  
                      {/*<!-- PRODUCT-->*/}
                      {product}
                    </div>
                    {/*<!-- PAGINATION-->*/}
                    {/*
                    {!loading &&(
                      <nav aria-label="Page navigation example ">
                        <ul className="pagination justify-content-center justify-content-lg-end ">
                          <li className="page-item mx-1"><a className="page-link" href="#!" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
                          <li className="page-item mx-1 active"><a className="page-link" href="#!">1</a></li>
                          <li className="page-item mx-1"><a className="page-link" href="#!">2</a></li>
                          <li className="page-item mx-1"><a className="page-link" href="#!">3</a></li>
                          <li className="page-item ms-1"><a className="page-link" href="#!" aria-label="Next"><span aria-hidden="true">»</span></a></li>
                        </ul>
                      </nav>
                    )}
                    */}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
    );
}

export default Product;