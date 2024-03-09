import FormRegister from "../../components/FormRegister";
import styles from "./styles.module.css";
import URL_PATH from "../../config/UrlPath";

function Register(){
    return(
        <section>
           <div className={`container my-4 ${styles.widthForm}`}>
               <div className="row d-flex justify-content-center">
                   <div className="col-lg-9 col-md-8 p-0">
                           <div className={`card border ${styles.borderCard}`}>
                               <div className="card-body">
                                    <div className="card-title mb-4">
                                        <h2 className="fw-bold fs-3 text-center my-2">ĐĂNG KÝ</h2>
                                    </div>
                                    <FormRegister />
                                    <p>Bạn đã có tài khoản.Hãy đăng nhập <a href={'/'+URL_PATH+'/dang-nhap.html'}>ở đây</a></p>
                               </div>
                           </div>
                   </div>
               </div>
           </div>
        </section>
    )
}
export default Register;