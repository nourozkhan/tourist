import Action from '../actions/action';

const Initial_state = {

  get_places: [],
  get_particular_places: [],
  user_navigate_coords: [],
  
}

function MyReducer(state = Initial_state, action) {
  switch (action.type) {

    case Action.GET_PLACES:
      return Object.assign({}, state, { get_places: action.payload });

    case Action.GET_PARTICULAR_PLACES:
      return Object.assign({}, state, { get_particular_places: action.payload });

    case Action.USER_NAVIGATION:
      return Object.assign({}, state, { user_navigate_coords: action.payload });

    default:
      return state
  }
}

export default MyReducer;