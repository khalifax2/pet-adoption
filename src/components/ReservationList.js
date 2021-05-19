import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import {
   listReservations,
   removeReservation,
} from '../actions/reservationActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ReactPaginate from 'react-paginate'

const ReservationList = ({ type }) => {
   const dispatch = useDispatch()

   const ReservationList = useSelector((state) => state.reservation)
   const { loading, error, reservations } = ReservationList

   useEffect(() => {
      dispatch(listReservations())
   }, [dispatch, type])

   const [pageNumber, setPageNumber] = useState(0)

   const reservationsPerPage = 1
   const currentPage = pageNumber * reservationsPerPage

   const changePage = ({ selected }) => {
      setPageNumber(selected)
   }

   const pageCount = Math.ceil(reservations.length / reservationsPerPage)

   const displayReservations = reservations
      .slice(currentPage, currentPage + reservationsPerPage)
      .map((r) => {
         return (
            <tr key={r.reservationId}>
               <td>{r.reservationId}</td>
               <td>{r.userId}</td>
               <td>{r.petId}</td>
               <td>
                  {moment(r.reservationDate).format('MMMM Do YYYY, h:mm a')}
               </td>
               <td style={{ padding: '0' }}>
                  <i
                     className='fas fa-trash'
                     onClick={() =>
                        dispatch(removeReservation(r.reservationId))
                     }
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
         ) : reservations.length === 0 ? (
            <h1>Empty List</h1>
         ) : (
            <>
               <Table striped bordered hover>
                  <thead>
                     <tr>
                        <th>Reservation ID</th>
                        <th>User ID </th>
                        <th>Pet ID</th>
                        <th>Date</th>
                        <th style={{ width: '10vh' }}></th>
                     </tr>
                  </thead>
                  <tbody>{displayReservations}</tbody>
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
               />{' '}
            </>
         )}
      </>
   )
}

export default ReservationList
