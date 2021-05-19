import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listPets, removePet } from '../actions/petActions'
import ReactPaginate from 'react-paginate'
import Loader from '../components/Loader'
import Message from '../components/Message'

const PetList = ({ history }) => {
   const dispatch = useDispatch()

   const PetList = useSelector((state) => state.petList)
   const { loading, error, pets } = PetList

   const createdPet = useSelector((state) => state.createdPet)
   const { success: successCreate } = createdPet

   const petUpdate = useSelector((state) => state.petUpdate)
   const { loading: loadingUpdate, success: successUpdate } = petUpdate

   const [pageNumber, setPageNumber] = useState(0)

   const petPerPage = 5
   const currentPage = pageNumber * petPerPage

   useEffect(() => {
      if (!loadingUpdate) {
         dispatch(listPets(pageNumber))
      }
   }, [dispatch, successCreate, successUpdate])

   const pageCount = Math.ceil(pets.length / petPerPage)

   const changePage = ({ selected }) => {
      setPageNumber(selected)
   }

   const displayPets = pets
      .slice(currentPage, currentPage + petPerPage)
      .map((pet) => {
         return (
            <tr key={pet.id}>
               <td>{pet.id}</td>
               <td>{pet.name.toUpperCase()}</td>
               <td>{pet.gender}</td>
               <td>{pet.petType}</td>
               <td>{pet.petStatus}</td>
               <td style={{ padding: '0' }}>
                  <i
                     className='fas fa-edit'
                     onClick={() => history.push(`/admin/animals/${pet.id}`)}
                  ></i>
                  <i
                     className='fas fa-trash'
                     onClick={() => dispatch(removePet(pet.id))}
                  ></i>
               </td>
            </tr>
         )
      })

   return (
      <>
         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant='error'>{error}</Message>
         ) : pets.length === 0 ? (
            <h1>Empty List</h1>
         ) : (
            <>
               <Table striped bordered hover>
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th style={{ width: '10vh' }}></th>
                     </tr>
                  </thead>
                  <tbody>{displayPets}</tbody>
               </Table>
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
      </>
   )
}

export default PetList
