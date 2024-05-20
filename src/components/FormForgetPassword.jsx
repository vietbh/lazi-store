import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import API_URL from "../config/Api";
import axios from "axios";
import { Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

function FormForgetPassword() {
  const [validated, setValidated] = useState(false);
  // const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    handleForgotPass();
  };
  const handleSubmitChangePass = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    handleForgotPass();
  };
  const handleForgotPass = async () => {
    try {
      const url = API_URL.concat("/quen-mat-khau");
      const response = await axios.post(url,formData);
      if (response.status == 200) {
        setSuccess(true);
        if(success){
          // alert('Đổi mật khẩu thành công');
          // navigate("/dang-nhap.html")
        }
      }
    } catch (error) {
      await setError(error?.response?.data?.message);
      setValidated(false);
    }
  };
  return (
    <React.Fragment>
      <Form noValidate validated={validated} onSubmit={handleSubmit} hidden={(success && !error) && true}>
      {(success && !error) && (<Alert variant={'success'}>Vui lòng kiểm tra email</Alert>)}
      {error && (<Alert variant={'danger'}> {error}</Alert>)}
        <Row className="mb-3 d-flex justify-content-center">
          <Form.Group as={Col} md="8" controlId="verifyEmail" >
            <Form.Label>
              Email <span className="text-danger">*</span>
            </Form.Label>
            <InputGroup hasValidation>
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
        <div className="d-flex justify-content-center">
          <Button type="submit" className="w-50 rounded-3 fw-medium mt-4">
            Lấy lại mật khẩu
          </Button>
        </div>
      </Form>
      
      {success && (
        <Form noValidate validated={validated} onSubmit={handleSubmitChangePass}>
          {success && (
            <div>
              <Row className="mb-3 d-flex justify-content-center">
                <Form.Group as={Col} md="8" controlId="verifyCode">
                  <Form.Label>
                    Code <span className="text-danger">*</span>
                  </Form.Label>
                  <InputGroup>
                    {/* <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text> */}
                    <Form.Control
                      type="number"
                      placeholder="Nhập mã code"
                      aria-describedby="inputGroupPrepend"
                      name="code"
                      required
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng nhập code
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3 d-flex justify-content-center">
                <Form.Group as={Col} md="8" controlId="passChange">
                  <Form.Label>
                    Mật khẩu mới <span className="text-danger">*</span>
                  </Form.Label>
                  <InputGroup>
                    {/* <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text> */}
                    <Form.Control
                      type="password"
                      placeholder="Nhập mật khẩu mới"
                      aria-describedby="inputGroupPrepend"
                      name="password"
                      required
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng nhập code
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
            </div>
          )}
          <div className="d-flex justify-content-center">
            <Button type="submit" className="w-50 rounded-3 fw-medium mt-4">
              Lấy lại mật khẩu
            </Button>
          </div>
        </Form>
      )}
    </React.Fragment>
  );
}

export default FormForgetPassword;
