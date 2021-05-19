import axios from 'axios'
import {
   PET_LIST_FAIL,
   PET_LIST_REQUEST,
   PET_LIST_SUCCESS,
   PET_DETAILS_REQUEST,
   PET_DETAILS_SUCCESS,
   PET_DETAILS_FAIL,
   PET_REMOVE_SUCCESS,
   CREATE_PET_REQUEST,
   CREATE_PET_SUCCESS,
   CREATE_PET_FAIL,
   PET_UPDATE_REQUEST,
   PET_UPDATE_SUCCESS,
   PET_UPDATE_FAIL,
} from '../constants/petConstants'

export const createPet = (formData) => async (dispatch, getState) => {
   try {
      dispatch({ type: CREATE_PET_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.post('/api/v1/pets', formData, config)

      dispatch({ type: CREATE_PET_SUCCESS, payload: data })
   } catch (error) {
      console.log(error.response)
      dispatch({
         type: CREATE_PET_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}

export const updatePet = (id, formData) => async (dispatch, getState) => {
   try {
      dispatch({ type: PET_UPDATE_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      await axios.put(`/api/v1/pets/${id}`, formData, config)

      dispatch({ type: PET_UPDATE_SUCCESS, success: true })
   } catch (error) {
      console.log(error.response)
      dispatch({
         type: PET_UPDATE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}

export const listAvailablePets = (pageNumber) => async (dispatch) => {
   try {
      dispatch({ type: PET_LIST_REQUEST })

      const { data } = await axios.get(
         `/api/v1/pets/available?page=${pageNumber}&limit=50`
      )

      dispatch({ type: PET_LIST_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: PET_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}

export const listPets = (pageNumber) => async (dispatch) => {
   try {
      dispatch({ type: PET_LIST_REQUEST })

      const { data } = await axios.get(
         `/api/v1/pets?page=${pageNumber}&limit=50`
      )

      dispatch({ type: PET_LIST_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: PET_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}

export const listPetDetails = (petId) => async (dispatch) => {
   try {
      dispatch({ type: PET_DETAILS_REQUEST })

      const { data } = await axios.get(`/api/v1/pets/${petId}`)

      dispatch({ type: PET_DETAILS_SUCCESS, payload: data })
   } catch (error) {
      console.log(error)
      dispatch({
         type: PET_DETAILS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}

export const removePet = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: PET_LIST_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      await axios.delete(`/api/v1/pets/${id}`, config)

      dispatch({ type: PET_REMOVE_SUCCESS, payload: id })
   } catch (error) {
      console.log('ERROR', error)
      dispatch({
         type: PET_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}
