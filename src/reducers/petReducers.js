import {
   PET_LIST_REQUEST,
   PET_LIST_SUCCESS,
   PET_LIST_FAIL,
   PET_RESERVATION_REQUEST,
   PET_RESERVATION_SUCCESS,
   PET_RESERVATION_FAIL,
   PET_RESERVATION_RESET,
   PET_DETAILS_REQUEST,
   PET_DETAILS_SUCCESS,
   PET_DETAILS_FAIL,
   PET_DETAILS_RESET,
} from '../constants/petConstants'

export const petListReducer = (state = { pets: [] }, action) => {
   switch (action.type) {
      case PET_LIST_REQUEST:
         return { loading: true, ...state }
      case PET_LIST_SUCCESS:
         return { loading: false, pets: action.payload }
      case PET_LIST_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const petDetailsReducer = (state = {}, action) => {
   switch (action.type) {
      case PET_DETAILS_REQUEST:
         return { loading: true }
      case PET_DETAILS_SUCCESS:
         return { loading: false, pet: action.payload }
      case PET_DETAILS_FAIL:
         return { loading: false, error: action.payload }
      case PET_DETAILS_RESET:
         return state
      default:
         return state
   }
}

export const petReserveReducer = (state = {}, action) => {
   switch (action.type) {
      case PET_RESERVATION_REQUEST:
         return { loading: true, ...state }
      case PET_RESERVATION_SUCCESS:
         return { loading: false, success: true }
      case PET_RESERVATION_FAIL:
         return { loading: false, error: action.payload }
      case PET_RESERVATION_RESET:
         return state
      default:
         return state
   }
}
