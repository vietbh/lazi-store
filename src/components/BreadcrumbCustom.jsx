import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PropTypes from 'prop-types';
import React from 'react';

function BreadcrumbCustom({itemActive="", item=[]}) {

  const parent = item?.map((value, index) => {
    if(value.name){
      return(
        <Breadcrumb.Item key={index} href={'/danh-muc/'+value.slug+'.html'}>{value.name}</Breadcrumb.Item>
      );
    }
  });

  return (
    <React.Fragment>
      <div className='container-fluid'>
        <Breadcrumb >
          <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
          {item && parent}
          {itemActive && (<Breadcrumb.Item active>{itemActive}</Breadcrumb.Item>)}
        </Breadcrumb>
      </div>
    </React.Fragment>
  );
}
BreadcrumbCustom.propTypes = {
    item: PropTypes.array,
    itemActive: PropTypes.string,
}
export default BreadcrumbCustom;