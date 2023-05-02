import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import MetaData from '../layout/MetaData'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/userActions'
import { IconButton } from '@mui/material';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'


const UpdatePassword = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { error, isUpdated, loading } = useSelector(state => state.user)
    const success = (message = '') => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    const notify = (error = '') => toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    const goBack = () => {
        navigate(-1);
    }
    useEffect(() => {
        if (error) {
            console.log(error)
            notify(error)
            dispatch(clearErrors());
        }
        if (isUpdated) {
            success('Password updated successfully')
            navigate('/me')
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [dispatch, error, navigate, isUpdated])
    const submitHandler = (data, e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);
        try {
            dispatch(updatePassword(formData))
            } catch (e) {
           notify(e)
            }
       
    }
    return (

        <Fragment>

            <MetaData title={'Change Password'} />
            <IconButton sx={{ ml: 3, my: 1 }} onClick={() => {
                goBack()
            }}><ArrowBackIcon sx={{ fontSize: 35, color: '#fff' }}></ArrowBackIcon></IconButton>


            <div className="row wrapper white mt-n5">

                <div className="col-10 col-lg-5">

                    <form className="shadow-lg" onSubmit={handleSubmit(submitHandler)}>

                        <h1 className="mt-2 mb-5">Update Password</h1>

                        <div className="form-group">

                            <label htmlFor="old_password_field">Old Password</label>

                            <input

                                type="password"

                                {...register("pass", {
                                    required: {
                                        value: true,
                                        message: "Required!"
                                    }
                                })}

                                id="old_password_field"

                                className="form-control"

                                value={oldPassword}

                                onChange={(e) => setOldPassword(e.target.value)}

                            />
                            {errors.pass && <p className='red'><i>{errors.pass.message}</i></p>}
                        </div>



                        <div className="form-group">

                            <label htmlFor="new_password_field">New Password</label>

                            <input

                                type="password"

                                {...register("newpass", {
                                    required: {
                                        value: true,
                                        message: "Required!"
                                    }
                                })}

                                id="new_password_field"

                                className="form-control"

                                value={password}

                                onChange={(e) => setPassword(e.target.value)}

                            />
                            {errors.newpass && <p className='red'><i>{errors.newpass.message}</i></p>}
                        </div>



                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false} >Update Password</button>

                    </form>

                </div>

            </div>



        </Fragment>

    )

}



export default UpdatePassword