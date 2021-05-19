import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Button, Container } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import Info from '../components/Info'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listAvailablePets } from '../actions/petActions'

const PetListScreen = ({ history }) => {
   const [pageNumber, setPageNumber] = useState(0)

   const petList = useSelector((state) => state.petList)
   const { error, pets, loading } = petList

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(listAvailablePets(pageNumber))
   }, [dispatch, error])

   const petPerPage = 6
   const currentPage = pageNumber * petPerPage

   const pageCount = Math.ceil(pets.length / petPerPage)

   const changePage = ({ selected }) => {
      setPageNumber(selected)
   }

   const displayPets = pets
      .slice(currentPage, currentPage + petPerPage)
      .map((pet) => {
         return (
            <Col className='my-3' key={pet.id}>
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
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
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
         )
      })

   const adoptHandler = (petId) => {
      history.push(`/pets/${petId}`)
   }

   return (
      <Container>
         <h1 className='text-center my-5'>Pet Needs Family</h1>
         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant='error'>{error}</Message>
         ) : pets.length === 0 ? (
            <Message>Empty List</Message>
         ) : (
            <>
               <Row className='my-5'>{pets.length > 0 && displayPets} </Row>
               <ReactPaginate
                  previousLabel={'prev'}
                  nextLabel={'next'}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={'paginationBttns'}
                  previousLinkClassName={'previousBttn'}
                  nextLinkClassName={'nextBttn'}
                  disabledClassName={'paginationDisabled'}
                  activeClassName={'paginationActive'}
               />
            </>
         )}

         <Info />
      </Container>
   )
}

export default PetListScreen
