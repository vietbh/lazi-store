import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function FormForgetPassword() {
  const [validated, setValidated] = useState(false);
    const [click,setClick] = useState(0);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setClick(click+1);
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3 d-flex justify-content-center">
        <Form.Group as={Col} md="8" controlId="validationCustomUsername">
          <Form.Label>Email <span className='text-danger'>*</span></Form.Label>
          <InputGroup hasValidation>
            {/* <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text> */}
            <Form.Control
              type="email"
              placeholder="Nhập tài khoản email"
              aria-describedby="inputGroupPrepend"
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