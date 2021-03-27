import axios from 'axios'
import {
   PET_LIST_FAIL,
   PET_LIST_REQUEST,
   PET_LIST_SUCCESS,
} from '../constants/petConstants'

export const listPets = () => async (dispatch, getState) => {
   try {
      dispatch({ type: PET_LIST_REQUEST })

      const { data } = await axios.get(`/api/v1/pets?page=1&limit=6`)

      dispatch({ type: PET_LIST_SUCCESS, payload: data })
   } catch (error) {
      console.log(error.response)
      dispatch({
         type: PET_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}

export const reservePet = (formData) => async (dispatch, getState) => {
   try {
      dispatch({ type: PET_LIST_REQUEST })
      console.log(formData)

      const userInfo = getState('userInfo')

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }
      const { data } = await axios.post(`/api/v1/pets?page=1&limit=6`)
      dispatch({ type: PET_LIST_SUCCESS, payload: data })
   } catch (error) {
      console.log(error.response)
      dispatch({
         type: PET_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}
