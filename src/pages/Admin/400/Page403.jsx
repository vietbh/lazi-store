import { Link } from "react-router-dom";

function Page403() {
    return (
        <>
            <div className="h-100 w-100 text-center align-content-lg-center">
                <h3 style={{height:500}}>
                    <p>Không tồn tại trang này. <Link className="text-decoration-underline fs-4" to={'/'}>Trở lại trang chủ</Link></p>
                    <p className="text-warning" style={{fontSize:260}}>403</p>
                </h3>
            </div>
        </>
    );
}

export default Page403;