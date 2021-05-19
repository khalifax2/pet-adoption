import React, { useState } from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap'
import AddUser from '../components/AddUser'
import Sidebar from '../components/Sidebar'
import UserList from '../components/UserList'

const AccountListScreen = ({ history }) => {
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
                  <h1 className='py-5'>Users Account</h1>
                  <Button
                     className='crt-button'
                     variant='primary'
                     onClick={() => changeAction('add')}
                  >
                     <i className='fas fa-user-plus'></i> Create
                  </Button>
                  <UserList history={history} />
               </Container>
            </Col>
         )}
         {action === 'add' && <AddUser changeAction={changeAction} />}
      </Row>
   )
}

export default AccountListScreen
