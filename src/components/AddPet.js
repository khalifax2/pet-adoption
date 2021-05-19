import React, { useState } from 'react'
import { Col, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import FormContainer from './FormContainer'
import Dropzone from './Dropzone'
import { createPet } from '../actions/petActions'

const AddPet = ({ changeAction, action }) => {
   const [name, setName] = useState('')
   const [file, setFile] = useState({})
   const [gender, setGender] = useState('MALE')
   const [petType, setType] = useState('DOG')

   const dispatch = useDispatch()

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

      if (action === 'add') {
         dispatch(createPet(formData))
      } else {
      }

      changeAction(null)
   }

   return (
      <FormContainer>
         <h1 className='form-title'>CREATE PET</h1>
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
               onClick={() => changeAction(null)}
               style={{ marginRight: '10px' }}
            >
               CANCEL
            </Button>
            <Button type='submit' variant='primary'>
               Create
            </Button>
         </Form>
      </FormContainer>
   )
}

export default AddPet
