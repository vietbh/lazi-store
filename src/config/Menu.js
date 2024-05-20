const menuLefts = [
  { id: 1, name: 'Trang chủ', link: '/', icon: 'fas fa-home me-1 text-gray'},
  { id: 2, name: 'Danh mục', link: '/danh-muc#list', icon: 'fas fa-list-alt me-1 text-gray'},
  { id: 3, name: 'Tin tức', link: 'http://localhost:8000/blog', href: true, icon: 'fas fa-newspaper me-1 text-gray'},
  { id: 4, name: 'Liên hệ', link: '/lien-he.html', icon: 'fas fa- me-1 text-gray'},
];

const menuListLogin = [
  { id: 1, name: 'Đăng nhập', link: '/dang-nhap.html', show: true },
  { id: 2, name: 'Đăng ký', link: '/dang-ky.html', show: false },
];

const menuRights = [
  { id: 1, name: 'Giỏ hàng', link: '/gio-hang.html', icon: 'fas fa-dolly-flatbed me-1 text-gray' },
  // { id: 2, name: 'Thông báo', link: '/thong-bao.html', icon: 'far fa-heart me-1 text-gray' },
];

const loginSettings = [
  { id: 1, name: 'Thông tin khách hàng', link: '/thong-tin-khach-hang.html' },
  // { id: 2, name: 'Lịch sử đặt hàng', link: '/lich-su.html' },
  // { id: 3, name: 'Quá trình giao hàng', link: '/giao-hang.html' },
  { id: 4, name: 'Mã giảm giá', link: '/ma-giam-gia.html' },
  { id: 5, name: 'Đăng xuất', link: '/', logout: true },
];

export { menuLefts, menuListLogin, menuRights, loginSettings }