import FormLogin from "../../components/FormLogin";
import styles from "./styles.module.css";
import URL_PATH from "../../config/UrlPath";

function Login(){
    return(
        <section >
            <div className={`container my-4 ${styles.widthForm}`} >
                <div className={`row d-flex justify-content-center`}>
                    <div className="col-lg-6 col-md-9 col-sm-12 p-0">
                        <div className={`card border ${styles.borderCard}`}>
                            <div className={`card-body border ${styles.borderCard}`}>
                                <div className="card-title">
                                    <h2 className=" fw-bold fs-3 text-center my-2">ĐĂNG NHẬP</h2>
                                </div>
                                <FormLogin/>
                                <p>Bạn chưa có tài khoản.Hãy đăng ký<a className="ps-1" href={'/'+URL_PATH+'/dang-ky'}>ở đây</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;