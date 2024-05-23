import api from "@/config/axios";

const getCartItems = async () => {
  const user = JSON.parse(sessionStorage.getItem('userInfo'));

  if (!user) {
    console.log('Người dùng chưa được xác thực.');
    return;
  }

  try {
    const response = localStorage.getItem('cart');

    if (response) {
      sessionStorage.setItem('itemsCart', JSON.stringify(response.data));
      sessionStorage.setItem('countCart', JSON.stringify(response.data.products.length));
      return response.data;
    } else {
      console.log('Yêu cầu xem giỏ hàng không thành công.');
      return { 'errors': 'Xem giỏ hàng không thành công' };
    }
  } catch (error) {
    console.log('Đã xảy ra lỗi khi gửi yêu cầu xem giỏ hàng:', error);
  }
}

const updateCartItem = async (product, type) => {
  const user = JSON.parse(sessionStorage.getItem('userInfo'));

  if (!user) {
    console.log('Người dùng chưa được xác thực.');
    return;
  }

  try {
    const response = await api.post('gio-hang/cap-nhat-san-pham', { cart: user.cart_id, product, type });
    if (response.status === 200) {
      console.log('Sản phẩm đã được cập nhật thành công.');
      getCartItems()
      return response.status;
    } else {
      console.log('Yêu cầu cập nhật sp giỏ hàng không thành công.');
      return { 'errors': 'cập nhật sp giỏ hàng không thành công' };
    }
  } catch (error) {
    console.log('Đã xảy ra lỗi khi gửi yêu cầu cập nhật:', error);
  }
}

const removeCartItem = async (product) => {
  const user = JSON.parse(sessionStorage.getItem('userInfo'));

  if (!user) {
    console.log('Người dùng chưa được xác thực.');
    return;
  }

  try {
    const response = await api.post('gio-hang/xoa-san-pham', { cart: user.cart_id, product: product });
    if (response.status === 200) {
      console.log('Sản phẩm đã được xóa thành công.');
      getCartItems();
      return response.status;
    } else {
      console.log('Yêu cầu xóa sp giỏ hàng không thành công.');
      return { 'errors': 'Xóa sp giỏ hàng không thành công' };
    }
  } catch (error) {
    console.log('Đã xảy ra lỗi khi gửi yêu cầu xóa:', error);
  }
}

export { getCartItems, removeCartItem, updateCartItem }