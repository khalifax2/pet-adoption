import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import EditUser from '../components/EditUser'
import Sidebar from '../components/Sidebar'

const EditAccountScreen = ({ history, match }) => {
   return (
      <Row>
         <Col md={2} sm={2} style={{ backgroundColor: 'blue' }}>
            <Sidebar />
         </Col>
         <Col>
            <Container>
               <EditUser history={history} match={match} />
            </Container>
         </Col>
      </Row>
   )
}

export default EditAccountScreen
