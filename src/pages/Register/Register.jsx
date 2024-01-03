import { Link } from "react-router-dom";
import FormRegister from "../../components/FormRegister";

function Register(){
    return(
        <>
             <section>
                <div className="container my-4">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-9 col-md-8 p-0">
                                <div className="card">
                                    <div className="card-header bg-white">
                                        <div className="card-title">
                                            <h2 className="fw-bold fs-3 text-center my-2">ĐĂNG KÝ</h2>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <FormRegister />
                                    </div>
                                    <div className="card-footer bg-white">
                                        <p>Bạn đã có tài khoản.Hãy đăng nhập <Link to={`/dang-nhap`}>ở đây</Link></p>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </section>
            
        </>
    )
}
export default Register;