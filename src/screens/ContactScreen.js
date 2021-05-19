import React, { useState } from 'react'
import { Image, Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import dogImg from '../images/dog-form.jpg'
import FormContainer from '../components/FormContainer'
import { submitMessages } from '../actions/contactActions'

const ContactScreen = () => {
   const [fullName, setFullName] = useState('')
   const [email, setEmail] = useState('')
   const [message, setMessage] = useState('')

   const dispatch = useDispatch()

   const submitMessage = (e) => {
      e.preventDefault()
      dispatch(submitMessages({ fullName, email, message }))
      setFullName('')
      setEmail('')
      setMessage('')
   }

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
                  <Form className='contact-form' onSubmit={submitMessage}>
                     <Form.Group controlId='fullname'>
                        <Form.Label>Fullname</Form.Label>
                        <Form.Control
                           type='name'
                           placeholder='Enter Fullname'
                           value={fullName}
                           onChange={(e) => setFullName(e.target.value)}
                           required
                        ></Form.Control>
                     </Form.Group>
                     <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                           type='email'
                           placeholder='Enter email'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                        ></Form.Control>
                     </Form.Group>
                     <Form.Group controlId='Message'>
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                           style={{ height: '20vh' }}
                           as='textarea'
                           placeholder='Enter your message here'
                           row='3'
                           value={message}
                           onChange={(e) => setMessage(e.target.value)}
                           maxLength='150'
                           required
                        ></Form.Control>
                     </Form.Group>
                     <Button type='submit' variant='primary'>
                        Submit
                     </Button>
                  </Form>
               </FormContainer>
            </Col>
         </Row>
      </>
   )
}

export default ContactScreen
