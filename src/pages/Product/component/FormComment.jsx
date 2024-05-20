import React, { useState } from 'react';
import { Card, CardBody, CardTitle } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as detailProduct from '@/apiServices/detailProduct';

function FormComment(product) {
  const [validated, setValidated] = useState(false);
  const [formData,setFormData] = useState({
    comment:''
  });

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
  console.log(product);
  const postComment = async()=>{
    try {
      const result = await detailProduct.callComment(product,formData.comment);
      console.log(result);
    } catch(error) {
      console.log(error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    console.log(formData);
    postComment()
    setValidated(true);
  };

  return (
    <React.Fragment>
        <Card className='border-0'>
          <CardTitle>
              <h5 className='mt-2 ms-1'>Để lại đánh giá</h5>
          </CardTitle>
          <CardBody className='p-1'>
              <Form 
              noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className='mb-2'>
                    <Form.Group
                    as={Col} md="12" controlId="validationCustomUsername">
                    
                      <InputGroup hasValidation>
                          <Form.Control
                          as="textarea" rows={3}
                          name="comment"
                          onChange={handleChange}
                          placeholder="Hãy sử dụng ngôn ngữ lịch sự để bình luận"
                          aria-describedby="inputGroupPrepend"
                          required
                          />
                          {/**
                          <Form.Control.Feedback type="invalid">
                          Please choose a username.
                          </Form.Control.Feedback>
                          */}
                      </InputGroup>
                    </Form.Group>
                </Row>
                <Button type="submit" className='float-start rounded-3'>Bình luận</Button>
              </Form>
          </CardBody>
        </Card>
    </React.Fragment>
  );
}

export default FormComment;