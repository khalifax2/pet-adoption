import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import MessageList from '../components/MessageList'
import Sidebar from '../components/Sidebar'

const MessageScreen = ({ history }) => {
   return (
      <Row>
         <Col md={2} sm={2} style={{ backgroundColor: 'blue' }}>
            <Sidebar />
         </Col>
         <Col className='text-center'>
            <Container>
               <MessageList history={history} />
            </Container>
         </Col>
      </Row>
   )
}

export default MessageScreen
