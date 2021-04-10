import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Button, Container } from 'react-bootstrap'
import { listPetDetails, reservePet } from '../actions/petActions'
import moment from 'moment'
import Loader from '../components/Loader'
import Message from '../components/Message'

const PetScreen = ({ history, match }) => {
   const [pickupDate, setPickupDate] = useState('')

   const dispatch = useDispatch()

   const petDetails = useSelector((state) => state.petDetails)
   const { error, loading, pet } = petDetails

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   useEffect(() => {
      dispatch(listPetDetails(match.params.id))
   }, [dispatch, match, error])

   const adoptHandler = (petId) => {
      if (!userInfo || !userLogin) {
         history.push('/login')
      } else {
         const { userId } = userInfo
         const reservationDate = moment(pickupDate).format()
         if (window.confirm('Do you want to adopt him?')) {
            dispatch(reservePet({ userId, petId, reservationDate }))
         }
      }
   }

   return (
      <Container>
         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant='error'>{error}</Message>
         ) : (
            pet && (
               <Row className='mt-5'>
                  <Col md={4}>
                     <Card style={{ width: '18rem' }}>
                        <Card.Img variant='top' src={pet.imagePath} />
                        <Card.Body>
                           <Card.Title className='text-center'>
                              {pet.name.toUpperCase()}
                           </Card.Title>
                           <Card.Text>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                           </Card.Text>
                           <Button
                              variant='primary'
                              onClick={() => adoptHandler(pet.id)}
                           >
                              ADOPT ME
                           </Button>
                        </Card.Body>
                     </Card>
                  </Col>
                  <Col>
                     <h2>Information</h2>
                     <ul>
                        <li>Name : {pet.name.toUpperCase()}</li>
                        <li>Type : {pet.petType}</li>
                        <li>Status: {pet.petStatus}</li>
                        <li>Gender : {pet.gender}</li>
                     </ul>
                     <br></br>
                     <h5>SET PICK-UP DATE </h5>
                     <label>Date: </label>
                     <input
                        type='datetime-local'
                        name='date'
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                     />
                  </Col>
               </Row>
            )
         )}
      </Container>
   )
}

export default PetScreen
