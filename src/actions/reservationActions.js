import axios from 'axios'
import {
   PET_RESERVATION_REQUEST,
   PET_RESERVATION_CREATE,
   PET_RESERVATION_REMOVE,
   RESERVATION_LIST,
   PET_RESERVATION_FAIL,
   RESERVATION_LIST_REQUEST,
   RESERVATION_LIST_SUCCESS,
   RESERVATION_COUNT_SUCCESS,
   RESERVATION_LIST_REMOVE,
   RESERVATION_LIST_FAIL,
} from '../constants/reservationConstants'

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

      await axios.post(`/api/v1/reservation`, formData, config)

      dispatch({ type: PET_RESERVATION_CREATE })
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

export const getUserReservedPet = () => async (dispatch, getState) => {
   try {
      dispatch({ type: PET_RESERVATION_REQUEST })

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

      dispatch({ type: RESERVATION_LIST, payload: data })

      localStorage.setItem(
         'reservation',
         JSON.stringify(getState().userReservedPet.reservation)
      )
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

export const removeUserReservedPet = (reservationId) => async (
   dispatch,
   getState
) => {
   try {
      dispatch({ type: PET_RESERVATION_REMOVE })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      await axios.delete(
         `/api/v1/reservation/${reservationId}/user/${userInfo.userId}`,
         config
      )

      dispatch({ type: PET_RESERVATION_REMOVE, payload: reservationId })

      localStorage.setItem(
         'reservation',
         JSON.stringify(getState().userReservedPet.reservation)
      )
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

export const updateReservation = (id, formData) => async (
   dispatch,
   getState
) => {
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

      await axios.put(`/api/v1/reservation/${id}`, formData, config)

      dispatch({ type: PET_RESERVATION_CREATE })
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

export const listReservations = () => async (dispatch, getState) => {
   try {
      dispatch({ type: RESERVATION_LIST_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `/api/v1/reservation?page=1&limit=50`,
         config
      )

      dispatch({ type: RESERVATION_LIST_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: RESERVATION_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}

export const listReservationsToday = () => async (dispatch, getState) => {
   try {
      dispatch({ type: RESERVATION_LIST_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `/api/v1/reservation/pickup-today?page=1&limit=50`,
         config
      )

      dispatch({ type: RESERVATION_LIST_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: RESERVATION_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}

export const removeReservation = (reservationId) => async (
   dispatch,
   getState
) => {
   try {
      dispatch({ type: RESERVATION_LIST_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      await axios.delete(
         `/api/v1/reservation/${reservationId}/user/${userInfo.userId}`,
         config
      )

      dispatch({ type: RESERVATION_LIST_REMOVE, payload: reservationId })
   } catch (error) {
      dispatch({
         type: RESERVATION_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}

export const getReservationCount = () => async (dispatch, getState) => {
   try {
      dispatch({ type: RESERVATION_LIST_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(`/api/v1/reservation/count`, config)

      dispatch({ type: RESERVATION_COUNT_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: RESERVATION_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}
