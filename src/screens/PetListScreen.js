import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Button, Container } from 'react-bootstrap'
import Info from '../components/Info'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listPets, reservePet } from '../actions/petActions'

const PetListScreen = ({ history }) => {
   const petList = useSelector((state) => state.petList)
   const { error, pets, loading } = petList

   const userLogin = useSelector((state) => state.userLogin)
   const {
      userInfo: { userId },
   } = userLogin

   const dispatch = useDispatch()

   const date = new Date()

   const year = date.getFullYear()
   const month = date.getMonth()
   const day = date.getDay()
   const hrs = date.getHours()
   const min = date.getMinutes()
   const sec = date.getSeconds()
   const timeStamp = new Date('YYYY-mm-dd')
   console.log(timeStamp)

   useEffect(() => {
      dispatch(listPets())
   }, [dispatch, error])

   const adoptHandler = (petId) => {
      if (!userId) {
         history.push('/login')
      } else {
         if (window.confirm('Do you want to adopt him?')) {
            dispatch(reservePet({ userId, petId }))
         }
      }
   }

   return (
      <Container>
         <h1 className='text-center my-5'>Pet Needs Family</h1>
         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant='error'>{error}</Message>
         ) : (
            <Row className='my-5'>
               {pets.length > 0 &&
                  pets.map((pet) => (
                     <Col className='my-3' key={pet.id}>
                        <Card style={{ width: '18rem' }}>
                           <Card.Img variant='top' src={pet.imagePath} />
                           <Card.Body>
                              <Card.Title className='text-center'>
                                 {pet.name.toUpperCase()}
                              </Card.Title>
                              <Card.Text>
                                 Some quick example text to build on the card
                                 title and make up the bulk of the card's
                                 content.
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
                  ))}
            </Row>
         )}

         <Info />
      </Container>
   )
}

export default PetListScreen