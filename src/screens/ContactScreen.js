import React from 'react'
import { Image, Row, Col, Form, Button } from 'react-bootstrap'
import dogImg from '../images/dog-form.jpg'
import FormContainer from '../components/FormContainer'

const ContactScreen = () => {
   return (
      <>
         <Row>
            <Col>
               <Image src={dogImg} style={{ height: '50rem' }} fluid />
            </Col>
            <Col>
               <FormContainer>
                  <h1 className='form-title'>Contact Us</h1>
                  <h5 className='form-quote'>Be one of us</h5>
                  <Form className='contact-form'>
                     <Form.Group controlId='fullname'>
                        <Form.Label>Fullname</Form.Label>
                        <Form.Control
                           type='name'
                           placeholder='Enter name'
                        ></Form.Control>
                     </Form.Group>
                     <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                           type='email'
                           placeholder='Enter email'
                        ></Form.Control>
                     </Form.Group>
                     <Form.Group controlId='Message'>
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                           style={{ height: '20vh' }}
                           as='textarea'
                           row='3'
                        ></Form.Control>
                     </Form.Group>
                     <Button type='submit' variant='primary'>
                        Register
                     </Button>
                  </Form>
               </FormContainer>
            </Col>
         </Row>
      </>
   )
}

export default ContactScreen
