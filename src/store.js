import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import { petListReducer, petDetailsReducer } from './reducers/petReducers'
import { userReservedPetReducer } from './reducers/reservationReducers'

const reducer = combineReducers({
   userLogin: userLoginReducer,
   userRegister: userRegisterReducer,
   petList: petListReducer,
   petDetails: petDetailsReducer,
   userReservedPet: userReservedPetReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
   ? JSON.parse(localStorage.getItem('userInfo'))
   : null

const initialState = {
   userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
   reducer,
   initialState,
   composeWithDevTools(applyMiddleware(...middleware))
)

export default store
