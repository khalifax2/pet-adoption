import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import ReservationList from '../components/ReservationList'
import Sidebar from '../components/Sidebar'

const AdminReservationList = () => {
   return (
      <Row>
         <Col md={2} sm={2} style={{ backgroundColor: 'blue' }}>
            <Sidebar />
         </Col>

         <Col className='text-center'>
            <Container>
               <h1 className='py-5'>Reservation List</h1>
               <ReservationList />
            </Container>
         </Col>
      </Row>
   )
}

export default AdminReservationList
