import {
   PET_RESERVATION_REQUEST,
   RESERVATION_LIST,
   PET_RESERVATION_REMOVE,
   PET_RESERVATION_FAIL,
   PET_RESERVATION_CREATE,
   PET_RESERVATION_RESET,
   RESERVATION_LIST_REQUEST,
   RESERVATION_LIST_SUCCESS,
   RESERVATION_COUNT_SUCCESS,
   RESERVATION_LIST_REMOVE,
   RESERVATION_LIST_FAIL,
   RESERVATION_LIST_RESET,
} from '../constants/reservationConstants'

export const userReservedPetReducer = (state = { reservation: [] }, action) => {
   switch (action.type) {
      case PET_RESERVATION_REQUEST:
         return { loading: true, ...state }
      case RESERVATION_LIST:
         return {
            loading: false,
            reservation: action.payload,
         }
      case PET_RESERVATION_CREATE:
         return {
            loading: false,
            success: true,
            ...state,
         }
      case PET_RESERVATION_REMOVE:
         return {
            ...state,
            reservation: state.reservation.filter(
               (r) => r.reservationId !== action.payload
            ),
         }
      case PET_RESERVATION_FAIL:
         return { loading: false, error: action.payload }
      case PET_RESERVATION_RESET:
         return { reservation: [] }
      default:
         return state
   }
}

export const reservationReducer = (
   state = { reservations: [], reservationCount: {} },
   action
) => {
   switch (action.type) {
      case RESERVATION_LIST_REQUEST:
         return { loading: true, ...state }
      case RESERVATION_LIST_SUCCESS:
         return { ...state, loading: false, reservations: action.payload }
      case RESERVATION_COUNT_SUCCESS:
         return { ...state, loading: false, reservationCount: action.payload }
      case RESERVATION_LIST_REMOVE:
         return {
            ...state,
            loading: false,
            reservations: state.reservations.filter(
               (r) => r.reservationId !== action.payload
            ),
         }
      case RESERVATION_LIST_FAIL:
         return { loading: false, error: action.payload }
      case RESERVATION_LIST_RESET:
         return { ...state, reservations: [] }
      default:
         return state
   }
}
