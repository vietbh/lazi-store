import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import API_URL from "../../src/config/Api";
import URL_PATH from '../config/UrlPath';
import Loading from './Loading';


function FormLogin() {
  const [validated, setValidated] = useState(false);
  const [click,setClick] = useState(1);
  const [capcha,setCapcha] = useState(false);
  const [randCapcha,setRandCapcha] = useState(0);
  const [showPass,setShowPass] = useState(false);
  const [message] = useState({error:''});
  const [success,setSuccess] = useState(false);
  const [unSuccess,setUnSuccess] = useState(false);
  const [loading,setLoading] = useState(false);
  const [dataUser,setDataUser] = useState();
  const [formData,setFormData] = useState({
    email:'',
    password:'',
    rememberMe:false,
    capcha:''
  });
  const url = '/'+URL_PATH+'/';
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
        setDataUser(data);
        console.log(data);
        setSuccess(true);
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
        setTimeout(()=> window.location.href = url,1500);
      }
    }
    return true;
  };

  const handleLoginGoogle = () =>{
    sessionStorage.setItem('userInfo',JSON.stringify([{
      'id':1,
      'name':'Google',
      'email':'asdlknad@gmail.com',
    }]));
    setSuccess(true);
    setUnSuccess(false);
  }

  const handleLoginFaceBook = () =>{
    sessionStorage.setItem('userName','FB');
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
      sessionStorage.setItem('userInfo', JSON.stringify(dataUser));
      sessionStorage.setItem('hasLogin',true);
      setTimeout(()=> history.go(-1),1500);
    }
    if(click >= 8){
      setRandCapcha(Math.floor(10000 - Math.random() * 900000) + 1000000);
      setCapcha(true);
      setClick(0);
      return ;
    }
    if(formData.rememberMe){
      localStorage.setItem('email',formData.email);
      localStorage.setItem('user',formData);
    }
  },[click,success,formData,unSuccess,url,dataUser]);

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
            <Form.Control
              className='border rounded-2'
              type="email"
              placeholder="Nhập tài khoản email "
              aria-describedby="inputGroupPrepend"
              name='email'
              value={formData.email}
              onChange={handleChange}
              autoComplete='email'
              required
            />
            <Form.Control.Feedback type="invalid">
              {formData.email == '' ? 'Vui lòng nhập trường này.' : 'Vui lòng nhập đúng định dạng email.'}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <InputGroup hasValidation>
            <Form.Control 
              className='border rounded-2'
              type={showPass ?'text':'password'}
              placeholder="Vui lòng nhập mật khẩu"
              name='password'
              value={formData.password}
              onChange={handleChange}
              autoComplete='password'
              aria-describedby='validationPassword'
              required
              />
              <InputGroup.Text className='bg-white border rounded-2' id="validationPassword">
                <Button className="btn p-0 border-0 bg-white" type='button' onClick={handleShowPass}>
                  {showPass?
                    (<span><i className="far fa-eye"></i></span>
                    ):(<i className="far fa-eye-slash"></i>
                  )}
                </Button>
               </InputGroup.Text>
              {/**
             */}
            <Form.Control.Feedback type="invalid">
            Vui lòng nhập trường này.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      
      <Row className='mb-4'>
        <div className='text-start mb-4'>
          <span className='text-secondary text-sm'>Trang web này được bảo vệ bởi reCAPTCHA và Google
          <a className='ps-1' href="https://policies.google.com/privacy">Privacy Policy</a> và
          <a className='ps-1' href="https://policies.google.com/terms">Terms of Service</a> apply.</span>
        </div>
        <Form.Group className="mb-0 d-flex justify-content-between" noValidate>
          <Form.Check
            className="rounded-3 text-dark"
            label="Nhớ mật khẩu"
            name='rememberMe'
            checked={formData.rememberMe}
            onChange={handleChange}
            noValidate
          />
          <Link className='float-end' to={'/lazi-store/quen-mat-khau'}>Quên mật khẩu</Link>
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
        <Button type="submit" className={`w-50 rounded-3 fw-medium ${loading && 'disabled'}`} >{loading ?(<span>Đang đăng nhập <Loading width={20} height={20}/> </span>):(<span>Đăng nhập</span>)}</Button>
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
          <Button className='text-start w-75 fw-bold btn-light rounded-2' type='button' onClick={handleLoginGoogle}><i className="fab fa-google"></i> Đăng nhập bằng Google</Button>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col className='d-flex justify-content-center'>
          <Button className='text-start w-75 fw-bold btn-light rounded-2' type='button' onClick={handleLoginFaceBook}><i className="fab fa-facebook-square"></i> Đăng nhập bằng Facebook</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default FormLogin;