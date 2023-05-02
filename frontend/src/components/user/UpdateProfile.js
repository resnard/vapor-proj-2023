import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { updateProfile, loadUser, clearErrors } from '../../actions/userActions'
import { Link } from 'react-router-dom'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm } from "react-hook-form";

const UpdateProfile = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    const { user } = useSelector(state => state.auth);
    const { error, isUpdated, loading } = useSelector(state => state.user)

    // console.log(error)
    useEffect(() => {
        console.log(isUpdated)
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url)
        }
        if (error) {
            // alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            // alert.success('User updated successfully')
            dispatch(loadUser());
            navigate('/me', { replace: true })
            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
    }, [dispatch, error, isUpdated, navigate, user])
    const submitHandler = (data, e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);
        dispatch(updateProfile(formData))
    }
    const onChange = e => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    return (
        <Fragment>
            <MetaData title={'Update Profile'} />
            <IconButton sx={{ ml: 3, my: 1 }} onClick={() => {
                goBack()
            }}><ArrowBackIcon sx={{ fontSize: 35, color: '#fff' }}></ArrowBackIcon></IconButton>
            <div className="row wrapper white mt-n5">

                <div className="col-10 col-lg-5">

                    <form className="shadow-lg" onSubmit={handleSubmit(submitHandler)} encType='multipart/form-data'>

                        <h1 className="mt-2 mb-5">Update Profile</h1>



                        <div className="form-group">

                            <label htmlFor="email_field">Name</label>

                            <input

                                type="name"

                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Name Required!"
                                    }
                                })}

                                id="name_field"

                                className="form-control"

                                value={name}

                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            {errors.name && <p className='red'><i>{errors.name.message}</i></p>}
                        </div>



                        <div className="form-group">

                            <label htmlFor="email_field">Email</label>

                            <input

                                type="email"

                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email field cannot be empty."
                                    },
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid Email format!"
                                    }
                                })}


                                id="email_field"

                                className="form-control"

                                value={email}

                                onChange={(e) => setEmail(e.target.value)}
                                // required
                            />
                            {errors.email && <p className='red'><i>{errors.email.message}</i></p>}
                        </div>



                        <div className='form-group'>

                            <label htmlFor='avatar_upload'>Avatar</label>

                            <div className='d-flex align-items-center'>

                                <div>

                                    <figure className='avatar mr-3 item-rtl'>

                                        <img

                                            src={avatarPreview}

                                            className='rounded-circle'

                                            alt='Avatar Preview'

                                        />

                                    </figure>

                                </div>

                                <div className='custom-file'>

                                    <input

                                        type='file'

                                        {...register("pic", {
                                            required: {
                                                value: true,
                                                message: "Image Required!"
                                            }
                                        })}

                                        className='custom-file-input'

                                        id='customFile'

                                        accept='image/*'

                                        onChange={onChange}
                                        // required
                                    />

                                    <label className='custom-file-label' htmlFor='customFile'>

                                        Choose Avatar

                                    </label>
                                    {errors.pic && <p className='red'><i>{errors.pic.message}</i></p>}
                                </div>

                            </div>

                        </div>



                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false} >Update</button>
                        <Link to="/password/update" className="float-right">
                                Change Password?
                            </Link>
                    </form>
                   
                </div>

            </div>

        </Fragment>

    )

}



export default UpdateProfile