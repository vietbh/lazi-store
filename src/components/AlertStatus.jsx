import { checkPropTypes } from 'prop-types';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const AlertStatus = ({ type,title }) => {
  useEffect(() => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      padding:"0.5rem 1rem",
      heightAuto:true,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      showCloseButton: true,
      allowEscapeKey:true,
    });

    Toast.fire({
      icon: type ?? 'success',
      title: title ?? 'Gửi đi thành công'
    });
  }, [type, title]);

  return null;
};
AlertStatus.propTypes = {
  type: checkPropTypes.string,
  title: checkPropTypes.string,
}

export default AlertStatus;