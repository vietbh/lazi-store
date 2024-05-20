import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import * as getProducts from "../../apiServices/getProducts";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { numberFormat } from "@/components/NumberFormat";

function Product() {
  const slug = useParams()["slug"];
  
  const [prevSlug, setPrevSlug] = useState();
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState();
  const [loading, setLoading] = useState(false);
  // const [category, setCategory] = useState([]);
  // const [subcategories, setSubcategories] = useState([]);
  // const hasLogin = sessionStorage.getItem("hasLogin");

  const fetchData = async () => {
    try {
      setLoading(true);
      setPrevSlug(slug);
      const result = await getProducts.fetchSearchData(slug);
      if(result.data){
        await setProducts(result.data);
        console.log(products);
      }else{
        setMessages(result)
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if(slug != prevSlug){
      fetchData();
    }
    if (loading){
      const timeout = setTimeout(()=>setLoading(false),8000);
      return () => clearTimeout(timeout);
    } 
  }, [slug,loading]);

  const product = products?.map((product) => {
    return (
      <div key={product.id} className={`col-lg-3 col-md-4 col-sm-6`}>
        <div
          className={`product text-start bg-light mb-3 ${styles.borderProduct} ${styles.paddingImageProduct}`}
        >
          <div className="position-relative mb-3">
            {product.product_hot != null && product.product_hot == 1 && (
              <div className="badge text-white bg-danger">Hot</div>
            )}
            {/*product.product_type_new &&(
                <div className="badge text-white bg-success">New</div>
              )*/}
            <a
              className="d-block"
              href={"/chi-tiet-san-pham/" + product.slug + ".html"}
            >
              <img
                className={`${styles.borderImageProduct} ${styles.imageProduct}`}
                width={272}
                height={225}
                loading="lazy"
                src={product.image_url}
                data-src={product.image_url}
                alt={product.image_url}
              />
            </a>
          </div>
          <h6 className="mb-4 mt-2 fs-6 text-break fw-bolder text-truncate">
            <a
              className="reset-anchor text-center"
              href={"/chi-tiet-san-pham/" + product.slug + ".html"}
            >
              {product.name} ({product.color_type})
            </a>
          </h6>
          <div key={product.id} className="d-flex align-items-center mb-1">
            <p className="fw-bold m-1 text-danger" style={{ fontSize: "14px" }}>
              {numberFormat(
                product.price_sale > 0 ? product.price_sale : product.price
              )}
              <span className="text-small">đ</span>
            </p>
            {product.price_sale != 0 && (
              <p
                className="fw-bold m-1 text-secondary text-decoration-line-through text-truncate"
                style={{ fontSize: "12px" }}
              >
                {numberFormat(product.price)}
                <span className="text-small">đ</span>
              </p>
            )}
          </div>
          {/*
            <div className="d-flex justify-content-around ">
              <h6 className="mb-0 fs-6 me-5 ">5 <i className="far fa-star me-1 text-warning"></i></h6>
              <h6 className="mb-0 fs-6 ms-3 fw-normal"><i className="far fa-heart me-1 text-gray"></i></h6>
            </div>
             */}
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <section>
        <div className="container">
          {/* <!-- HERO SECTION-->*/}
          <section className="py-2 bg-light">
            <div className="container pt-3">
              {/**
            <BreadcrumbCustom item={} itemActive={} />
          */}
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Tìm kiếm từ khóa <span className="text-decoration-underline">{slug.replace('+'," ")}</span>
                  </li>
                </ol>
              </nav>
            </div>
          </section>
          {/*<!-- CATEGORIES ALL SECTION-->*/}
         
          {/*Filter*/}

          {/*Filter*/}
          <section className="py-5" style={{ minHeight: "135vh" }}>
            <div className="container p-0">
              <div className="row">
                {/*<!-- SHOP LISTING-->*/}
                {loading && (
                  <div className="col-lg-12 col-sm-12 d-flex justify-content-center">
                    <Spinner />
                  </div>
                )}
                <div className="col-lg-12 order-1 order-lg-2 mb-5 mb-lg-0">
                  <div className="row mb-4">
                    {/*<!-- PRODUCT-->*/}
                    {messages ? <h4 className="text-center text-secondary"> {messages.message} </h4> : 
                    (products.length == 0 ? (<h4 className="text-center text-secondary">Đang tải...</h4>) : (product))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Product;
