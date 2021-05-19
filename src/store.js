import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
   userLoginReducer,
   userRegisterReducer,
   userListReducer,
   userDetailsReducer,
   userUpdateReducer,
} from './reducers/userReducers'
import {
   petListReducer,
   petDetailsReducer,
   createdPetReducer,
   petUpdateReducer,
} from './reducers/petReducers'
import {
   userReservedPetReducer,
   reservationReducer,
} from './reducers/reservationReducers'
import {
   messageListReducer,
   messageDetailsReducer,
} from './reducers/contactReducers'

const reducer = combineReducers({
   userLogin: userLoginReducer,
   userRegister: userRegisterReducer,
   petList: petListReducer,
   petDetails: petDetailsReducer,
   userReservedPet: userReservedPetReducer,
   userList: userListReducer,
   userDetails: userDetailsReducer,
   reservation: reservationReducer,
   userUpdate: userUpdateReducer,
   createdPet: createdPetReducer,
   petUpdate: petUpdateReducer,
   messageList: messageListReducer,
   messageDetails: messageDetailsReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
   ? JSON.parse(localStorage.getItem('userInfo'))
   : null

const userReservedPetFromStorage = localStorage.getItem('reservation')
   ? JSON.parse(localStorage.getItem('reservation'))
   : []

const initialState = {
   userLogin: { userInfo: userInfoFromStorage },
   userReservedPet: { reservation: userReservedPetFromStorage },
}

const middleware = [thunk]

const store = createStore(
   reducer,
   initialState,
   composeWithDevTools(applyMiddleware(...middleware))
)

export default store
