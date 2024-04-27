import React, { useState } from 'react';
import { Card, CardBody, CardTitle } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function FormComment() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

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