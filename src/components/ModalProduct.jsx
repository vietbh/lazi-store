import PropTypes from "prop-types";

function ModalProduct({ modal }) {
  const renderModal = (modal) => {
    const { id, slug, name, price_sale, image_url, description } = modal;
    return (
      <div key={id} className="modal fade" id={slug} tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content overflow-hidden border-0">
            <button
              className="btn-close p-4 position-absolute top-0 end-0 z-index-20 shadow-0"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="modal-body p-0">
              <div className="row align-items-stretch">
                <div className="col-lg-6 p-lg-0">
                  <a
                    className={`glightbox product-view d-block h-100 bg-cover bg-center`}
                    style={{ background: `url(${image_url})` }}
                    href={image_url}
                    data-gallery="gallery1"
                    data-glightbox="Red digital smartwatch"
                  ></a>
                  <a
                    className="glightbox d-none"
                    href="img/product-5-alt-1.jpg"
                    data-gallery="gallery1"
                    data-glightbox="Red digital smartwatch"
                  ></a>
                  <a
                    className="glightbox d-none"
                    href="img/product-5-alt-2.jpg"
                    data-gallery="gallery1"
                    data-glightbox="Red digital smartwatch"
                  ></a>
                </div>
                <div className="col-lg-6">
                  <div className="p-4 my-md-4">
                    <ul className="list-inline mb-2">
                      <li className="list-inline-item m-0">
                        <i className="fas fa-star small text-warning"></i>
                      </li>
                      <li className="list-inline-item m-0">
                        <i className="fas fa-star small text-warning"></i>
                      </li>
                      <li className="list-inline-item m-0">
                        <i className="fas fa-star small text-warning"></i>
                      </li>
                      <li className="list-inline-item m-0">
                        <i className="fas fa-star small text-warning"></i>
                      </li>
                      <li className="list-inline-item m-0">
                        <i className="fas fa-star small text-warning"></i>
                      </li>
                    </ul>
                    <h2 className="h4">{name}</h2>
                    <p className="text-muted">{price_sale}</p>
                    <div className="text-sm " dangerouslySetInnerHTML={
                      { __html: description }}>
                    </div>
                      <p className="text-sm mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        In ut ullamcorper leo, eget euismod orci. Cum sociis
                        natoque penatibus et magnis dis parturient montes nascetur
                        ridiculus mus. Vestibulum ultricies aliquam convallis.
                      </p>
                    <div className="row align-items-stretch mb-4 gx-0">
                      <div className="col-sm-7">
                        <div className="border d-flex align-items-center justify-content-between py-1 px-3">
                          <span className="small text-uppercase text-gray mr-4 no-select">
                            Số lượng
                          </span>
                          <div className="quantity">
                            <button className="dec-btn p-0">
                              <i className="fas fa-caret-left"></i>
                            </button>
                            <input
                              className="form-control border-0 shadow-0 p-0"
                              type="text"
                              onChange={() => {}}
                              value="1"
                            />
                            <button className="inc-btn p-0">
                              <i className="fas fa-caret-right"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-5">
                        <a
                          className="btn btn-dark btn-sm w-100 h-100 d-flex align-items-center justify-content-center px-0"
                          href="cart.html"
                        >
                          Mua ngay
                        </a>
                      </div>
                    </div>
                    <a
                      className="btn btn-link text-dark text-decoration-none p-0"
                      href="#!"
                    >
                      <i className="far fa-heart me-2"></i>Thêm vào danh sách yêu thích
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (<div>{modal.map(renderModal)}</div>);
}

ModalProduct.propTypes = {
  modal: PropTypes.array,
};

export default ModalProduct;
