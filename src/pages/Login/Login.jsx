import { Link } from "react-router-dom";
import FormLogin from "../../components/FormLogin";
function Login(){
    return(
        <>
            <section>
                <div className="container my-4">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-6 col-md-9 col-sm-12 p-0">
                                <div className="card">
                                    <div className="card-header bg-white">
                                        <div className="card-title ">
                                            <h2 className=" fw-bold fs-3 text-center my-2">ĐĂNG NHẬP</h2>
                                        </div>
                                    </div>
                                    <div className="card-body mb-3">
                                        <FormLogin />
                                    </div>
                                    <div className="card-footer bg-white">
                                        <p>Bạn chưa có tài khoản.Hãy đăng ký <Link to={`/dang-ky`}>ở đây</Link></p>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;