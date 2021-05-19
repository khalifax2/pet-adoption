import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getReservationCount } from '../actions/reservationActions'
import ReservationList from '../components/ReservationList'
import Sidebar from '../components/Sidebar'
import PetList from '../components/PetList'
import { RESERVATION_LIST_RESET } from '../constants/reservationConstants'
import ForPickupReservation from '../components/ForPickupReservation'

const DashboardScreen = ({ history }) => {
   const [type, setType] = useState('')

   const dispatch = useDispatch()

   const reservationCount = useSelector(
      (state) => state.reservation.reservationCount
   )
   const { reservations, forPickup, availablePet } = reservationCount

   useEffect(() => {
      dispatch(getReservationCount())
   }, [dispatch])

   const changeType = (name) => {
      setType(name)
   }

   return (
      <Row>
         <Col md={2} sm={2}>
            <Sidebar />
         </Col>
         <Col className='text-center' style={{ backgroundColor: '#F0F2F5' }}>
            <div className='row' id='box'>
               <div className='box1' onClick={() => changeType('all')}>
                  <div>
                     <h2>Reservation</h2>
                     {reservations}
                  </div>
               </div>
               <div className='box2' onClick={() => changeType('today')}>
                  <div>
                     <h2>For Pick-up</h2>
                     {forPickup}
                  </div>
               </div>
               <div className='box3' onClick={() => changeType('available')}>
                  <div>
                     <h2>Available</h2>
                     {availablePet}
                  </div>
               </div>
            </div>
            <br />
            <br />
            <hr />
            {type === 'all' && <ReservationList type={type} />}
            {type === 'today' && <ForPickupReservation type={type} />}
            {type === 'available' && <PetList history={history} />}
         </Col>
      </Row>
   )
}

export default DashboardScreen
