import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateAnnouncement, getAdminAnnouncements, clearErrors } from '../../actions/announcementActions'
import { UPDATE_ANNOUNCEMENT_RESET } from '../../constants/announcementConstants'
import { useForm } from "react-hook-form";

const UpdateAnnouncement = () => {
    const { register, handleSubmit, watch, formState:{errors}} = useForm( {mode: 'onChange'});
    const onSubmit = data => console.log(data);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [publisher, setPublisher] = useState('');

    const dispatch = useDispatch();

    const { loading, error: updateError, isUpdated, announcement } = useSelector(state => state.announcement);
    let { id } = useParams();
    let navigate = useNavigate();
    const errMsg = (message = '') => toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    const successMsg = (message = '') => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    useEffect(() => {
        if (announcement && announcement._id !== id) {
            dispatch(getAdminAnnouncements(id));
        } else {
            setName(announcement.name);
            setDescription(announcement.description);
            setPublisher(announcement.publisher);
        }
        // if (error) {
        //     errMsg(error)
        //     dispatch(clearErrors())
        // }
        if (updateError) {
            errMsg(updateError);
            dispatch(clearErrors())
        }
        if (isUpdated) {
            navigate('/admin/announcements');
            successMsg('Announcement updated successfully');
            dispatch({ type: UPDATE_ANNOUNCEMENT_RESET })
        }
    }, [dispatch, isUpdated, navigate, updateError, announcement, id])

    const submitHandler = (data, e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('description', description);
        formData.set('publisher', publisher);
        dispatch(updateAnnouncement(announcement._id, formData))}

        return (
            <Fragment>
                <MetaData title={'Update Announcement'} />
                <div className="row">
                    <div className="col-12 col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-12 col-md-10">
                        <Fragment>
                            <div className="wrapper my-5 white">
                                <form className="shadow-lg" onSubmit={handleSubmit(submitHandler)} encType='multipart/form-data'>
                                    <h1 className="mb-4">Update Announcement</h1>
                                    <div className="form-group">
                                        <label htmlFor="name_field">Title</label>
                                        <input
    
                                            type="text"
                                            {...register("name", { required: "Announcement Title is required!" })}
                                            id="name_field"
    
                                            className="form-control"
    
                                            value={name}
    
                                            onChange={(e) => setName(e.target.value)}
    
                                            // required
    
                                        />
                                        {errors.name && <p className='red'><i>{errors.name.message}</i></p>}
    
                                    </div>
    
    
                                    <div className="form-group">
    
                                        <label htmlFor="description_field">Description</label>
    
                                        <textarea className="form-control" id="description_field" 
                                         {...register("description", { required: "Announcement Description is required!" })}
                                         rows="8" value={description} onChange={(e) => setDescription(e.target.value)}  
                                        //  required
                                         ></textarea>
    {errors.description && <p className='red'><i>{errors.description.message}</i></p>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="publisher_field">Title</label>
                                        <input
    
                                            type="text"
                                            {...register("publisher", { required: "Announcement Publisher is required!" })}
                                            id="publisher_field"
    
                                            className="form-control"
    
                                            value={name}
    
                                            onChange={(e) => setName(e.target.value)}
    
                                            // required
    
                                        />
                                        {errors.publisher && <p className='red'><i>{errors.publisher.message}</i></p>}
    
                                    </div>
    
                                   
                                    <button
    
                                        id="login_button"
    
                                        type="submit"
    
                                        className="btn btn-block py-3"
    
                                        disabled={loading ? true : false}
    
                                    >
    
                                        UPDATE
    
                                    </button>
    
                                </form>
    
                            </div>
    
                        </Fragment>
    
                    </div>
    
                </div>
    
            </Fragment>
    
        )
    
    }
    
    
    
    export default UpdateAnnouncement