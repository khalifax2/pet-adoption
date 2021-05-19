import React, { useState, useEffect } from 'react'
import { Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUser, updateUser } from '../actions/userActions'
import { USER_DETAILS_RESET } from '../constants/userConstants'

const EditUser = ({ history, match }) => {
   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')
   const [street, setStreet] = useState('')
   const [city, setCity] = useState('')
   const [state, setState] = useState('')
   const [postalCode, setPostalCode] = useState('')

   const userDetails = useSelector((state) => state.userDetails)
   const { loading: loadingDetails, error: errorDetails, user } = userDetails

   const dispatch = useDispatch()

   useEffect(() => {
      if (Object.keys(user).length === 0) {
         dispatch(getUser(match.params.id))
      }

      if (Object.keys(user).length > 0) {
         setFirstName(user.firstName)
         setLastName(user.lastName)
         setStreet(user.address.street)
         setCity(user.address.city)
         setState(user.address.state)
         setPostalCode(user.address.postalCode)
      }
   }, [dispatch, user])

   useEffect(() => {
      if (Object.keys(user).length > 0) {
         dispatch({ type: USER_DETAILS_RESET })
      }
   }, [history])

   const submitHandler = (e) => {
      e.preventDefault()

      dispatch(
         updateUser(match.params.id, {
            firstName,
            lastName,
            address: { street, city, state, postalCode },
         })
      )

      history.push('/admin/accounts')
   }

   return loadingDetails ? (
      <Loader />
   ) : errorDetails ? (
      <Message variant='danger'>{errorDetails}</Message>
   ) : (
      <>
         {' '}
         <FormContainer>
            <h1 className='form-title'>EDIT</h1>
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
                     <Form.Label>Lastname</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='Enter Lastname'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
               <Button
                  variant='primary'
                  onClick={() => history.push('/admin/accounts')}
                  style={{ marginRight: '10px' }}
               >
                  CANCEL
               </Button>
               <Button type='submit' variant='primary'>
                  UPDATE
               </Button>
            </Form>
         </FormContainer>
      </>
   )
}

export default EditUser
