import { useState } from 'react';
import API_URL from '../../config/Api';
import Header from '../../layouts/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout2 = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const [orderNumber, setOrderNumber] = useState('');
    const navigate = useNavigate();
    // Handle change functions fo   r new state variables
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleOrderNumberChange = (e) => {
        setOrderNumber(e.target.value);
    };

    const handleFullnameChange = (e) => {
        setFullName(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const product = JSON.parse(sessionStorage.getItem('cart'));
        const order = {
            full_name: fullName || "Anonymous",
            email: email,
            phone_number: phoneNumber,
            address: `${address}`,
            total: product.reduce((total, item) => total + item.price * item.quantity, 0) || 100000,
            user_id: 1,
            order_number: Math.floor(Math.random() * 1000000),
            date_create: new Date().toISOString().split('T')[0],
            time_create: new Date().toISOString().split('T')[1].split('.')[0],
            items: product.map(item => ({
                product_id: item.id,
                quantity: item.quantity,
                price: item.price
            })),
        };
        console.log(order);

        try {
            const response = await axios.post(`${API_URL}/checkout`, order, {
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                alert('Order successfully');
                navigate('/');
            } else {
                alert('Order failed');
            }
        } catch (error) {
            console.error('Error occurred during checkout:', error);
            alert('Order failed');
        }
    };

    return (
        <div>
            <Header />
            <div className="container">
                <h2 className="my-4">Checkout</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Fullname:</label>
                        <input type="text" className="form-control" value={fullName || ''} onChange={handleFullnameChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="email" className="form-control" value={email || ''} onChange={handleEmailChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone Number:</label>
                        <input type="tel" className="form-control" value={phoneNumber || ''} onChange={handlePhoneNumberChange} />
                    </div>
                   
                    <div className="mb-3">
                        <label className="form-label">Address:</label>
                        <textarea className="form-control" value={address || ''} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Checkout2;