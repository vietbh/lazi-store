import React from "react";

const Overview = (dataUser) => {

  return (
    <React.Fragment>
      <div
        className="tab-pane fade show active profile-overview" id="profile-overview">
        <h5 className="card-title mb-5">Thông tin cá nhân</h5>

        <div className="row mb-4">
          <div className="col-lg-3 col-md-4 label ">Họ và tên</div>
          <div className="col-lg-9 col-md-8">{dataUser.dataUser?.name}</div>
        </div>

        <div className="row mb-4">
          <div className="col-lg-3 col-md-4 label">Email</div>
          <div className="col-lg-9 col-md-8">{dataUser.dataUser?.email}</div>
        </div>

        <div className="row mb-4">
          <div className="col-lg-3 col-md-4 label">Địa chỉ</div>
          <div className="col-lg-9 col-md-8">Đang cập nhật</div>
        </div>

        <div className="row mb-4">
          <div className="col-lg-3 col-md-4 label">Số điện thoại</div>
          <div className="col-lg-9 col-md-8">Đang cập nhật</div>
          {/*(436) 486-3538 x29071 */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Overview;
