import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, Button, Container, ListGroup } from 'react-bootstrap'
import moment from 'moment'
import {
   getUserReservedPet,
   removeUserReservedPet,
} from '../actions/reservationActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProfileScreen = ({ history }) => {
   const dispatch = useDispatch()

   const userReserved = useSelector((state) => state.userReservedPet)
   const { reservation, loading, error, success } = userReserved

   useEffect(() => {
      dispatch(getUserReservedPet())
   }, [dispatch, success])

   const removeReservedPet = (id) => {
      dispatch(removeUserReservedPet(id))
   }

   const editReservedPet = (id) => {
      history.push(`/r/${id}/edit`)
   }

   return (
      <Container>
         <Row className='mt-5'>
            <Col>
               <h1>Reservation</h1>

               {loading ? (
                  <Loader />
               ) : error ? (
                  <Message variant='danger'>{error}</Message>
               ) : reservation.length === 0 ? (
                  <Message>Empty Reservation.</Message>
               ) : (
                  <ListGroup className='mt-5' variant='flush'>
                     {reservation.map((pet) => (
                        <ListGroup.Item key={pet.reservationId}>
                           <Row>
                              <Col md={2}>
                                 <Image src={`/images/cardImg.png`} fluid />
                              </Col>
                              <Col md={2}>{pet.pet.name.toUpperCase()}</Col>
                              <Col md={2}>{pet.pet.gender}</Col>
                              <Col md={2}>{pet.pet.petType}</Col>
                              <Col md={2}>
                                 {moment(pet.reservationDate).format(
                                    'MMMM Do YYYY, h:mm:ss a'
                                 )}
                              </Col>
                              <Col md={1}>
                                 <Button
                                    type='button'
                                    variant='light'
                                    onClick={() =>
                                       editReservedPet(pet.reservationId)
                                    }
                                 >
                                    <i className='fas fa-edit'></i>
                                 </Button>
                              </Col>
                              <Col md={1}>
                                 <Button
                                    type='button'
                                    variant='light'
                                    onClick={() =>
                                       removeReservedPet(pet.reservationId)
                                    }
                                 >
                                    <i className='fas fa-trash'></i>
                                 </Button>
                              </Col>
                           </Row>
                        </ListGroup.Item>
                     ))}
                  </ListGroup>
               )}
            </Col>
         </Row>
      </Container>
   )
}

export default ProfileScreen
