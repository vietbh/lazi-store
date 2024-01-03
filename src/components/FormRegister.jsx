import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function FormRegister() {
  const [validated, setValidated] = useState(false);
  const [click,setClick] = useState(0);
  const [capcha,setCapcha] = useState(false);
  const [randCapcha,setRandCapcha] = useState(0);
  const [success,setSuccess] = useState(false);
  const [showPass,setShowPass] = useState(false);
  const [showConfirmPass,setShowConfirmPass] = useState(false);
  // console.log(showPass.password);
  const [message] = useState({
    success:'',
    error:''
  });
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:'',
    confirm_password:'',
    capcha:''
  });

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
    if(formData.password === formData.confirm_password){
      return true;
    }
    message.error = 'Mật khẩu chưa trùng khớp.Vui lòng bạn nhập lại!';
    formData.confirm_password = '';
    return false;
  }

  useEffect(() => {
    if(click >= 8){
      setRandCapcha(Math.floor(10000 - Math.random() * 900000) + 1000000);
      setCapcha(true);
      setClick(0);
      return ;
    }
    
  },[click]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (!form.checkValidity()) {
      event.stopPropagation();
      return setValidated(true);
    }
    
    setClick(click+1);  
    if(!handleCheckPass())return;    
    // setValidated(true);
    if(!handleCheckCapcha()) return;
    setCapcha(false);
    setSuccess(true);
    message.success='Đăng ký thành công';
    setTimeout(()=> window.location.href = '/',2000);
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
              type="text"
              placeholder="Họ và tên"
              name='name'
              onChange={handleChange}
              aria-describedby="inputGroupNameUser"
              required
            />
            <Form.Control.Feedback type="invalid" id='inputGroupNameUser'>
              Vui lòng không để trống trường này.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustomUserEmail">
          <Form.Label>Email người dùng<span className='text-danger'>*</span></Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="email"
              placeholder="Nhập email của bạn"
              name='email'
              onChange={handleChange}
              aria-describedby="inputGroupEmail"
              required
            />
            <Form.Control.Feedback type="invalid" id='inputGroupEmail'>
              Vui lòng không để trống trường này.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustomUserPassword">
          <Form.Label>Mật khẩu <span className='text-danger'>*</span></Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type={showPass ?'text':'password'}
              placeholder="Mời nhập mật khẩu"
              name='password'
              onChange={handleChange}
              aria-describedby="inputGroupPassword"
              required
            />
            <InputGroup.Text className='bg-white ' id="inputGroupPassword"><Button className='btn p-0 border-0 bg-white' type='button' onClick={()=>handleShowPass('password')}>
              {showPass?
              (<i className="far fa-eye"></i>
              ):(<i className="far fa-eye-slash"></i>
              )}
              </Button></InputGroup.Text>
            <Form.Control.Feedback type="invalid" id='inputGroupPassword'>
              Vui lòng không để trống trường này.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustomUserConfirmPassword">
          <Form.Label>Xác nhận mật khẩu</Form.Label>
          <InputGroup hasValidation>
            <Form.Control 
              type={showConfirmPass ?'text':'password'}
              placeholder="Mời nhập lại mật khẩu"
              name='confirm_password'
              value={formData.confirm_password}
              aria-describedby='inputGroupConfirmPassword'
              onChange={handleChange}
              required />
            <InputGroup.Text className='bg-white' id="inputGroupConfirmPassword"><Button className='btn p-0 border-0 bg-white' type='button' onClick={()=>handleShowPass('confirmPass')}>
              {showConfirmPass?
              (<i className="far fa-eye"></i>
              ):(<i className="far fa-eye-slash"></i>
              )}
              </Button></InputGroup.Text>
            <Form.Control.Feedback type="invalid" id='inputGroupConfirmPassword'>
              {message.error !== ''?message.error:'Vui lòng không để trống trường này.'} 
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className='mb-4'>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Đồng ý với chính sách và thỏa thuận"
            feedback="Bạn cần đồng ý thỏa thuận mới có thể đăng ký."
            feedbackType="invalid"
          />
        </Form.Group>
        <div className='text-center text-sm'>
        { success &&(
          <span className={'text-success'}>{message.success}</span>
        )}
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
   
      <div className='d-flex justify-content-center'>
        <Button type="submit"  className='w-50 rounded-3 fw-medium'>Đăng ký</Button>
      </div>
    </Form>
  );
}

export default FormRegister;