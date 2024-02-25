
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../../config/Api";
import styles from "./styles.module.css";
import Loading from "../../components/Loading";
import ModalProduct from "../../components/modalProduct";
import { useDispatch } from "react-redux";
import cartSlice from "../../state/cartSlice";

function Product() {
    const [products,setProducts] = useState([]);
    const [modal,setModal] = useState([]);
    const [categories,setCategories] = useState([]);
    const [loading,setLoading] = useState(false); 
    const hasLogin = sessionStorage.getItem("hasLogin");   
    
    const fetchDataCategory = async() => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL.concat('/danh-muc-san-pham'));
        const data = await response.data;
        if(response.status == 200){
          setLoading(false);
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
            setProducts(data);
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
        let cachedCategories = JSON.parse(sessionStorage.getItem('categories'));    
        if(cachedCategories.length < 4  && data != []){
          cachedCategories = [...cachedCategories,...data];
          setCategories(cachedCategories);
        }else if(cachedCategories.length === 0 && data != []){
          setCategories(data);
        }else{
          setCategories(cachedCategories);
        }
        if(categories.length !== cachedCategories.length){
            fetchDataCategory();
        }
        const interval = setInterval(()=>{
          if(categories.length !== cachedCategories.length){
            fetchDataCategory();
            clearInterval(interval);
          }
        },0);
        setLoading(false);
      }else{
        fetchDataCategory();
      }
      if(sessionStorage.getItem('products')) {
        // Lấy dữ liệu từ bộ nhớ session
        const cachedProducts = JSON.parse(sessionStorage.getItem('products'));
        if(cachedProducts.length > 0 && products.length == 0){
          setProducts(cachedProducts);
        }
        if(products.length !== cachedProducts.length){
          fetchData();
        }
        setLoading(false);
      }else{
        setLoading(true);
        fetchData();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products.length, categories.length]);
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
      );
    }
    );

    const dispatch = useDispatch();
    // const globalstate = useSelector(state=>state.cartState);
    const {add} = cartSlice.actions;
    const product = products.map((product) => {
      const price = product.variations.map((variation,index) => {
        if(index == 0 ){  
          return(
            <div key={variation.id} className="text-danger text-center">
              <p className="fw-bold m-1">{parseInt(variation.price_sale).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}<span className="text-small">đ</span></p>
              <p className="m-1 text-secondary fw-bold text-decoration-line-through">{parseInt(variation.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}<span className="text-small">đ</span></p>
            </div>
          );
        }
      });
      return (
        <div key={product.id} className={`col-lg-4 col-sm-6`}>
          <div className={`product text-start bg-light  mb-3 ${styles.borderProduct} ${styles.paddingImageProduct}`}>
            <div className="position-relative mb-3">
              <div className="badge text-white bg-danger">Hot</div><a className="d-block" to={product.slug}><img className={`img-fluid ${styles.borderImageProduct}`} loading="lazy" src={product.image_url} data-src={product.image_url} alt={product.image_url}/></a>
              <div className="product-overlay">
                  <ul className="mb-0 list-inline">
                    <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-outline-dark" href="#!"><i className="far fa-heart"></i></a></li>
                    {!hasLogin ? <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href={"dang-nhap"}><i className="fa fa-cart-plus"></i> Thêm vào giỏ</a></li> : <li className="list-inline-item m-0 p-0">
                      <button className="btn btn-sm btn-dark" onClick={()=>{dispatch(add({...product,quantity:1}));}}><i className="fa fa-cart-plus"></i> Thêm vào giỏ </button></li>}
                    <li className="list-inline-item me-0"><button className="btn btn-sm btn-outline-dark" data-bs-target={"#"+product.slug} data-bs-toggle="modal" onClick={()=>handleModalProduct(product.id)}><i className="fas fa-expand"></i></button></li>
                  </ul>
              </div>
            </div>
            <h6 className="text-center"> <Link className="reset-anchor" to={product.slug}>Iphone</Link></h6>
            <h6 className="text-center"> <Link className="reset-anchor text-center" to={product.slug}>{product.name}</Link></h6>
            {price}
          </div>
        </div>
      );
    });  
    const handleModalProduct = function(id){
      const modal = products.filter((value) => {if(value.id === id) return value})
      {/*Modal */}
      if(modal){
        setModal(modal);
      }else{
        setModal([]);
      }
    };

    return (
        <section >
          {/* <!-- Modal SECTION-->*/}
          <ModalProduct modal={modal.map((value) => value)}/>
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
                  {category}
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
                  <div className="col-lg-9 order-1 order-lg-2 mb-5 mb-lg-0">
                    <div className="row">
                      {/*<!-- PRODUCT-->*/}
                      {product}
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