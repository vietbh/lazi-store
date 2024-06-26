
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import HTML_DOT from "../../config/PageHtml";
import URL_PATH from "../../config/UrlPath";
import { Spinner } from "react-bootstrap/esm";
import * as getCategory from "../../apiServices/getCategory";
import { numberFormat } from "../../components/NumberFormat";

function Category() {
  const slug = useParams()['slug'];
  const [products,setProducts] = useState([]);
  const [subcategories,setSubcategories] = useState([]);
  const [paginate,setPaginate] = useState([]);
  const [category,setCategory] = useState([]);
  const [loading,setLoading] = useState(false); 
  const [page,setPage] = useState(2);
  const [item,setItem] = useState();
  const hasLogin = sessionStorage.getItem("hasLogin");   
  
  useEffect(() => {
    const fetchDataCategory = async () => {
      setLoading(true);
      const result = await getCategory.fetchSingleCategory(slug);
      setCategory(result.category);
      setSubcategories(result.subcategories);
      setPaginate(result.products)
      setProducts(result.products.data)
      setItem(result.products.total - result.products.to)
      setLoading(false);
    };
  
    if (category.length == 0 && !loading) {
      fetchDataCategory();
      setLoading(false);
    }
  }, []);
  
  const subcategory = subcategories.map((category)=>{
    return(
      <div key={category.id} className="col-sm-12 col-xl-1 mb-2" style={{width:260,minHeight:52,maxHeight:60}}>
        <a href={category.slug+HTML_DOT}>
          <button className="text-start rounded-3 btn btn-light w-100 h-100" >
              <p className="m-1 overflow-hidden">{category.name}</p>
          </button>
        </a>
      </div>   
    );
  });

  const product = products.map((product) => {
    return (
      <div key={product.id} className={`col-lg-3 col-sm-6`}>
        <div className={`product text-start bg-light mb-3 ${styles.borderProduct} ${styles.paddingImageProduct}`}>
          <div className="position-relative mb-3">
            {product.product.product_type_hot &&(
              <div className="badge text-white bg-danger">Hot</div>
            ) }
            {product.product.product_type_new &&(
              <div className="badge text-white bg-warning">New</div>
            ) }
            <a className="d-block" href={"/cua-hang/"+product.product.slug+'.html'}><img className={`img-fluid ${styles.borderImageProduct} ${styles.imageProduct} `} loading="lazy" src={product.image_url} data-src={product.image_url} alt={product.image_url}/></a>
            {/*
            <div className="product-overlay">
                <ul className="mb-0 list-inline">
                  {!hasLogin ? <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href={"dang-nhap.html"}><i className="fa fa-cart-plus"></i> Thêm vào giỏ</a></li>
                  : <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href={"/"+URL_PATH+"/cua-hang/"+product.product.slug+'.html'}><i className="fa fa-cart-plus"></i> Thêm vào giỏ </a></li>}
                </ul>
            </div>
           */}
          </div>
          <h6 className="mb-4 mt-2 fs-6 text-break fw-bolder text-truncate"><a className="reset-anchor text-center" href={"/cua-hang/"+product.product.slug+'.html'}>{product.product.name}</a></h6>
          <div key={product.id} className="d-flex align-items-center mb-1">
            <p className="fw-bold m-1 text-danger" style={{fontSize:'14px'}}>{numberFormat(product.price_sale)}<span className="text-small">đ</span></p>
            <p className="fw-bold m-1 text-secondary text-truncate" style={{fontSize:'12px'}}>{numberFormat(product.price)}<span className="text-small">đ</span></p>
          </div>
          <div className="d-flex justify-content-around ">
            <h6 className="mb-0 fs-6 me-5 ">5 <i className="far fa-star me-1 text-warning"></i></h6>
            <h6 className="mb-0 fs-6 ms-3 fw-normal"><i className="far fa-heart me-1 text-gray"></i></h6>
          </div>
        </div>
      </div>
    );
  });  

  const handleLoadMore = () =>{
      const slug = paginate.links.filter((value) => {
        return value.label == page;
      })
      loadMore(slug);
  }

  const loadMore = async (slug) =>{
    const url = slug.map((value) => (value.url))
    try {
      setLoading(true)
      const result = await getCategory.fetchMoreProductByCategory(url);
      const loadMoreProduct = result.products.data;
      console.log(result.products);
      if(loadMoreProduct.length > 0){
        setPage((prevPage) => prevPage + 1);
        setProducts([...products,...loadMoreProduct]);   
        setItem(result.products.total - result.products.to)
      }
      setLoading(false)
    } catch(error) {
      console.log(error);
    }
  }
  
  const loadMoreButton =(
    <div className="row">
      <div className="d-flex justify-content-center">
        <button className="btn btn-light rounded-pill fw-bold" onClick={handleLoadMore} disabled={loading}>Xem thêm {item} sản phẩm</button>
      </div>
    </div>
  );
  

  return (
      <section>
        <div className="container">   
          {/* <!-- HERO SECTION-->*/}
          <section className="py-2 bg-light">
            <div className="container pt-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">{category.name}</li>
                </ol>
              </nav>
            </div>
          </section>
          {/*<!-- CATEGORIES ALL SECTION-->*/}
          <section className="pt-4">
            {subcategory.length > 0 &&(
              <header className="text-start">
                <h2 className="h5 text-uppercase mb-4">Danh mục liên quan</h2>
              </header>
            )}
            {loading && <div className="col-lg-12 col-sm-12 d-flex justify-content-center"><Spinner/></div> }  
            <div className="row gy-2">
                {subcategory}
            </div>
          </section>
          {/*Filter*/}
          <section className="pt-4">
            <header className="text-start">
                <h2 className="h5 text-uppercase mb-4">Bộ lọc sản phẩm</h2>
            </header>
            <div className="bg-light">
              <div className="row gy-2 px-4 py-2">
      
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
          {/*Filter*/}
          <section className="py-5" style={{minHeight:'135vh'}}>
            <div className="container p-0">
              <div className="row">
                {/*<!-- SHOP LISTING-->*/}
                {loading && <div className="col-lg-12 col-sm-12 d-flex justify-content-center"><Spinner/></div> }  
                <div className="col-lg-12 order-1 order-lg-2 mb-5 mb-lg-0">
                  <div className="row mb-4">
                    {/*<!-- PRODUCT-->*/}
                    {product}
                  </div>
                  {/*<!-- PAGINATION-->*/}
                  {item != 0 && loadMoreButton}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
  );
}

export default Category;