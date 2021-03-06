import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import SpinnerBtn from '../../../Components/Shared/SpinnerBtn';
import { useMessage } from '../../../Hooks/useMessage';

const AddProduct = () => {
   const { msg, setMessage } = useMessage();
   const [loading, setLoading] = useState(false);

   const addProductHandler = async (e) => {
      setLoading(true);
      e.preventDefault();
      let name = e.target.name.value;
      let description = e.target.description.value;
      let material = e.target.material.value;
      let priceValue = e.target.price.value;
      let qty = e.target.quantity.value;
      let mQty = e.target.min_order_quantity.value;
      let newImage = e.target.image.value;
      const price = parseInt(priceValue);
      const quantity = parseInt(qty);
      const min_order_quantity = parseInt(mQty);
      const availability = quantity < min_order_quantity ? 'Out Of Stock' : 'In stock!';

      if (name === '' || description === '' || material === '' || priceValue === '' || qty === '' || mQty === '') {
         setMessage(<p><strong className='text-danger'>Please Fill all input Fields</strong></p>);
         setLoading(false);
      } else {
         const response = await fetch(`https://manufacture-web.herokuapp.com/product`, {
            method: "POST",
            headers: {
               'content-type': "application/json"
            },
            body: JSON.stringify({ name, image: newImage, description, material, price, quantity, min_order_quantity, availability })
         });

         const data = await response.json();
         if (data?.insertedId) {
            setMessage(<p><strong className='text-success'>Product added successfully</strong></p>);
            setLoading(false);
            e.target.reset();
         }
      }

   }
   return (
      <div className='section_default'>
         <div className="container">
            <h3 className="section_title">Add Product</h3>
            <Form onSubmit={addProductHandler} encType='multipart/form-data'>
               <Row className="mb-3">
                  <Form.Group as={Col} className="mb-3" controlId="formGridName">
                     <Form.Label>Product Name</Form.Label>
                     <Form.Control type="text" name='name' placeholder="Enter product name" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                     <Form.Label>Product Description</Form.Label>
                     <Form.Control as="textarea" name='description' rows={3} />
                  </Form.Group>
               </Row>

               <Form.Group className="mb-3" controlId="formGridImage">
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control name='image' type='text' placeholder="http://url/" />
               </Form.Group>

               <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridMaterial">
                     <Form.Label>Material</Form.Label>
                     <Form.Control type='text' name='material' />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPrice">
                     <Form.Label>Price</Form.Label>
                     <Form.Control type='number' name='price' />
                  </Form.Group>
               </Row>
               <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridQuantity">
                     <Form.Label>Quantity</Form.Label>
                     <Form.Control type='number' name='quantity' />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridMinQuantity">
                     <Form.Label>Minimum Order Quantity</Form.Label>
                     <Form.Control type='number' name='min_order_quantity' />
                  </Form.Group>
               </Row>
               {msg}
               <Button variant="primary" type="submit">
                  {loading ? <><SpinnerBtn /> Adding...</> : "Add Product"}
               </Button>
            </Form>
         </div>
      </div>
   );
};

export default AddProduct;