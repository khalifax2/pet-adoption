import axios from 'axios'
import {
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_LOGIN_FAIL,
   USER_LOGOUT,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
   USER_REGISTER_FAIL,
   EMAIL_VERIFICATION_SUCCESS,
   EMAIL_VERIFICATION_FAIL,
   USER_LIST_REQUEST,
   USER_LIST_SUCCESS,
   USER_LIST_FAIL,
   USER_REMOVE_SUCCESS,
   USER_DETAILS_REQUEST,
   USER_DETAILS_SUCCESS,
   USER_DETAILS_FAIL,
   USER_UPDATE_REQUEST,
   USER_UPDATE_SUCCESS,
   USER_UPDATE_FAIL,
} from '../constants/userConstants'
import { PET_RESERVATION_RESET } from '../constants/reservationConstants'

export const login = (email, password) => async (dispatch) => {
   try {
      dispatch({ type: USER_LOGIN_REQUEST })

      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      }

      const res = await axios.post(
         '/api/v1/users/login',
         { email, password },
         config
      )

      const configAuth = {
         headers: {
            Authorization: `${res.headers.authorization}`,
         },
      }

      const { data } = await axios.get('api/v1/users/username', configAuth)

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

      data.token = res.headers.authorization.split(' ')[1]

      localStorage.setItem('userInfo', JSON.stringify(data))
   } catch (error) {
      dispatch({
         type: USER_LOGIN_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}

export const logout = () => async (dispatch) => {
   localStorage.removeItem('userInfo')
   dispatch({ type: USER_LOGOUT })
   dispatch({ type: PET_RESERVATION_RESET })
   localStorage.removeItem('userInfo')
   localStorage.removeItem('reservation')
}

export const register = (userData) => async (dispatch) => {
   try {
      dispatch({ type: USER_REGISTER_REQUEST })

      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      }
      const { data } = await axios.post('/api/v1/users', userData, config)

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
   } catch (error) {
      console.log(error.response)
      dispatch({
         type: USER_REGISTER_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}

export const registerAdmin = (userData) => async (dispatch) => {
   try {
      dispatch({ type: USER_REGISTER_REQUEST })

      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      }
      const { data } = await axios.post('/api/v1/users/admin', userData, config)

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
   } catch (error) {
      console.log(error.response)
      dispatch({
         type: USER_REGISTER_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}

export const verifyEmail = (token) => async (dispatch) => {
   try {
      dispatch({ type: USER_REGISTER_REQUEST })

      const { data } = await axios.get(
         `/api/v1/users/email-verification?token=${token}`
      )
      console.log('VERIFY EMAIL')
      console.log(data)
      dispatch({ type: EMAIL_VERIFICATION_SUCCESS, payload: data })
   } catch (error) {
      console.log(error.response)
      dispatch({
         type: EMAIL_VERIFICATION_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}

export const listUsers = (pageNumber) => async (dispatch, getState) => {
   try {
      dispatch({ type: USER_LIST_REQUEST })

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
         `/api/v1/users?page=${pageNumber}&limit=50`,
         config
      )

      dispatch({ type: USER_LIST_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: USER_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}

export const removeUser = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: USER_LIST_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      await axios.delete(`/api/v1/users/${id}`, config)

      dispatch({ type: USER_REMOVE_SUCCESS, payload: id })
   } catch (error) {
      console.log('ERROR', error)
      dispatch({
         type: USER_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}

export const getUser = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: USER_DETAILS_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(`/api/v1/users/${id}`, config)

      dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: USER_DETAILS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}

export const updateUser = (id, userData) => async (dispatch, getState) => {
   try {
      dispatch({ type: USER_UPDATE_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json',
         },
      }

      await axios.put(`/api/v1/users/${id}`, userData, config)

      dispatch({ type: USER_UPDATE_SUCCESS, success: true })
   } catch (error) {
      console.log(error.response)
      dispatch({
         type: USER_UPDATE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.response,
      })
   }
}
