import { combineReducers } from 'redux'

const initialState = {
  currentStep: 'CONTACT'
}

const appState = (state = initialState , action) => {
  switch (action.type) {
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.step}
    default:
      return state
  }
}

export default combineReducers({
  appState
})