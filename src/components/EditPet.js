import React, { useState, useEffect } from 'react'
import { Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from './FormContainer'
import Dropzone from './Dropzone'
import { listPetDetails, updatePet } from '../actions/petActions'
import { PET_DETAILS_RESET } from '../constants/petConstants'

const EditPet = ({ history, match }) => {
   const [name, setName] = useState('')
   const [file, setFile] = useState({})
   const [gender, setGender] = useState('MALE')
   const [petType, setType] = useState('DOG')

   const dispatch = useDispatch()

   const petDetails = useSelector((state) => state.petDetails)
   const { error, loading, pet } = petDetails

   useEffect(() => {
      if (Object.keys(pet).length === 0) {
         dispatch(listPetDetails(match.params.id))
      }

      if (Object.keys(pet).length > 0) {
         setName(pet.name)
         setGender(pet.gender)
         setType(pet.petType)
      }
   }, [dispatch, pet])

   useEffect(() => {
      if (Object.keys(pet).length > 0) {
         dispatch({ type: PET_DETAILS_RESET })
      }
   }, [history])

   const submitHandler = (e) => {
      e.preventDefault()

      const formData = new FormData()

      formData.append('file', file)
      formData.append(
         'petDto',
         new Blob([JSON.stringify({ name, gender, petType })], {
            type: 'application/json',
         })
      )

      dispatch(updatePet(match.params.id, formData))

      history.push('/admin/animals')
   }

   return (
      <FormContainer>
         <h1 className='form-title'>UPDATE PET</h1>
         <Form onSubmit={submitHandler} className='contact-form'>
            <Form.Row>
               <Form.Group as={Col} controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                     type='text'
                     placeholder='Enter Name'
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
               </Form.Group>
            </Form.Row>
            <Form.Row>
               <Form.Group as={Col} controlId='image'>
                  <Form.Label>Image</Form.Label>
                  <Dropzone setFile={setFile} />
               </Form.Group>
            </Form.Row>

            <Form.Row>
               <Form.Group as={Col} controlId='image'>
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                     as='select'
                     value={petType}
                     onChange={(e) => setType(e.target.value)}
                  >
                     <option value='DOG'>DOG</option>
                     <option value='CAT'>CAT</option>
                  </Form.Control>
               </Form.Group>
               <Form.Group as={Col} controlId='image'>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                     as='select'
                     value={gender}
                     onChange={(e) => setGender(e.target.value)}
                  >
                     <option value='MALE'>MALE</option>
                     <option value='FEMALE'>FEMALE</option>
                  </Form.Control>
               </Form.Group>
            </Form.Row>
            <Button
               variant='primary'
               onClick={() => history.push('/admin/animals')}
               style={{ marginRight: '10px' }}
            >
               CANCEL
            </Button>
            <Button type='submit' variant='primary'>
               UPDATE
            </Button>
         </Form>
      </FormContainer>
   )
}

export default EditPet
