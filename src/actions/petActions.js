import axios from 'axios'
import {
   PET_LIST_FAIL,
   PET_LIST_REQUEST,
   PET_LIST_SUCCESS,
   PET_DETAILS_REQUEST,
   PET_DETAILS_SUCCESS,
   PET_DETAILS_FAIL,
   PET_RESERVATION_REQUEST,
   PET_RESERVATION_SUCCESS,
   PET_RESERVATION_FAIL,
} from '../constants/petConstants'

export const listPets = () => async (dispatch, getState) => {
   try {
      dispatch({ type: PET_LIST_REQUEST })

      const { data } = await axios.get(`/api/v1/pets/available?page=1&limit=6`)

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

export const reservePet = (formData) => async (dispatch, getState) => {
   try {
      dispatch({ type: PET_RESERVATION_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.post(`/api/v1/reservation`, formData, config)

      dispatch({ type: PET_RESERVATION_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: PET_RESERVATION_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}
