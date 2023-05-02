import {
ALL_ANNOUNCEMENTS_REQUEST,
ALL_ANNOUNCEMENTS_SUCCESS,
ALL_ANNOUNCEMENTS_FAIL,

ADMIN_ANNOUNCEMENTS_REQUEST,

    ADMIN_ANNOUNCEMENTS_SUCCESS,

    ADMIN_ANNOUNCEMENTS_FAIL,
    NEW_ANNOUNCEMENT_REQUEST,

    NEW_ANNOUNCEMENT_SUCCESS,

    NEW_ANNOUNCEMENT_RESET,

    NEW_ANNOUNCEMENT_FAIL,
    DELETE_ANNOUNCEMENT_REQUEST,

    DELETE_ANNOUNCEMENT_SUCCESS,

    DELETE_ANNOUNCEMENT_RESET,

    DELETE_ANNOUNCEMENT_FAIL,
    UPDATE_ANNOUNCEMENT_REQUEST,

    UPDATE_ANNOUNCEMENT_SUCCESS,

    UPDATE_ANNOUNCEMENT_RESET,

    UPDATE_ANNOUNCEMENT_FAIL,
    CLEAR_ERRORS

} from '../constants/announcementConstants'
export const announcementsReducer = (state = { announcements: [] }, action) => {
    switch (action.type) {
        case ALL_ANNOUNCEMENTS_REQUEST:
        case ADMIN_ANNOUNCEMENTS_REQUEST:
            return {
                loading: true,
                announcements: []
            }
        case ALL_ANNOUNCEMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                announcements: action.payload.announcements,
                announcementsCount: action.payload.announcementsCount,
                resPerPage: action.payload.resPerPage,
                filteredAnnouncementsCount: action.payload.filteredAnnouncementsCount
            }
        case ALL_ANNOUNCEMENTS_FAIL:
        case ADMIN_ANNOUNCEMENTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ADMIN_ANNOUNCEMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                announcements: action.payload

            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}    
export const newAnnouncementReducer = (state = { announcement: {} }, action) => {

    switch (action.type) {



        case NEW_ANNOUNCEMENT_REQUEST:

            return {

                ...state,

                loading: true

            }



        case NEW_ANNOUNCEMENT_SUCCESS:

            return {

                loading: false,

                success: action.payload.success,

                announcement: action.payload.announcement

            }



        case NEW_ANNOUNCEMENT_FAIL:

            return {

                ...state,

                error: action.payload

            }



        case NEW_ANNOUNCEMENT_RESET:

            return {

                ...state,

                success: false

            }



        case CLEAR_ERRORS:

            return {

                ...state,

                error: null

            }



        default:

            return state

    }

}

export const announcementReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_ANNOUNCEMENT_REQUEST:
        case UPDATE_ANNOUNCEMENT_REQUEST:
            return {
                ...state,
                loading: true
            }



        case DELETE_ANNOUNCEMENT_SUCCESS:

            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }



        case UPDATE_ANNOUNCEMENT_SUCCESS:

            return {

                ...state,

                loading: false,

                isUpdated: action.payload

            }
        case DELETE_ANNOUNCEMENT_FAIL:
        case UPDATE_ANNOUNCEMENT_FAIL:

            return {

                ...state,

                error: action.payload

            }



        case DELETE_ANNOUNCEMENT_RESET:

            return {

                ...state,

                isDeleted: false

            }



        case UPDATE_ANNOUNCEMENT_RESET:

            return {

                ...state,

                isUpdated: false

            }



        case CLEAR_ERRORS:

            return {

                ...state,

                error: null

            }



        default:

            return state

    }

}