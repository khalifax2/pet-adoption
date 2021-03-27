import {
   PET_LIST_REQUEST,
   PET_LIST_SUCCESS,
   PET_LIST_FAIL,
   PET_RESERVE_REQUEST,
   PET_RESERVE_SUCCESS,
   PET_RESERVE_FAIL,
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

export const petReserveReducer = (state = { pets: [] }, action) => {
   switch (action.type) {
      case PET_RESERVE_REQUEST:
         return { loading: true, ...state }
      case PET_RESERVE_SUCCESS:
         return { loading: false, success: true }
      case PET_RESERVE_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}
