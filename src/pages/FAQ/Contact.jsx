
const Contact = () => {
    return (
        <>    
            <div className="content-wrapper mt-4">
            
                <section className="content">
                <div className="card border-0">
                    <div className="card-body row">
                    <div className="col-5 text-center d-flex align-items-center justify-content-center">
                        <div className="p-2">
                            <h2 >LAZI <strong>STORE</strong></h2>
                            <p className="flex-lg-nowrap mb-4">123 Công viên phần mềm Quang Trung,Q12,TP.Hồ Chí Minh<br/>
                                Phone: +84012345678910
                            </p>
                        </div>
                    </div>
                    <div className="col-7">
                        <div className="form-group">
                        <label htmlFor="inputName">Tên của bạn</label>
                        <input type="text" id="inputName" className="form-control" />
                        </div>
                        <div className="form-group">
                        <label htmlFor="inputEmail">E-Mail</label>
                        <input type="email" id="inputEmail" className="form-control" />
                        </div>
                        <div className="form-group">
                        <label htmlFor="inputSubject">Tiêu đề</label>
                        <input type="text" id="inputSubject" className="form-control" />
                        </div>
                        <div className="form-group">
                        <label htmlFor="inputMessage">Lời nhắn</label>
                        <textarea id="inputMessage" className="form-control" rows="4"></textarea>
                        </div>
                        <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Gửi thông tin"/>
                        </div>
                    </div>
                    </div>
                </div>
            
                </section>
                {/**
                // <div className="content-wrapper">

                // </div>
                */}
            </div>
        </>
    );
};

export default Contact;