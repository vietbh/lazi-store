import { useEffect, useState } from 'react';
import Header from '../../layouts/Header';
import { useNavigate } from 'react-router-dom';

const CartDisplay = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const storedCart = sessionStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    console.log(cart);

    return (
        <div>
            <Header />
            {cart.length > 0 ? (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((product, index) => (
                                        <tr key={index}>
                                            <th scope="row"></th>
                                            <td>{product.name}</td>
                                            <td>{product.variant?.price || null}</td>
                                            <td>{product.variant?.quantity || null}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="row">
                                <div className="col-12">
                                    <button className="btn btn-primary" onClick={() => navigate('/checkout')} > Thanh toán</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <p>Không có sản phẩm trong giỏ hàng.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartDisplay;