export default class Action {

    static GET_PLACES = "GET_PLACES"
    static GET_PARTICULAR_PLACES = "GET_PARTICULAR_PLACES"
    static USER_NAVIGATION = "USER_NAVIGATION"
   
     static getPlaces(arr) {
        return {
            type: Action.GET_PLACES,
            payload: arr
        }
    }

    static getParticularPlaces(arr) {
        return {
            type: Action.GET_PARTICULAR_PLACES,
            payload: arr
        }
    }

    static userNavigation(coords) {
        return {
            type: Action.USER_NAVIGATION,
            payload: coords
        }
    }
    

}