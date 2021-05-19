import {
   MESSAGE_LIST_REQUEST,
   MESSAGE_LIST_SUCCESS,
   MESSAGE_REMOVE_SUCCESS,
   MESSAGE_LIST_FAIL,
   MESSAGE_DETAILS_FAIL,
   MESSAGE_DETAILS_REQUEST,
   MESSAGE_DETAILS_SUCCESS,
} from '../constants/contactConstants'

export const messageListReducer = (state = { messages: [] }, action) => {
   switch (action.type) {
      case MESSAGE_LIST_REQUEST:
         return { loading: true, ...state }
      case MESSAGE_LIST_SUCCESS:
         return { loading: false, messages: action.payload }
      case MESSAGE_REMOVE_SUCCESS:
         return {
            loading: false,
            ...state,
            messages: state.messages.filter(
               (message) => message.id !== action.payload
            ),
         }
      case MESSAGE_LIST_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const messageDetailsReducer = (state = {}, action) => {
   switch (action.type) {
      case MESSAGE_DETAILS_REQUEST:
         return { loading: true, ...state }
      case MESSAGE_DETAILS_SUCCESS:
         return { loading: false, message: action.payload }
      case MESSAGE_DETAILS_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}
