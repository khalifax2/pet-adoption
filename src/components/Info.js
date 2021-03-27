import React from 'react'
import { Row } from 'react-bootstrap'

const Info = () => {
   return (
      <>
         <Row className='address'>
            <h4>
               <i className='fas fa-map-marker-alt mr-3 ml-1'></i>54 Wright
               Street Wylies Flas NSW
            </h4>
         </Row>
         <Row className='email mt-4'>
            <h4>
               {' '}
               <i className='far fa-envelope mr-3'></i>
               makeitlouder@gmail.com
            </h4>
         </Row>
         <Row className='contact mt-4'>
            <i
               className='fas fa-phone mr-3 mt-1'
               style={{ fontSize: '1.5rem' }}
            ></i>
            <h4>943-9231</h4>
         </Row>
      </>
   )
}

export default Info
