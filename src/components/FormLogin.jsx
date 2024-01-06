import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import API_URL from "../../src/config/Api";


function FormLogin() {
  const [validated, setValidated] = useState(false);
  const [click,setClick] = useState(1);
  const [capcha,setCapcha] = useState(false);
  const [randCapcha,setRandCapcha] = useState(0);
  const [showPass,setShowPass] = useState(false);
  const [message] = useState({
    error:''
  });
  const [success,setSuccess] = useState(false);
  const [unSuccess,setUnSuccess] = useState(false);
  const [loading,setLoading] = useState(false);
  const [formData,setFormData] = useState({
    email:'',
    password:'',
    rememberMe:false,
    capcha:''
  });

  const handleChange = (e) =>{
    const { name, value,checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'rememberMe' ? checked : value,
    }));
  }

   // Api login 
   const fetchLogin = async () => {
    try {
      const response = await axios.post(API_URL.concat('/login'),formData);
      const data = await response.data;
      if(response.status === 200){
        console.log(response);
        localStorage.setItem('userName',data[1]);
        setSuccess(true);
      }else{
        console.log('ao ma');
        setLoading(false);
        setUnSuccess(true);
      }
    } catch (error) {
      setLoading(false);
      setUnSuccess(true);
    }

  }

  const checkCapcha = () =>{
    if(formData.capcha !==''){
      if(randCapcha != formData.capcha){
        message.error = ('Sai mã xác thực vui lòng nhập lại!');
        formData.capcha = '';
        setCapcha(true);
        setClick(4);
        return false;
      }else{
        fetchLogin();
        setSuccess(true);
        setCapcha(false);
        setTimeout(()=> window.location.href = '/lazi-store',3000);
      }
    }
    return true;
  };

  const handleLoginGoogle = () =>{
    localStorage.setItem('userName','Google');
    setSuccess(true);setUnSuccess(false);
  }

  const handleLoginFaceBook = () =>{
    localStorage.setItem('userName','FB');
    setSuccess(true);setUnSuccess(false)
  }

  // const handleReCapcha = () =>{
  //   grecaptcha.ready(() => {
  //     grecaptcha.render('html_element', {
  //        'sitekey' : 'v2_site_key'
  //     });
  //   });
 
  //   function onSubmit() {
  //     grecaptcha.ready(() => {
  //         grecaptcha.execute('v3_site_key', {action: 'homepage'}).then((token) => {
  //            ...
  //         });
  //     });
  //   }
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
      return setValidated(true);
    }
    setClick(click+1);
    setLoading(true);
    setUnSuccess(false);
    if(!checkCapcha()) return;
    fetchLogin();
    if(!success) return ;
    setUnSuccess(false);
    setSuccess(true);
    setCapcha(false);
  };
 
  useEffect(() => {
    if(success && !unSuccess){
      setLoading(true);
      localStorage.setItem('hasLogin',true);
      setTimeout(()=> window.location.href = '/lazi-store/',3000);
    }
    if(click >= 8){
      setRandCapcha(Math.floor(10000 - Math.random() * 900000) + 1000000);
      setCapcha(true);
      setClick(0);
      return ;
    }
    if(formData.rememberMe){
      localStorage.setItem('email',formData.email);
    }
  },[click,success,formData,unSuccess]);

  const handleShowPass = () => {
    setShowPass(!showPass);
    return;
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustomUsername">
          <Form.Label>Tài khoản Email</Form.Label>
          <InputGroup hasValidation>
            {/* <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text> */}
            <Form.Control
              type="email"
              placeholder="Nhập tài khoản email "
              aria-describedby="inputGroupPrepend"
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              {formData.email == ''?'Vui lòng nhập trường này.':'Vui lòng nhập đúng định dạng email.'}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <InputGroup hasValidation>
            <Form.Control 
              type={showPass ?'text':'password'}
              placeholder="Vui lòng nhập mật khẩu"
              name='password'
              value={formData.password}
              onChange={handleChange}
              aria-describedby='validationPassword'
              required
              />
              <InputGroup.Text className='bg-white' id="validationPassword">
                 <Button className='btn p-0 border-0 bg-white' type='button' onClick={handleShowPass}>
                   {showPass?
                     (<i className="far fa-eye"></i>
                     ):(<i className="far fa-eye-slash"></i>
                   )}
                 </Button>
               </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
            Vui lòng nhập trường này.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      
      <Row className='mb-4'>
        <div className='text-start'>
          <span className='text-secondary'>Trang web này được bảo vệ bởi reCAPTCHA và Google</span>
          <a href="https://policies.google.com/privacy">Privacy Policy</a> và
          <a href="https://policies.google.com/terms">Terms of Service</a> apply.
          {' '}
        </div>
        <Form.Group className="mb-0 d-flex justify-content-between" noValidate>
          <Form.Check
            className="text-dark"
            label="Nhớ mật khẩu"
            name='rememberMe'
            checked={formData.rememberMe}
            onChange={handleChange}
            noValidate
          />
          <Link className='float-end' to={'/quen-mat-khau'}>Quên mật khẩu</Link>
        </Form.Group>
        <div className='text-center text-sm'>
          
          { success && (<span className={'text-success'}>Đăng nhập thành công</span>)}
          { unSuccess && (<span className={'text-danger'}>Tài khoản chưa được đăng ký, vui lòng thử lại</span>)}
        </div>
      </Row>
        
      {capcha && (
        <Row className="mb-3">
      <Form.Group as={Col} md="12" >
        <Form.Label>Mã xác thực</Form.Label>
        <Form.Control
          type="text"
          aria-describedby="inputGroupPrepend"
          value={randCapcha}
          disabled
          />
        <InputGroup hasValidation>
          <Form.Control
            type="text"
            placeholder="Nhập lại mã xác thực"
            aria-describedby="inputGroupPrependCapcha"
            name='capcha'
            value={formData.capcha}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            {message.error !== '' && capcha ? message.error:'Vui lòng nhập trường này.'} 
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    </Row>
      )}
      
      <div className='d-flex justify-content-center mb-3'>
        <Button type="submit"   className={`w-50 rounded-3 fw-medium ${loading && 'disabled'} `}>{loading ?(<span>Đang đăng nhập...</span>):(<span>Đăng nhập</span>)}</Button>
      </div>
      <Row>
        <Col lg={4} md={3} sm={3}>
        <hr/>
        </Col>
        <Col lg={4} md={6} sm={6}>
        <p className='p-1 text-center text-secondary fw-bold'>Hoặc bằng</p>
        </Col>
        <Col lg={4} md={3} sm={3}>
        <hr/>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col className='d-flex justify-content-center' >
          <Button className='w-50 fw-bold btn-light rounded-2' type='button' onClick={handleLoginGoogle}><i className="fab fa-google"></i> Đăng nhập bằng Google</Button>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col className='d-flex justify-content-center'>
          <Button className='w-50 fw-bold btn-light rounded-2' type='button' onClick={handleLoginFaceBook}><i className="fab fa-facebook-square"></i> Đăng nhập bằng Facebook</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default FormLogin;