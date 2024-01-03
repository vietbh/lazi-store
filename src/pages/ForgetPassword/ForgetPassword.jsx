import React from 'react';
import FormForgetPassword from '../../components/FormForgetPassword';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
    return (
        <>
            
            <section>
                <div className="container my-4">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-7 col-md-8 col-sm-8 p-0">
                                <div className="card">
                                    <div className="card-header bg-white">
                                        <div className="card-title">
                                            <h2 className="fw-bold fs-3 text-center my-2">Quên mật khẩu</h2>
                                        </div>
                                    </div>
                                    <div className="card-body mb-3">
                                        <FormForgetPassword />
                                    </div>
                                    <div className="card-footer bg-white">
                                        <p className='m-0'>Bạn có tài khoản.Hãy đăng nhập <Link to={`/dang-nhap`}>ở đây</Link></p>
                                        <p>Bạn chưa có tài khoản.Hãy đăng ký <Link to={`/dang-ky`}>ở đây</Link></p>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default ForgetPassword;