import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Button, Container } from 'react-bootstrap'
import { listPetDetails } from '../actions/petActions'
import { reservePet, updateReservation } from '../actions/reservationActions'
import moment from 'moment'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ReservationScreen = ({ history, match }) => {
   const [pickupDate, setPickupDate] = useState('')

   const dispatch = useDispatch()

   const petDetails = useSelector((state) => state.petDetails)
   const { error, loading, pet } = petDetails

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const userReservation = useSelector((state) => state.userReservedPet)
   const { reservation } = userReservation

   const toUpdate = match.url.split('/').find((e) => e === 'edit')

   let paramsId

   useEffect(() => {
      if (!toUpdate) {
         paramsId = match.params.id
      } else {
         if (reservation.length > 0) {
            const details = reservation.find(
               (r) => r.reservationId === match.params.id
            )
            paramsId = details.pet.id
         } else {
            history.push('/')
         }
      }
      dispatch(listPetDetails(paramsId))
   }, [dispatch, match, error])

   const adoptHandler = (petId) => {
      if (!userInfo) {
         history.push('/login')
      } else {
         const { userId } = userInfo
         const reservationDate = moment(pickupDate).format()

         if (!toUpdate) {
            if (window.confirm('Do you want to adopt him?')) {
               dispatch(reservePet({ userId, petId, reservationDate }))
            }
         } else {
            dispatch(
               updateReservation(match.params.id, {
                  userId,
                  petId,
                  reservationDate,
               })
            )
         }
         history.push('/profile')
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
                        <Card.Img
                           variant='top'
                           src={
                              pet.imageLink
                                 ? `http://localhost:8080/api/v1/pets/${pet.id}/image/download`
                                 : `/images/cardImg.png`
                           }
                        />
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
                     <ul
                        style={{
                           listStyleType: 'none',
                        }}
                     >
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

export default ReservationScreen
