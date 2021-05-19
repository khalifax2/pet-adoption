import React, { useState } from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import PetList from '../components/PetList'
import AddPet from '../components/AddPet'

const AdminPetListScreen = ({ history, match }) => {
   const [action, setAction] = useState(null)

   const changeAction = (name) => {
      setAction(name)
   }

   return (
      <Row>
         <Col md={2} sm={2} style={{ backgroundColor: 'blue' }}>
            <Sidebar />
         </Col>

         {!action && (
            <Col className='text-center'>
               <Container>
                  <h1 className='py-5'>Pet List</h1>
                  <Button
                     className='crt-button'
                     variant='primary'
                     onClick={() => changeAction('add')}
                  >
                     <i className='fas fa-dog'></i> Create
                  </Button>
                  <PetList history={history} match={match} />
               </Container>
            </Col>
         )}
         {action === 'add' && (
            <AddPet changeAction={changeAction} action={action} />
         )}
      </Row>
   )
}

export default AdminPetListScreen
