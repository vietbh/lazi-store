import api from '@/config/axios';

const detailProduct = async(slug) => {
    try {
        const response = await api.get('/san-pham/'.concat(slug));
        if (response.status === 200) {
          return response.data;         
        }
      } catch (error) {
        console.log(error); 
      }
}
const addProduct = async (product) => {
  const user = JSON.parse(sessionStorage.getItem('userInfo'));

  if (!user) {
    console.log('Người dùng chưa được xác thực.');
    return 401;
  }

  try {
    const response = await api.post('gio-hang/them-san-pham', { product: product.id, cart: user.cart_id });

    if (response.status === 200) {
      console.log('Sản phẩm đã được thêm vào giỏ hàng thành công.');
      console.log(response.data);
      return response.data;
    } else {
      console.log('Yêu cầu thêm sản phẩm vào giỏ hàng không thành công.');
      return {'errors':'Thêm sản phẩm không thành công'};
    }
  } catch (error) {
    console.log('Đã xảy ra lỗi khi gửi yêu cầu thêm sản phẩm vào giỏ hàng:', error);
  }
}
export {detailProduct,addProduct}