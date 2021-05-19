import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import EditPet from '../components/EditPet'
import EditUser from '../components/EditUser'
import Sidebar from '../components/Sidebar'

const EditPetScreen = ({ history, match }) => {
   return (
      <Row>
         <Col md={2} sm={2} style={{ backgroundColor: 'blue' }}>
            <Sidebar />
         </Col>
         <Col>
            <Container>
               <EditPet history={history} match={match} />
            </Container>
         </Col>
      </Row>
   )
}

export default EditPetScreen
