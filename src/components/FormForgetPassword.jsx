import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import API_URL from '../config/Api';

function FormForgetPassword() {
  const [validated, setValidated] = useState(false);
  const [click,setClick] = useState(0);
  const [formData,setFormData] = useState({
    email:'',
    password:'',
    rememberMe:false,
    capcha:''
  });
  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const fetchData = async()=>{
    try {
      const response = await axios.post(API_URL.concat('/quen-mat-khau'),formData)
      if(response.ok){
        const data = await response.data;
        console.log(data);
      }
    } catch(error) {
      console.log(error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setClick(click+1);
    setValidated(true);
    fetchData()
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-2 d-flex justify-content-center">
        <Form.Group as={Col} md="8" controlId="validationCustomUsername">
          <Form.Label>Email <span className='text-danger'>*</span></Form.Label>
          <InputGroup hasValidation>
            {/* <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text> */}
            <Form.Control
              type="email"
              name="email"
              className='rounded-3'
              placeholder="Nhập tài khoản email"
              aria-describedby="inputGroupPrepend"
              autoComplete='email'
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập tài khoản email bạn đã đăng ký.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <div className='d-flex justify-content-center '>
        <Button type="submit"  className='w-50 rounded-3 fw-medium mt-4'>Lấy lại mật khẩu</Button>
      </div>
    </Form>
  );
}

export default FormForgetPassword;