import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
   return (
      <footer>
         <Container>
            <Row>
               <Col className='text-center py-3' style={{ marginTop: '10vh' }}>
                  Copyright &copy; Makeitlouder
               </Col>
            </Row>
         </Container>
      </footer>
   )
}

export default Footer
