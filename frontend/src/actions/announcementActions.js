import axios from 'axios'

import {
    ALL_ANNOUNCEMENTS_REQUEST,
    ALL_ANNOUNCEMENTS_SUCCESS,
    ALL_ANNOUNCEMENTS_FAIL,
    ADMIN_ANNOUNCEMENTS_REQUEST,
    ADMIN_ANNOUNCEMENTS_SUCCESS,
    ADMIN_ANNOUNCEMENTS_FAIL,
    NEW_ANNOUNCEMENT_REQUEST,
    NEW_ANNOUNCEMENT_SUCCESS,
    NEW_ANNOUNCEMENT_FAIL,
    DELETE_ANNOUNCEMENT_REQUEST,
    DELETE_ANNOUNCEMENT_SUCCESS,
    DELETE_ANNOUNCEMENT_FAIL,
    UPDATE_ANNOUNCEMENT_REQUEST,
    UPDATE_ANNOUNCEMENT_SUCCESS,
    UPDATE_ANNOUNCEMENT_FAIL,
    CLEAR_ERRORS
} from '../constants/announcementConstants';

export const getAnnouncements = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ANNOUNCEMENTS_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/announcement`, )
        dispatch({
            type: ALL_ANNOUNCEMENTS_SUCCESS,
            payload: data.announcements
        })
    } catch (error) {
        dispatch({
            type: ALL_ANNOUNCEMENTS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getAdminAnnouncements = () => async (dispatch) => {

  try {



      dispatch({ type: ADMIN_ANNOUNCEMENTS_REQUEST })



      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/announcements`)



      dispatch({

          type: ADMIN_ANNOUNCEMENTS_SUCCESS,

          payload: data.announcements

      })



  } catch (error) {



      dispatch({

          type: ADMIN_ANNOUNCEMENTS_FAIL,

          payload: error.response.data.message

      })

  }

}

export const newAnnouncement = (announcementData) => async (dispatch) => {

  try {

      dispatch({ type: NEW_ANNOUNCEMENT_REQUEST })

      const config = {

          headers: {

              'Content-Type': 'application/json'

          }

      }

      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/admin/announcement/new`, announcementData, config)

      dispatch({

          type: NEW_ANNOUNCEMENT_SUCCESS,

          payload: data

      })

  } catch (error) {

      dispatch({

          type: NEW_ANNOUNCEMENT_FAIL,

          payload: error.response.data.message

      })

  }

}





export const deleteAnnouncement = (id) => async (dispatch) => {

    try {



        dispatch({ type: DELETE_ANNOUNCEMENT_REQUEST })



        const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/admin/announcement/${id}`)



        dispatch({

            type: DELETE_ANNOUNCEMENT_SUCCESS,

            payload: data.success

        })



    } catch (error) {

        dispatch({

            type: DELETE_ANNOUNCEMENT_FAIL,

            payload: error.response.data.message

        })

    }

}

export const updateAnnouncement = (id, announcementData) => async (dispatch) => {

  try {



      dispatch({ type: UPDATE_ANNOUNCEMENT_REQUEST })



      const config = {

          headers: {

              'Content-Type': 'application/json'

          }

      }



      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/admin/announcement/${id}`, announcementData, config)



      dispatch({

          type: UPDATE_ANNOUNCEMENT_SUCCESS,

          payload: data.success

      })



  } catch (error) {

      dispatch({

          type: UPDATE_ANNOUNCEMENT_FAIL,

          payload: error.response.data.message

      })

  }

}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

