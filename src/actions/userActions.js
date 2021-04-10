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
} from '../constants/userConstants'
import { USER_RESERVED_PET_RESET } from '../constants/reservationConstants'

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
   dispatch({ type: USER_RESERVED_PET_RESET })
}

export const register = (userData) => async (dispatch) => {
   try {
      dispatch({ type: USER_REGISTER_REQUEST })
      console.log('REGISTER')

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
