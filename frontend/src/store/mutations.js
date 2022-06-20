import {
    FETCH_HOTEL_LIST,
    FETCH_HOTEL,
} from './mutation-types'

export default {
    IS_LOGGEDIN(state){
        state.isLoggedIn = true
    },
    NOT_LOGGEDIN(state){
        state.isLoggedIn = false
    },
    SET_USER(state, user){
        state.user = user
    },
    [FETCH_HOTEL_LIST] (state, hotels) {
        state.hotels = hotels
    },
    [FETCH_HOTEL] (state, hotel) {
        state.hotel = hotel
    }
}