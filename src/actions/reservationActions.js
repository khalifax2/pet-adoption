import axios from 'axios'
import {
   USER_RESERVED_PET_REQUEST,
   USER_RESERVED_PET_SUCCESS,
   USER_RESERVED_PET_FAIL,
   USER_RESERVED_PET_REMOVE,
} from '../constants/reservationConstants'

export const getUserReservedPet = () => async (dispatch, getState) => {
   try {
      dispatch({ type: USER_RESERVED_PET_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `/api/v1/reservation/profile/${userInfo.userId}`,
         config
      )

      dispatch({ type: USER_RESERVED_PET_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: USER_RESERVED_PET_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}

export const removeUserReservedPet = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: USER_RESERVED_PET_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.delete(`/api/v1/reservation/${id}`, config)
      console.log(data)
      dispatch({ type: USER_RESERVED_PET_REMOVE, payload: id })
   } catch (error) {
      console.log('ERROR', error.response)
      dispatch({
         type: USER_RESERVED_PET_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}
