import axios from 'axios'
import {
   MESSAGE_LIST_REQUEST,
   MESSAGE_LIST_SUCCESS,
   MESSAGE_REMOVE_SUCCESS,
   MESSAGE_LIST_FAIL,
   MESSAGE_DETAILS_FAIL,
   MESSAGE_DETAILS_REQUEST,
   MESSAGE_DETAILS_SUCCESS,
} from '../constants/contactConstants'

export const submitMessages = (formData) => async (dispatch, getState) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      }

      await axios.post('/api/v1/message', formData, config)
   } catch (error) {
      console.log(error.response)
      //   dispatch({
      //      type: CREATE_PET_FAIL,
      //      payload:
      //         error.response && error.response.data.message
      //            ? error.response.data.message
      //            : error.response,
      //   })
   }
}

export const listMessages = (pageNumber) => async (dispatch, getState) => {
   try {
      dispatch({ type: MESSAGE_LIST_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(
         `/api/v1/message?page=${pageNumber}&limit=50`,
         config
      )

      dispatch({ type: MESSAGE_LIST_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: MESSAGE_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}

export const getMessage = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: MESSAGE_DETAILS_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(`/api/v1/message/${id}`, config)

      dispatch({ type: MESSAGE_DETAILS_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: MESSAGE_DETAILS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}

export const removeMessage = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: MESSAGE_LIST_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      await axios.delete(`/api/v1/message/${id}`, config)

      dispatch({ type: MESSAGE_REMOVE_SUCCESS, payload: id })
   } catch (error) {
      dispatch({
         type: MESSAGE_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}
