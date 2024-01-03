import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function FormSearch() {
    const handleSubmit = (e)=>{
        e.preventDefault();
        
        console.log('hheheh');
    }
  return (
    <Form onSubmit={handleSubmit} className='m-0 p-0'>
      <Form.Group className="d-flex justify-content-center" controlId="formGroupEmail">
        <Form.Control className='rounded-start' type="text" placeholder={"Tìm kiếm sản phẩm "} />
        <Button className='rounded-end' type='submit'>
            <i className="fas fa-search"></i>
        </Button>
      </Form.Group>
    </Form>
  );
}

export default FormSearch;