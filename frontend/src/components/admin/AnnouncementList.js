import React, { Fragment, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'

import { getAdminAnnouncements, 
    deleteAnnouncement, 
    clearErrors } from '../../actions/announcementActions'

import { DELETE_ANNOUNCEMENT_RESET } from '../../constants/announcementConstants'

const AnnouncementsList = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate()
    const { loading, error, announcements } = useSelector(state => state.announcements);
    const { error: deleteError, isDeleted } = useSelector(state => state.announcement)
    useEffect(() => {
        dispatch(getAdminAnnouncements());
        if (error) {
            dispatch(clearErrors())
        }
        if (deleteError) {
            dispatch(clearErrors())
        }
        if (isDeleted) {
            
            navigate('/admin/announcements');
            dispatch({ type: DELETE_ANNOUNCEMENT_RESET })
        }



    }, [dispatch,  error, navigate, isDeleted, deleteError])

    
    // [dispatch, alert, error, deleteError, isDeleted, navigate])
    const setAnnouncements = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc',
                    
                },
                {
                    label: 'Title',
                    field: 'title',
                    sort: 'asc'
                },
                {
                    label: 'Description',
                    field: 'description',
                    sort: 'asc'
                },
                {
                    label: 'Publisher',
                    field: 'Publisher',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        announcements.forEach(announcement => {
            data.rows.push({
                id: announcement._id,
                title: announcement.title,
                description: announcement.description,
                publisher: announcement.publisher,
                actions: <Fragment>
                    <Link to={`/admin/announcement/${announcement._id}`} className="btn btn-info py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteAnnouncementHandler(announcement._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })
        return data;
    }
    const deleteAnnouncementHandler = (id) => {

        dispatch(deleteAnnouncement(id))

    } 
    console.log(setAnnouncements());
    return (
        <Fragment>
          <MetaData title={'All Announcements'} />
            <div className="row white">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                   <div class="ribbon-wrapper"> <h3 class="ribbon">
<strong class="ribbon-inner">All Announcments</strong>
</h3>
</div>
                        {/* <h1 className="my-5">All Announcements</h1> */}
                        {loading ? <Loader /> : (

                            <MDBDataTable
                           
                                data={setAnnouncements()}
                                className="px-3 white"
                                maxHeight='520px' maxWidth='520px'
                    bordered

                    striped

                    hover

                            />
                           
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}
export default AnnouncementsList