import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import API_URL from '../config/Api';
import { useNavigate } from 'react-router-dom';

function FormLogin() {
  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user.email, user.password);

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: user.email,
        password: user.password
      }, {
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (response.status === 200) {
        setUser(response.data.data);
        sessionStorage.setItem('hasLogin', true);
        sessionStorage.setItem('userInfo', JSON.stringify(user));
        alert('Login success');
        navigate('/');
      } else {
        alert('Login failed');
      }
    }
    catch (error) {
      alert('Wrong email or password');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <InputGroup>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={user.email || ''}
            onChange={e => setUser({
              ...user,
              email: e.target.value
            })}
            required
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={user.password || ''}
            onChange={e => setUser({
              ...user,
              password: e.target.value
            })}
            required
          />
          <InputGroup.Text className="bg-white rounded rounded-3" id="inputGroupConfirmPassword">
            <Button className='btn p-0 border-0 bg-white' type='button' onClick={() => { setShowPassword(!showPassword) }}>
              {showPassword ? (<i className="far fa-eye"></i>) : (<i className="far fa-eye-slash"></i>)}
            </Button>
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Button variant="primary" type="submit" className='mt-3 rounded-2'>
        Submit  
      </Button>
    </Form>
  );
}

export default FormLogin;