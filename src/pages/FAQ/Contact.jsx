import React from "react";
import BreadcrumbCustom from "@/components/BreadcrumbCustom";

const Contact = () => {
    return (
        <React.Fragment>    
            <div className="content-wrapper mt-4">
                <section className="container mt-5 mb-4">
                    <BreadcrumbCustom itemActive={"Liên hệ"}/>
                    <div className="d-flex justify-content-center">
                        <h2 className="text-uppercase">Trang Liên Hệ</h2>
                    </div>

                </section>  
            
                <section className="content">
                    <div className="container p-3"  style={{height:"60vh"}}>
                        <iframe className="w-100 h-100" src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d62701.7736930761!2d106.62120105758487!3d10.821958668229255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zSOG7kyBDaMOtIE1pbmgsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!3m2!1d10.8230989!2d106.62966379999999!4m5!1s0x31752bee0b0ef9e5%3A0x5b4da59e47aa97a8!2zQ8O0bmcgVmnDqm4gUGjhuqduIE3hu4FtIFF1YW5nIFRydW5nLCBUw6JuIENow6FuaCBIaeG7h3AsIFF14bqtbiAxMiwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5o!3m2!1d10.8538211!2d106.6278284!5e0!3m2!1svi!2s!4v1714209969508!5m2!1svi!2s"></iframe>
                    </div>
                    <div className="card">
                        <div className="card-body row gap-y-3">
                            <div className="card-title fs-2 text-center fw-bold">Thông tin liên hệ</div>
                            <div 
                            className="col-lg-8 col-md-8 col-sm-12">
                                <form className="p-3">
                                    <div
                                    className="form-group mb-3">
                                    <label htmlFor="inputName">Tên của bạn</label>
                                    <input type="text" id="inputName" className="form-control rounded-3" />
                                    </div>
                                    <div
                                    className="form-group mb-3">
                                    <label htmlFor="inputEmail">E-Mail</label>
                                    <input type="email" id="inputEmail" className="form-control rounded-3" />
                                    </div>
                                    <div 
                                    className="form-group mb-3">
                                    <label htmlFor="inputSubject">Tiêu đề</label>
                                    <input type="text" id="inputSubject" className="form-control rounded-3" />
                                    </div>
                                    <div 
                                    className="form-group mb-2">
                                    <label htmlFor="inputMessage">Lời nhắn</label>
                                    <textarea id="inputMessage" className="form-control rounded-3" rows="4"></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary rounded-pill" >Gửi thông tin</button>
                                </form>

                            </div>
                            <div 
                            className="col-4 col-md-4 col-sm-12 d-flex align-items-center justify-content-center">
                                <div>
                                    <div 
                                    className="d-flex align-items-center mb-5">
                                        <div className="flex-shrink-0">
                                            <i className="fas fa-home fs-1 text-primary"></i>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            Công Viên Phần Mềm Quang Trung
                                        </div>
                                    </div>
                                    <div 
                                    className="d-flex align-items-center mb-5">
                                        <div className="flex-shrink-0">
                                            <i className="fas fa-phone fs-1 text-primary"></i>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <a className="text-dark" href={'tel:+84012345678910'}>Phone: +84012345678910 </a>
                                        </div>
                                    </div>
                                    <div
                                    className="d-flex align-items-center mb-5">
                                        <div className="flex-shrink-0">
                                            <i className="fas fa-inbox fs-1 text-primary"></i>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <a className="text-dark" href={'mailto:laziStore5@lazi.com'}>Email: laziStore5@lazi.com</a>
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>
                  
                </section>

            </div>
        </React.Fragment>
    );
};

export default Contact;