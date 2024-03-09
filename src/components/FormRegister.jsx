import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import API_URL from '../config/Api';
import Loading from './Loading';

function FormRegister() {
  const [validated, setValidated] = useState(false);
  const [click,setClick] = useState(0);
  const [capcha,setCapcha] = useState(false);
  const [randCapcha,setRandCapcha] = useState(0);
  const [success,setSuccess] = useState(false);
  const [unSuccess,setUnSuccess] = useState(false);
  const [showPass,setShowPass] = useState(false);
  const [showConfirmPass,setShowConfirmPass] = useState(false);
  const [dataUser,setDataUser] = useState();
  const [loading,setLoading] = useState(false);
  const [message] = useState({
    error:'',
    name:'',
    email:'',
    password:'',
    password_confirmation:'',
  });
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password_confirmation:'',
    capcha:''
  });

  const handleData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(API_URL.concat("/dang-ky"),formData);
      const data = await response.data;
      if(response.status === 200){
        setDataUser(data);
        setSuccess(true);
        setUnSuccess(false);
        setLoading(false);
        message.name = '';
        message.email = '';
      }
    } catch (error) {
      // console.log(error.response.data.errors.name[0]);
      const data = error.response.data.errors;
      message.name = data.name[0];
      message.email = data.email[0];
      setUnSuccess(true);
      setLoading(false);

    }
  }

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const handleCheckCapcha = () =>{
    if(formData.capcha !==''){
      if(randCapcha != formData.capcha){
        message.error='Sai mã xác thực vui lòng nhập lại!';
        formData.capcha = '';
        setCapcha(true);
        setClick(4);
        return false;
      }
    }
    return true;
  };

  const handleCheckPass = () =>{
    if(formData.password === formData.password_confirmation){
      return true;
    }
    message.error = 'Mật khẩu chưa trùng khớp.Vui lòng bạn nhập lại!';
    formData.password_confirmation = '';
    return false;
  }

  useEffect(() => {
    if(success && !unSuccess){
      setLoading(true);
      if(dataUser){
        sessionStorage.setItem('userInfo', JSON.stringify(dataUser));
      }
      sessionStorage.setItem('hasLogin',true);
      setTimeout(()=> window.location.href = '/',1500);
    }
    if(click >= 8){
      setRandCapcha(Math.floor(10000 - Math.random() * 900000) + 1000000);
      setCapcha(true);
      setClick(0);
      return ;
    }
    
  },[click,success,unSuccess,dataUser]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (!form.checkValidity()) {
      event.stopPropagation();
      return setValidated(true);
    }
    setClick(click+1);  
    if(!handleCheckPass())return;    
    if(!handleCheckCapcha()) return;
    setCapcha(false);
    handleData();
  };

  const handleShowPass = (id) => {
    if(id === 'password'){
      setShowPass(!showPass);
      return;
    }
      setShowConfirmPass(!showConfirmPass);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustomUsername">
          <Form.Label>Tên người dùng <span className='text-danger'>*</span></Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              className="rounded rounded-3"
              type="text"
              placeholder="Họ và tên"
              name='name'
              onChange={handleChange}
              aria-describedby="inputGroupNameUser"
              autoComplete="name"
              required
            />
            <Form.Control.Feedback type="invalid" id='inputGroupNameUser'>
              Vui lòng không để trống trường này.
            </Form.Control.Feedback>
            {message.name && (<Form.Control.Feedback className='d-block' type="invalid" id={message.name}>
              {message.name}
            </Form.Control.Feedback>)}
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustomUserEmail">
          <Form.Label>Email người dùng<span className='text-danger'>*</span></Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              className="rounded rounded-3"
              type="email"
              placeholder="Nhập email của bạn"
              name='email'
              onChange={handleChange}
              aria-describedby="inputGroupEmail"
              autoComplete="email"
              required
            />
            <Form.Control.Feedback type="invalid" id='inputGroupEmail'>
              Vui lòng không để trống trường này.
            </Form.Control.Feedback>
            {message.email && (<Form.Control.Feedback className='d-block' type="invalid" id={message.email}>
              {message.email}
            </Form.Control.Feedback>)}
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustomUserPassword">
          <Form.Label>Mật khẩu <span className='text-danger'>*</span></Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              className="rounded rounded-3"
              type={showPass ?'text':'password'}
              placeholder="Mời nhập mật khẩu"
              name='password'
              onChange={handleChange}
              aria-describedby="inputGroupPassword"
              autoComplete="password"
              required
            />
            <InputGroup.Text className="bg-white rounded rounded-3" id="inputGroupPassword">
              <Button className='btn p-0 border-0 bg-white' type='button' onClick={()=>handleShowPass('password')}>
                {showPass?(<i className="far fa-eye"></i>):(<i className="far fa-eye-slash"></i>)}
              </Button>
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid" id='inputGroupPassword'>
              Vui lòng không để trống trường này.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustomUserConfirmPassword">
          <Form.Label>Xác nhận mật khẩu <span className='text-danger'>*</span></Form.Label>
          <InputGroup hasValidation>
            <Form.Control 
              className="rounded rounded-3"
              type={showConfirmPass ?'text':'password'}
              placeholder="Mời nhập lại mật khẩu"
              name='password_confirmation'
              value={formData.password_confirmation}
              aria-describedby='inputGroupConfirmPassword'
              onChange={handleChange}
              autoComplete="password_confirmation"
              required />
            <InputGroup.Text className="bg-white rounded rounded-3" id="inputGroupConfirmPassword">
              <Button className='btn p-0 border-0 bg-white' type='button' onClick={()=>handleShowPass('confirmPass')}>
                {showConfirmPass?(<i className="far fa-eye"></i>):(<i className="far fa-eye-slash"></i>)}
              </Button>
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid" id='inputGroupConfirmPassword'>
              {message.error !== ''?message.error:'Vui lòng không để trống trường này.'} 
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className='mb-4'>
        <Form.Group className="mb-3">
          <Form.Check
            className='rounded'
            required
            label="Đồng ý với chính sách và thỏa thuận *"
            feedback="Bạn cần đồng ý thỏa thuận mới có thể đăng ký."
            feedbackType="invalid"
          />
        </Form.Group>
        <div className='text-center text-sm'>
          { success && (<span className={'text-success'}>Đăng ký thành công</span>)}
          { unSuccess && (<span className={'text-danger'}> {message.error ? message.error : 'Đăng ký chưa thành công, vui lòng thử lại.'}</span>)}
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
      <div className='d-flex justify-content-center mb-4'>
        <Button type="submit" autoComplete="off" className={`w-50 rounded-3 fw-medium ${loading && 'disabled'}`} >{loading ?(<span>Đang đăng ký <Loading width={20} height={20}/> </span>):(<span>Đăng ký</span>)}</Button>
      </div>
    </Form>
  );
}

export default FormRegister;