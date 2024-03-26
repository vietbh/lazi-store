import { useState } from "react";
import { Alert, Col, Form, InputGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import API_URL from "../config/Api";
import axios from "axios";

const ModalChangePass = (props) => {
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    password_old: "",
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
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
      return setValidated(true);
    }
    setValidated(true);
    handleChangePass();
  };

  const handleChangePass = async () => {
    try {
      setError(null);
      await axios.post(API_URL.concat("/change-password"), {
        ...formData,
        user_id: props.user?.[0]?.id,
      });
      setSuccess(true);
    } catch (error) {
      setValidated(false);
      setSuccess(false);
      setError("Mật khẩu cũ không chính xác");
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Đổi mật khẩu
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {error && <Alert variant={"danger"}>{error}</Alert>}
          {!error && success && (
            <Alert variant={"success"}>Đổi mật khẩu thành công</Alert>
          )}
          {!success && (
            <>
              <Row className="mb-3 d-flex justify-content-center">
                <Form.Group
                  as={Col}
                  md="8"
                  controlId="validationCustomUsername"
                >
                  <Form.Label>
                    Mật khẩu cũ <span className="text-danger">*</span>
                  </Form.Label>
                  <InputGroup hasValidation>
                    {/* <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text> */}
                    <Form.Control
                      type="password"
                      placeholder="Nhập mật khẩu cũ"
                      aria-describedby="inputGroupPrepend"
                      required
                      name="password_old"
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng nhập mật khẩu cũ của bạn.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3 d-flex justify-content-center">
                <Form.Group
                  as={Col}
                  md="8"
                  controlId="validationCustomUsername"
                >
                  <Form.Label>
                    Mật khẩu mới <span className="text-danger">*</span>
                  </Form.Label>
                  <InputGroup hasValidation>
                    {/* <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text> */}
                    <Form.Control
                      type="password"
                      placeholder="Nhập mật khẩu mới"
                      aria-describedby="inputGroupPrepend"
                      required
                      name="password"
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng nhập mật khẩu mới.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <div className="d-flex justify-content-center ">
                <Button type="submit" className="w-50 rounded-3 fw-medium mt-4">
                  Lấy lại mật khẩu
                </Button>
              </div>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {
            props.onHide();
            setSuccess(false);
            setError(false);
            setValidated(true);
        }}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalChangePass;
