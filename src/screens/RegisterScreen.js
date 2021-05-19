import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Image, Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import dogImg from '../images/dog-form.jpg'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [street, setStreet] = useState('')
   const [city, setCity] = useState('')
   const [state, setState] = useState('')
   const [postalCode, setPostalCode] = useState('')
   const [message, setMessage] = useState(null)
   const [verificationLinkSent, setVerificationLinkSent] = useState(false)

   const dispatch = useDispatch()

   const userRegister = useSelector((state) => state.userRegister)
   const { loading, error, userInfo } = userRegister

   const redirect = location.search ? location.seatch.split('=')[1] : '/'

   useEffect(() => {
      if (userInfo) {
         history.push('/register')
      }
   }, [history, redirect, userInfo, verificationLinkSent])

   const submitHandler = (e) => {
      e.preventDefault()
      if (password !== confirmPassword) {
         setMessage('Password did not match!')
      } else {
         dispatch(
            register({
               firstName,
               lastName,
               email,
               password,
               address: { street, city, state, postalCode },
            })
         )
         setVerificationLinkSent(true)
      }
   }

   return (
      <>
         <Row>
            <Col>
               <Image src={dogImg} style={{ height: '50rem' }} fluid />
            </Col>
            <Col>
               {verificationLinkSent ? (
                  <FormContainer>
                     <Message variant='success' spacing='mt-5'>
                        Verification link sent. Please verify your email before
                        <Link to='/login'> login</Link>.
                     </Message>
                  </FormContainer>
               ) : (
                  <FormContainer>
                     <h1 className='form-title'>Sign up</h1>
                     {message && <Message variant='danger'>{message}</Message>}
                     <h5 className='form-quote'>Be one of us</h5>
                     {error && <Message variant='danger'>{error}</Message>}
                     {loading && <Loader />}
                     <Form onSubmit={submitHandler} className='contact-form'>
                        <Form.Row>
                           <Form.Group as={Col} controlId='firstName'>
                              <Form.Label>Firstname</Form.Label>
                              <Form.Control
                                 type='text'
                                 placeholder='Enter Firstname'
                                 value={firstName}
                                 onChange={(e) => setFirstName(e.target.value)}
                              ></Form.Control>
                           </Form.Group>
                           <Form.Group as={Col} controlId='lastName'>
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control
                                 type='text'
                                 placeholder='Enter Lastname'
                                 value={lastName}
                                 onChange={(e) => setLastName(e.target.value)}
                              ></Form.Control>
                           </Form.Group>
                        </Form.Row>

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
                        <Form.Row>
                           <Form.Group as={Col} controlId='confirmPassword'>
                              <Form.Label>Confirm Password</Form.Label>
                              <Form.Control
                                 type='password'
                                 placeholder='Confirm Password'
                                 value={confirmPassword}
                                 onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                 }
                              ></Form.Control>
                           </Form.Group>
                        </Form.Row>
                        <Form.Row>
                           <Form.Group as={Col} controlId='street'>
                              <Form.Label>Street</Form.Label>
                              <Form.Control
                                 type='text'
                                 placeholder='Enter street'
                                 value={street}
                                 onChange={(e) => setStreet(e.target.value)}
                              ></Form.Control>
                           </Form.Group>
                           <Form.Group as={Col} controlId='city'>
                              <Form.Label>City</Form.Label>
                              <Form.Control
                                 type='text'
                                 placeholder='Enter city'
                                 value={city}
                                 onChange={(e) => setCity(e.target.value)}
                              ></Form.Control>
                           </Form.Group>
                        </Form.Row>
                        <Form.Row>
                           <Form.Group as={Col} controlId='state'>
                              <Form.Label>State</Form.Label>
                              <Form.Control
                                 type='text'
                                 placeholder='Enter state'
                                 value={state}
                                 onChange={(e) => setState(e.target.value)}
                              ></Form.Control>
                           </Form.Group>
                           <Form.Group as={Col} controlId='postalcode'>
                              <Form.Label>Postal Code</Form.Label>
                              <Form.Control
                                 type='text'
                                 placeholder='Enter postal code'
                                 value={postalCode}
                                 onChange={(e) => setPostalCode(e.target.value)}
                              ></Form.Control>
                           </Form.Group>
                        </Form.Row>

                        <Button type='submit' variant='primary'>
                           Register
                        </Button>
                        <Row className='py-3'>
                           <Col className='text-center'>
                              Already have an account?{' '}
                              <a href='/login'>Login</a>
                           </Col>
                        </Row>
                     </Form>
                  </FormContainer>
               )}
            </Col>
         </Row>
      </>
   )
}

export default RegisterScreen
