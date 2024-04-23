import React,{ useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as checkout from '../apiServices/checkout';
import AlertStatus  from './AlertStatus';


function FormCheckout() {
  const [validated, setValidated] = useState(false);
  const [success,setSuccess] = useState(false);
  const [process,setProcess] = useState(false);
  const [formData,setFormData] = useState({
    full_name:'',
    address:'',
    phone_number:'',
    note:''
})
const handleChange = (e) =>{
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
    }));
}
const handleCheckoutOrder = async () =>{
  try {
    setProcess(true);
    const result = await checkout.checkoutOrder(formData);
    console.log(result);
    if(result.status == 200){
      const timeout = setTimeout(()=>setSuccess(true),5000)
      return ()=>clearTimeout(timeout);  
    }
  } catch(error) {
    console.error(error);
  }
}

const handleSubmit = (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.checkValidity()) {
    event.stopPropagation();
    return setValidated(true);
  }
  setValidated(true);
  handleCheckoutOrder();
  // setTimeout(() => {setSuccess(false),location.href = "/lich-su-dat-hang.html"},6000);
  // setTimeout(() => setProcess(false),8500);
};

  return (
    <React.Fragment>
      {success && <AlertStatus type='success' title='Bạn đã mua hàng thành công'/> }
      {process && <AlertStatus type='info' title='Yêu cầu đang được xử lý'/> }
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" className='mb-4' controlId="validationCustom01">
            <Form.Label className='form-label text-sm'>Họ và Tên</Form.Label>
            <Form.Control
              required
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              autoComplete='full_name'
              placeholder="Nhập họ tên người nhận"
            />
            <Form.Control.Feedback type="invalid">Vui lòng nhập họ và tên</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="12" controlId="validationCustomUsername">
            <Form.Label>Số điện thoại</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Nhập số điện thoại"
                name="phone_number"
                autoComplete='phone_number'
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập số điện thoại.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" className='mb-4' controlId="validationCustom03">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control as="textarea" 
              name="address" 
              autoComplete='address'
              value={formData.address} 
              onChange={handleChange}
              aria-label="Nhập địa chỉ giao hàng"
              placeholder={'Nhập địa chỉ giao hàng'} 
              required/>
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập địa chỉ nhận hàng.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="12" controlId="validationCustom04">
            <Form.Label>Ghi chú</Form.Label>
            <Form.Control as="textarea"
              name="note"
              autoComplete='note'
              value={formData.note} 
              onChange={handleChange}
              aria-label="Nhập ghi chú" 
              placeholder={'Nhập ghi chú'}/>
          </Form.Group>
        </Row>
        <Button type="submit" className='rounded-1'>Thanh toán</Button>
      </Form>
    </React.Fragment>
  );
}

export default FormCheckout;