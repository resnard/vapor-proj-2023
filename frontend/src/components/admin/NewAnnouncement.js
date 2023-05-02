import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { newAnnouncement, clearErrors } from '../../actions/announcementActions'
import { NEW_ANNOUNCEMENT_RESET } from '../../constants/announcementConstants'
import { useForm } from "react-hook-form";

const NewAnnouncement = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [name, setName] = useState('');

    const [description, setDescription] = useState('');

    const [publisher, setPublisher] = useState('');

    const dispatch = useDispatch();

    let navigate = useNavigate()
    const goBack = () => {
        navigate(-1);
    }


    const { loading, error, success } = useSelector(state => state.newAnnouncement);

    const message = (message = '') => toast.success(message, {

        position: toast.POSITION.BOTTOM_CENTER

    });

    useEffect(() => {



        if (error) {

            dispatch(clearErrors())

        }

        if (success) {

            navigate('/admin/announcement');

            message('Announcement created successfully');

            dispatch({ type: NEW_ANNOUNCEMENT_RESET })

        }



    }, [dispatch, error, success, navigate])

    const notify = (error = '') => toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    const submitHandler = (data, event) => {

        event.preventDefault();

        const formData = new FormData();

        formData.set('name', name);

        formData.set('description', description);

        formData.set('publisher', publisher);

        try {
            dispatch(newAnnouncement(formData))
        } catch (e) {
            notify(e)
        }


    }


    console.log("Form caught errors: ", errors);

    return (

        <Fragment>

            <MetaData title={'New Announcement'} />

            <div className="row">

                <div className="col-12 col-md-2">

                    <Sidebar />

                </div>

                <div className="col-12 col-md-10">

                    <Fragment>
                        <IconButton sx={{ ml: 3, my: 1 }} onClick={() => {
                            goBack()
                        }}><ArrowBackIcon sx={{ fontSize: 35, color: '#fff' }}></ArrowBackIcon></IconButton>
                        <div className="wrapper my-5 white">

                            <form className="shadow-lg" onSubmit={handleSubmit(submitHandler)} encType='multipart/form-data'>

                                <h1 className="mb-4">New Announcement</h1>

                                <div className="form-group">

                                    <label htmlFor="name_field">Title</label>

                                    <input

                                        type="text"

                                        {...register("name", { required: "Title is Required!" })}

                                        id="name_field"

                                        className="form-control"

                                        value={name}

                                        onChange={(e) => setName(e.target.value)}
                                    // required

                                    />
                                    {errors.name && <p className='red'><i>{errors.name.message}</i></p>}
                                </div>

                                <div className="form-group">

                                    <label htmlFor="description_field">Announcement</label>

                                    <textarea className="form-control" id="description_field" rows="8"
                                        {...register("description", { required: "Announcement Description is required!" })}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    // required
                                    ></textarea>
                                    {errors.description && <p className='red'><i>{errors.description.message}</i></p>}
                                </div>

                                <div className="form-group">

                                    <label htmlFor="publisher_field">Publisher</label>

                                    <input

                                        type="text"

                                        {...register("publisher", { required: "Publisher Name is Required!" })}

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

                                    CREATE

                                </button>



                            </form>

                        </div>

                    </Fragment>

                </div>

            </div>



        </Fragment>

    )

}

export default NewAnnouncement