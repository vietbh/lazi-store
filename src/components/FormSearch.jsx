import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormSearch() {
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    search:''
  });

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(formData.search == "") navigate("/");
    else navigate((("/tim-kiem/").concat(formData.search.replace(" ","+").trim().toLowerCase())))
    console.log(formData.search);
  }
  return (

    <Form onSubmit={handleSubmit}>
      <Form.Group className="d-flex justify-content-center w-100" controlId="formGroupEmail">
        <Form.Control className='rounded-start' type="text" name="search" value={formData.search} onChange={handleChange} placeholder={"Tìm kiếm sản phẩm "} />
        <Button className='rounded-end' type='submit'>
            <i className="fas fa-search"></i>
        </Button>
      </Form.Group>
    </Form>
  );
}

export default FormSearch;