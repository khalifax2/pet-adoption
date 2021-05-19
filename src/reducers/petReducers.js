import {
   PET_LIST_REQUEST,
   PET_LIST_SUCCESS,
   PET_LIST_FAIL,
   PET_DETAILS_REQUEST,
   PET_DETAILS_SUCCESS,
   PET_DETAILS_FAIL,
   PET_DETAILS_RESET,
   PET_REMOVE_SUCCESS,
   CREATE_PET_REQUEST,
   CREATE_PET_SUCCESS,
   CREATE_PET_FAIL,
   PET_UPDATE_REQUEST,
   PET_UPDATE_SUCCESS,
   PET_UPDATE_FAIL,
} from '../constants/petConstants'

export const petListReducer = (state = { pets: [] }, action) => {
   switch (action.type) {
      case PET_LIST_REQUEST:
         return { loading: true, ...state }
      case PET_LIST_SUCCESS:
         return { loading: false, pets: action.payload }
      case PET_REMOVE_SUCCESS:
         return {
            loading: false,
            ...state,
            pets: state.pets.filter((pet) => pet.id !== action.payload),
         }
      case PET_LIST_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const petDetailsReducer = (state = { pet: {} }, action) => {
   switch (action.type) {
      case PET_DETAILS_REQUEST:
         return { ...state, loading: true }
      case PET_DETAILS_SUCCESS:
         return { loading: false, pet: action.payload }
      case PET_DETAILS_FAIL:
         return { loading: false, error: action.payload }
      case PET_DETAILS_RESET:
         return { pet: {} }
      default:
         return state
   }
}

export const petUpdateReducer = (state = {}, action) => {
   switch (action.type) {
      case PET_UPDATE_REQUEST:
         return { loading: true }
      case PET_UPDATE_SUCCESS:
         return { loading: false, success: true }
      case PET_UPDATE_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const createdPetReducer = (state = { pet: {} }, action) => {
   switch (action.type) {
      case CREATE_PET_REQUEST:
         return { loading: true }
      case CREATE_PET_SUCCESS:
         return { loading: false, success: true }
      case CREATE_PET_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}
