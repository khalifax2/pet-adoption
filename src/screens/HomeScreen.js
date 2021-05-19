import React from 'react'
import { Col, Row, Button, Container, Image, Card } from 'react-bootstrap'
import desktopImage from '../images/home-bg.jpg'
import roundImg from '../images/roundImg.png'
import cardImg from '../images/cardImg.png'
import Info from '../components/Info'

const HomeScreen = ({ history }) => {
   return (
      <div
         className='screen-bg'
         style={{ backgroundImage: `url(${desktopImage})` }}
      >
         <Row>
            <Col>
               <h1 className='home-title'>
                  Let's Change <br /> Their World
               </h1>
            </Col>
         </Row>
         <Row>
            <Col>
               <h4 className='home-quote'>
                  You can't change the world. <br />
                  But you can changed their world
               </h4>
            </Col>
         </Row>
         <Row>
            <Col>
               <Button
                  className='adopt-link'
                  variant='dark'
                  onClick={() => history.push('/pets')}
               >
                  ADOPT NOW!
               </Button>
               <Button className='donate-link ml-2' variant='dark'>
                  DONATE US!
               </Button>
            </Col>
         </Row>
         <h1 className='help-option'>You can help Us</h1>
         <Container>
            <Row>
               <Col className='text-center'>
                  <h3 className='mb-4'>Give Donation</h3>
                  <Image src={roundImg} roundedCircle />
                  <h4 className='mt-4'>Little help could extends lives</h4>
               </Col>
               <Col className='text-center'>
                  <h3 className='mb-4'>Become a Parent</h3>
                  <Image src={roundImg} roundedCircle />
                  <h4 className='mt-4'>Let them feel the love of a family</h4>
               </Col>
               <Col className='text-center'>
                  <h3 className='mb-4'>Volunteer</h3>
                  <Image src={roundImg} roundedCircle />
                  <h4 className='mt-4'>Rescue animals</h4>
               </Col>
            </Row>
            <h1 className='text-center rescued-title'>"Rescued Animals"</h1>
            <Row className='rescued-animals'>
               <Col>
                  <Card style={{ width: '18rem' }}>
                     <Card.Img variant='top' src={cardImg} />
                     <Card.Body>
                        <Card.Title className='text-center'>
                           Card Title
                        </Card.Title>
                        <Card.Text>
                           Some quick example text to build on the card title
                           and make up the bulk of the card's content.
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
               <Col>
                  <Card style={{ width: '18rem' }}>
                     <Card.Img variant='top' src={cardImg} />
                     <Card.Body>
                        <Card.Title className='text-center'>
                           Card Title
                        </Card.Title>
                        <Card.Text>
                           Some quick example text to build on the card title
                           and make up the bulk of the card's content.
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
               <Col>
                  <Card style={{ width: '18rem' }}>
                     <Card.Img variant='top' src={cardImg} />
                     <Card.Body>
                        <Card.Title className='text-center'>
                           Card Title
                        </Card.Title>
                        <Card.Text>
                           Some quick example text to build on the card title
                           and make up the bulk of the card's content.
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
            <Info />
         </Container>
      </div>
   )
}

export default HomeScreen
