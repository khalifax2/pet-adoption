import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, Button, Container } from 'react-bootstrap'
import { listPetDetails } from '../actions/petActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const PetProfileScreen = ({ history, match, location }) => {
   const dispatch = useDispatch()

   const petDetails = useSelector((state) => state.petDetails)
   const { error, loading, pet } = petDetails

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   useEffect(() => {
      dispatch(listPetDetails(match.params.id))
   }, [dispatch, match, error])

   const adoptHandler = (petId) => {
      if (!userInfo) {
         history.push('/login')
      } else {
         history.push(`/r/${petId}`)
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
               <Row className='text-center my-5'>
                  <Col>
                     <Image
                        src={
                           pet.imageLink
                              ? `http://localhost:8080/api/v1/pets/${pet.id}/image/download`
                              : `/images/cardImg.png`
                        }
                        thumbnail
                     />
                     <hr />
                     <ul
                        style={{
                           listStyleType: 'none',
                           display: 'inline-block',
                           textAlign: 'left',
                        }}
                     >
                        <div>
                           <li>Name: {pet.name}</li>
                           <li>Type: {pet.petType}</li>
                           <li>Gender: {pet.gender}</li>
                           <li>Status: {pet.petStatus}</li>
                        </div>
                     </ul>
                     <br></br>
                     <Button
                        variant='primary'
                        onClick={() => adoptHandler(pet.id)}
                        disabled={pet.petStatus === 'RESERVED'}
                     >
                        ADOPT ME
                     </Button>
                  </Col>
               </Row>
            )
         )}
      </Container>
   )
}

export default PetProfileScreen
