import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Image, Row, Col } from 'react-bootstrap'
import dogImg from '../images/dog-form.jpg'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import { verifyEmail } from '../actions/userActions'

const VerifyEmailScreen = ({ history, location }) => {
   const dispatch = useDispatch()

   const userRegister = useSelector((state) => state.userRegister)
   const { error, verified } = userRegister

   const token = location.search && location.search.split('=')[1]

   useEffect(() => {
      if (!verified) {
         dispatch(verifyEmail(token))
      }
   }, [dispatch, verified, error, token])

   return (
      <>
         <Row>
            <Col>
               <Image src={dogImg} style={{ height: '50rem' }} fluid />
            </Col>
            <Col>
               {verified && (
                  <FormContainer>
                     <Message variant='success' spacing='mt-5'>
                        Email Verified. <Link to='/login'> login</Link> now!.
                     </Message>
                  </FormContainer>
               )}
            </Col>
         </Row>
      </>
   )
}

export default VerifyEmailScreen
