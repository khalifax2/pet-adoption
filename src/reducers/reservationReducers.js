import {
   USER_RESERVED_PET_REQUEST,
   USER_RESERVED_PET_SUCCESS,
   USER_RESERVED_PET_FAIL,
   USER_RESERVED_PET_REMOVE,
} from '../constants/reservationConstants'

export const userReservedPetReducer = (state = { pets: [] }, action) => {
   switch (action.type) {
      case USER_RESERVED_PET_REQUEST:
         return { loading: true, ...state }
      case USER_RESERVED_PET_SUCCESS:
         return { loading: false, pets: action.payload }
      case USER_RESERVED_PET_REMOVE:
         return {
            ...state,
            pets: state.userReservedPet.pets.filter(
               (pet) => pet.reservationId !== action.payload
            ),
         }
      case USER_RESERVED_PET_FAIL:
         return { loading: false, error: action.payload, pets: [] }
      default:
         return state
   }
}
