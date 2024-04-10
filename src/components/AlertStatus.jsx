import { useEffect } from 'react';
import Swal from 'sweetalert2';

const AlertStatus = ({ type,title }) => {
  useEffect(() => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    //   didOpen: (toast) => {
    //     toast.addEventListener('mouseenter', Swal.stopTimer);
    //     toast.addEventListener('mouseleave', Swal.resumeTimer);
    //   }
    });

    Toast.fire({
      icon: type ?? 'success',
      title: title ?? 'Gửi đi thành công'
    });
  }, [type, title]);

  return null;
};


export default AlertStatus;