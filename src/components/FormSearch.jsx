import axios from 'axios';
import { Button, Modal, Form, Card } from 'react-bootstrap';
import API_URL from '../config/Api';
import { useState } from 'react';

function FormSearch() {
  const [queryValue, setQueryValue] = useState('');
  const [listProduct, setListProduct] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/search`, {
        params: { name: queryValue }
      });

      if (response.status === 200) {
        setListProduct(response.data);
        setShowModal(true); // Show the modal when products are found
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('Không tìm thấy sản phẩm');
      }
    }
  };

  const handleQueryChange = (e) => {
    setQueryValue(e.target.value);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
    <>
      <Form onSubmit={handleSubmit} className='m-0 p-0 d-flex w-100'>
        <Form.Group className="d-flex justify-content-center" controlId="formGroupEmail">
          <Form.Control className='rounded-start' type="text" onChange={handleQueryChange} placeholder={"Tìm kiếm sản phẩm "} />
          <Button className='rounded-end' type='submit'>
            <i className="fas fa-search"></i>
          </Button>
        </Form.Group>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Product List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {listProduct.map((product, index) => (
            console.log(product),
            <Card key={index}>
              <h6 className="mb-4 mt-2 fs-6 text-break fw-bolder text-truncate">
                <a className="reset-anchor text-center" href={"cua-hang/" + product.slug + '.html'}>{product.name}</a>
              </h6>
            </Card>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormSearch;