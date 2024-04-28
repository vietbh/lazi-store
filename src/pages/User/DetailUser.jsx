import React, { useEffect, useState } from "react";
import BreadcrumbCustom from "@/components/BreadcrumbCustom";

const DetailUser = () => {
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {   
        const userInfos = JSON.parse(sessionStorage.getItem('userInfo'));
        if (userInfos) {
          setDataUser(userInfos);
        }
    },[])


    return (
        <React.Fragment>

            <main id="main" className="container main">
                <div className="bg-light d-flex align-items-center" style={{height:"16vh"}}>
                    <div className="container">
                        <h3 className="text-uppercase text-center" style={{fontFamily:"Roboto"}}>Khách hàng</h3>
                    </div>
                </div>
                <div className="mt-2">
                    <BreadcrumbCustom itemActive={"Thông tin cá nhân"}/>
                </div>
            
                <section className="section profile mb-4">
                    <div className="row">
                        <div className="col-xl-4">
                
                            <div className="card">
                                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                                {dataUser.image_url ? (<img src={dataUser.image_url} alt="Profile" className="rounded-circle mb-2" />) : 
                                (<div className="card bg-light mb-2 rounded-circle"><div className="card-body d-flex align-items-center" style={{height:"16vh"}}><span>Chưa có hình</span></div></div>)}
                                <h3 className="fw-medium" style={{fontFamily:"Roboto"}}>{dataUser && dataUser.name}</h3>
                                <p className="text-secondary text-sm">#{dataUser.id}</p>
                                <div className="social-links mt-2">
                                    <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                                    <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                                    <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                                    <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                                </div>
                                </div>
                            </div>
                
                        </div>
                
                        <div className="col-xl-8">
                
                            <div className="card">
                                <div className="card-body pt-3">
                                
                                    <ul className="nav nav-tabs nav-tabs-bordered mb-3">
                        
                                        <li className="nav-item me-3">
                                        <button className="nav-link fs-6 fw-normal p-2 rounded-3 active" data-bs-toggle="tab" data-bs-target="#profile-overview">Thông tin</button>
                                        </li>
                        
                                        <li className="nav-item  me-3">
                                        <button className="nav-link fs-6 fw-normal p-2 rounded-3 " data-bs-toggle="tab" data-bs-target="#profile-edit">Cập nhật thông tin</button>
                                        </li>
                        
                                        <li className="nav-item me-3">
                                        <button className="nav-link fs-6 fw-normal p-2 rounded-3" data-bs-toggle="tab" data-bs-target="#profile-settings">Cài đặt</button>
                                        </li>
                        
                                        <li className="nav-item me-3">
                                        <button className="nav-link fs-6 fw-normal p-2 rounded-3" data-bs-toggle="tab" data-bs-target="#profile-change-password">Đổi mật khẩu</button>
                                        </li>
                        
                                    </ul>
                                    <div className="tab-content pt-2">
                        
                                        <div className="tab-pane fade show active profile-overview" id="profile-overview">            
                                            <h5 className="card-title mb-5">Thông tin cá nhân</h5>
                            
                                            <div className="row mb-4">
                                                <div className="col-lg-3 col-md-4 label ">Họ và tên</div>
                                                <div className="col-lg-9 col-md-8">{dataUser.name}</div>
                                            </div>
                                                        
                                            <div className="row mb-4">
                                                <div className="col-lg-3 col-md-4 label">Địa chỉ</div>
                                                <div className="col-lg-9 col-md-8">{dataUser.id}</div>
                                            </div>
                            
                                            <div className="row mb-4">
                                                <div className="col-lg-3 col-md-4 label">Số điện thoại</div>
                                                <div className="col-lg-9 col-md-8">(436) 486-3538 x29071</div>
                                            </div>
                            
                                            <div className="row mb-4">
                                                <div className="col-lg-3 col-md-4 label">Email</div>
                                                <div className="col-lg-9 col-md-8">{dataUser.email}</div>
                                            </div>
                        
                                        </div>
                        
                                        <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                        
                                        <form>
                                            <div className="row mb-3">
                                            <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Avatar</label>
                                            <div className="col-md-8 col-lg-9">
                                                {dataUser.image_url ? (<img src={dataUser.image_url} alt="Profile" className="mb-2" />) : 
                                                (<div className="card bg-light mb-2 rounded-circle"><div className="card-body d-flex align-items-center" style={{height:"16vh"}}><span>Chưa có hình</span></div></div>)}
                                                <div className="pt-2">
                                                <a href="#" className="btn btn-primary btn-sm" title="Upload new profile image"><i className="bi bi-upload"></i></a>
                                                <a href="#" className="btn btn-danger btn-sm" title="Remove my profile image"><i className="bi bi-trash"></i></a>
                                                </div>
                                            </div>
                                            </div>
                        
                                            <div className="row mb-3">
                                            <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Họ Và Tên</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="fullName" type="text" className="form-control" id="fullName" value="Kevin Anderson" />
                                            </div>
                                            </div>
                                                                
                                            <div className="row mb-3">
                                            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="email" type="email" className="form-control" id="Email" value={dataUser.email}/>
                                            </div>
                                            </div>
                        
                                            <div className="text-center">
                                            <button type="submit" className="btn btn-primary rounded-pill">Cập nhật</button>
                                            </div>
                                        </form>
                        
                                        </div>
                        
                                        <div className="tab-pane fade pt-3" id="profile-settings">
                        
                                            <form>
                            
                                                <div className="row mb-3">
                                                <label htmlFor="#" className="col-md-4 col-lg-3 col-form-label">Thông báo Email</label>
                                                <div className="col-md-8 col-lg-9">
                                                    <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="changesMade" checked />
                                                    <label className="form-check-label" htmlFor="changesMade">
                                                        Changes made to your account
                                                    </label>
                                                    </div>
                                                    <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="newProducts" checked />
                                                    <label className="form-check-label" htmlFor="newProducts">
                                                        Information on new products and services
                                                    </label>
                                                    </div>
                                                    <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="proOffers" />
                                                    <label className="form-check-label" htmlFor="proOffers">
                                                        Marketing and promo offers
                                                    </label>
                                                    </div>
                                                    <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="securityNotify" checked disabled />
                                                    <label className="form-check-label" htmlFor="securityNotify">
                                                        Security alerts
                                                    </label>
                                                    </div>
                                                </div>
                                                </div>
                            
                                                <div className="text-center">
                                                <button type="submit" className="btn btn-primary rounded-pill">Xác nhận</button>
                                                </div>
                                            </form>
                        
                                        </div>
                        
                                        <div className="tab-pane fade pt-3" id="profile-change-password">
                                    
                                            <form>
                            
                                                <div className="row mb-3">
                                                <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Mật khẩu cũ</label>
                                                <div className="col-md-8 col-lg-9">
                                                    <input name="password" type="password" className="form-control" id="currentPassword" />
                                                </div>
                                                </div>
                            
                                                <div className="row mb-3">
                                                <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">Mật khẩu mới</label>
                                                <div className="col-md-8 col-lg-9">
                                                    <input name="newpassword" type="password" className="form-control" id="newPassword" />
                                                </div>
                                                </div>
                            
                                                <div className="row mb-3">
                                                <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Nhập lại mật khẩu</label>
                                                <div className="col-md-8 col-lg-9">
                                                    <input name="renewpassword" type="password" className="form-control" id="renewPassword" />
                                                </div>
                                                </div>
                            
                                                <div className="text-center">
                                                <button type="submit" className="btn btn-primary rounded-pill">Xác nhận</button>
                                                </div>
                                            </form>
                        
                                        </div>
                        
                                    </div>
                    
                                </div>
                            </div>
                
                        </div>
                    </div>
                </section>
            
            </main>
    

        </React.Fragment>
    );
};

export default DetailUser;