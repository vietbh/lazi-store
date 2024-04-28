import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PropTypes from 'prop-types';

function BreadcrumbCustom({
    item=[],
    itemActive="",
}) {
  return (
    <div className='container-fluid'>
      <Breadcrumb >
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        {item.name && (<Breadcrumb.Item href={'/danh-muc/'+item.slug+'.html'}>{item.name}</Breadcrumb.Item>)}
        {itemActive && (<Breadcrumb.Item active>{itemActive}</Breadcrumb.Item>)}
      </Breadcrumb>
    </div>
  );
}
BreadcrumbCustom.propTypes = {
    item: PropTypes.array,
    itemActive: PropTypes.string,
}
export default BreadcrumbCustom;