import { useState } from 'react';
import CardBlog from '../../components/CardBlog';

const Blog = () => {
    const [grid,setGrid] = useState(4);

    return (
        <>

            <section>
            <div className="container">
            
            {/*              
        <!-- HERO SECTION-->
            */}

        <section className="py-5 bg-light">
          <div className="container">
            <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
              <div className="col-lg-6">
                <h1 className="h2 text-uppercase mb-0">Bài viết</h1>
              </div>
              <div className="col-lg-6 text-lg-end">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
                    <li className="breadcrumb-item"><a className="text-dark" href="/">Trang chủ</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Bài viết</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>
        <section className="py-5">
          <div className="container p-0">
            <div className="row">
                            {/*
                <!-- SHOP SIDEBAR-->
                */}

              <div className="col-lg-3 order-2 order-lg-1">
                <h5 className="text-uppercase mb-4">Danh mục</h5>
                <div className="py-2 px-4 bg-dark text-white mb-3"><strong className="small text-uppercase fw-bold">Fashion &amp; Acc</strong></div>
                <ul className="list-unstyled small text-muted ps-lg-4 font-weight-normal">
                  <li className="mb-2"><a className="reset-anchor" href="#!">{`Women's T-Shirts`}</a></li>
                  <li className="mb-2"><a className="reset-anchor" href="#!">{`Men's T-Shirts`}</a></li>
                  <li className="mb-2"><a className="reset-anchor" href="#!">Dresses</a></li>
                  <li className="mb-2"><a className="reset-anchor" href="#!">Novelty socks</a></li>
                  <li className="mb-2"><a className="reset-anchor" href="#!">{`Women's sunglasses`}</a></li>
                  <li className="mb-2"><a className="reset-anchor" href="#!">{`Men's sunglasses`}</a></li>
                </ul>
                <div className="py-2 px-4 bg-light mb-3"><strong className="small text-uppercase fw-bold">Health &amp; Beauty</strong></div>
                <ul className="list-unstyled small text-muted ps-lg-4 font-weight-normal">
                  <li className="mb-2"><a className="reset-anchor" href="#!">Shavers</a></li>
                  <li className="mb-2"><a className="reset-anchor" href="#!">bags</a></li>
                  <li className="mb-2"><a className="reset-anchor" href="#!">Cosmetic</a></li>
                  <li className="mb-2"><a className="reset-anchor" href="#!">Nail Art</a></li>
                  <li className="mb-2"><a className="reset-anchor" href="#!">Skin Masks &amp; Peels</a></li>
                  <li className="mb-2"><a className="reset-anchor" href="#!">Korean cosmetics</a></li>
                </ul>
                
              
              </div>
                              {/*
                <!-- SHOP LISTING-->
                */}

              <div className="col-lg-9 order-1 order-lg-2 mb-5 mb-lg-0">
                <div className="row mb-3 align-items-center">
                  <div className="col-lg-6 mb-2 mb-lg-0">
                    <p className="text-sm text-muted mb-0">Hiển thị 1–12 of 53 kết quả</p>
                  </div>
                  <div className="col-lg-6">
                    <ul className="list-inline d-flex align-items-center justify-content-lg-end mb-0">
                      <li className="list-inline-item text-muted me-3"><a className="reset-anchor p-0" href="#2" onClick={()=>{setGrid(6)}}><i className="fas fa-th-large"></i></a></li>
                      <li className="list-inline-item text-muted me-3"><a className="reset-anchor p-0" href="#3" onClick={()=>{setGrid(4)}}><i className="fas fa-th"></i></a></li>
                      <li className="list-inline-item">
                        <select className="selectpicker form-select" data-customclass="form-control form-control-sm">
                          <option value>Sắp xếp theo </option>
                          <option value="default">Sắp xếp mặc định </option>
                          <option value="popularity">Bài viết mới nhất </option>
                          <option value="low-high">Lượt xem: Từ thấp tới cao </option>
                          <option value="high-low">Lượt xem: Từ cao tới thấp </option>
                        </select>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                <div className={`col-lg-${grid} col-sm-6`}>
                    <CardBlog keyBaiViet />
                </div>
                <div className={`col-lg-${grid} col-sm-6`}>
                    <CardBlog keyBaiViet />
                </div>
                <div className={`col-lg-${grid} col-sm-6`}>
                    <CardBlog keyBaiViet />
                </div>
                <div className={`col-lg-${grid} col-sm-6`}>
                    <CardBlog keyBaiViet />
                </div>
                <div className={`col-lg-${grid} col-sm-6`}>
                    <CardBlog keyBaiViet />
                </div>
                <div className={`col-lg-${grid} col-sm-6`}>
                    <CardBlog keyBaiViet />
                </div>
                </div>
                {/*
                <!-- PAGINATION-->
                */}
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center justify-content-lg-end">
                    <li className="page-item mx-1"><a className="page-link" href="#!" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
                    <li className="page-item mx-1 active"><a className="page-link" href="#!">1</a></li>
                    <li className="page-item mx-1"><a className="page-link" href="#!">2</a></li>
                    <li className="page-item mx-1"><a className="page-link" href="#!">3</a></li>
                    <li className="page-item ms-1"><a className="page-link" href="#!" aria-label="Next"><span aria-hidden="true">»</span></a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </section>
        </div>
            </section>  
        
        </>
    );
};

export default Blog;