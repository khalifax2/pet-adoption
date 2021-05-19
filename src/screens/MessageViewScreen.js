import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getMessage } from '../actions/contactActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Sidebar from '../components/Sidebar'

const MessageViewScreen = ({ match }) => {
   const messageDetails = useSelector((state) => state.messageDetails)
   const { loading, error, message } = messageDetails

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getMessage(match.params.id))
   }, [dispatch])

   return (
      <Row>
         <Col md={2} sm={2} style={{ backgroundColor: 'blue' }}>
            <Sidebar />
         </Col>
         <Col>
            {loading ? (
               <Loader />
            ) : error ? (
               <Message variant='error'>{error}</Message>
            ) : (
               message && (
                  <div style={{ marginLeft: '20vh', marginTop: '10vh' }}>
                     <h1>Message Details</h1>
                     <hr />
                     <p>Fullname: {message.fullName}</p>
                     <p>Email: {message.email}</p>
                     <p>Message: {message.message}</p>
                  </div>
               )
            )}
         </Col>
      </Row>
   )
}

export default MessageViewScreen
