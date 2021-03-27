import React from 'react'
import { Image, Row, Col, Container } from 'react-bootstrap'
import bannerImg from '../images/banner-about.jpg'
import missionImg from '../images/dog-pic.jpg'
import dontShopImg from '../images/dontshop.jpg'
import Info from '../components/Info'

const AboutScreen = () => {
   return (
      <div>
         <Image src={bannerImg} style={{ width: '100vw', height: '30vh' }} />
         <h1 className='about-title'>About US</h1>
         <Container>
            <Row>
               <Col>
                  <h3>
                     The standard Lorem Ipsum passage, used since the 1500s
                  </h3>
                  <p>
                     "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                     sed do eiusmod tempor incididunt ut labore et dolore magna
                     aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                     ullamco laboris nisi ut aliquip ex ea commodo consequat.
                     Duis aute irure dolor in reprehenderit in voluptate velit
                     esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                     occaecat cupidatat non proident, sunt in culpa qui officia
                     deserunt mollit anim id est laborum."
                  </p>
               </Col>
            </Row>
            <Row className='mission'>
               <Col>
                  <h2>Mission</h2>
                  <p>
                     It is a long established fact that a reader will be
                     distracted by the readable content of a page when looking
                     at its layout. The point of using Lorem Ipsum is that it
                     has a more-or-less normal distribution of letters, as
                     opposed to using 'Content here, content here', making it
                     look like readable English.
                  </p>
               </Col>
               <Col>
                  <Image
                     src={missionImg}
                     style={{ height: '40vh', float: 'right' }}
                     fluid
                  />
               </Col>
            </Row>
            <Row className='vision'>
               <Col>
                  <Image src={dontShopImg} style={{ height: '40vh' }} fluid />
               </Col>
               <Col>
                  <h2>Vision</h2>
                  <p>
                     It is a long established fact that a reader will be
                     distracted by the readable content of a page when looking
                     at its layout. The point of using Lorem Ipsum is that it
                     has a more-or-less normal distribution of letters, as
                     opposed to using 'Content here, content here', making it
                     look like readable English.
                  </p>
               </Col>
            </Row>
            <Row className='goal'>
               <Col>
                  <h1 className='text-center mb-4'>Our Goal</h1>
                  <ul className='goal-list'>
                     <li>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout.
                     </li>
                     <li>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout.
                     </li>
                     <li>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout.
                     </li>
                     <li>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout.
                     </li>
                  </ul>
               </Col>
            </Row>
            <Info />
         </Container>
      </div>
   )
}

export default AboutScreen
