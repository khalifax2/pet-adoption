import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Image, Row, Col, Form, Button } from 'react-bootstrap'
import dogImg from '../images/dog-form.jpg'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const dispatch = useDispatch()

   const userLogin = useSelector((state) => state.userLogin)
   const { loading, error, userInfo } = userLogin

   const redirect = location.search ? location.search.split('=')[1] : '/'

   useEffect(() => {
      if (userInfo) {
         history.push(redirect)
      }
   }, [history, userInfo, redirect])

   const submitHandler = (e) => {
      e.preventDefault()
      dispatch(login(email, password))
   }

   return (
      <>
         <Row>
            <Col>
               <Image src={dogImg} style={{ height: '50rem' }} fluid />
            </Col>
            <Col>
               <FormContainer>
                  <h1 className='form-title'>Login</h1>
                  <h5 className='form-quote'>Be one of us</h5>
                  {error && <Message variant='danger'>{error}</Message>}
                  {loading && <Loader />}
                  <Form onSubmit={submitHandler} className='contact-form'>
                     <Form.Row>
                        <Form.Group as={Col} controlId='email'>
                           <Form.Label>Email Address</Form.Label>
                           <Form.Control
                              type='email'
                              placeholder='Enter email'
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                           ></Form.Control>
                        </Form.Group>
                     </Form.Row>
                     <Form.Row>
                        <Form.Group as={Col} controlId='password'>
                           <Form.Label>Password</Form.Label>
                           <Form.Control
                              type='password'
                              placeholder='Enter password'
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                           ></Form.Control>
                        </Form.Group>
                     </Form.Row>

                     <Button type='submit' variant='primary'>
                        Login
                     </Button>
                     <Row className='py-3'>
                        <Col className='text-center'>
                           Already have an account?{' '}
                           <Link to='/register'>Register</Link>
                        </Col>
                     </Row>
                  </Form>
               </FormContainer>
            </Col>
         </Row>
      </>
   )
}

export default LoginScreen
