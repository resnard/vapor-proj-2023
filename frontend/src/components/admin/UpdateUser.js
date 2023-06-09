import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, getUserDetails, clearErrors } from '../../actions/userActions'
import { UPDATE_USER_RESET } from '../../constants/userConstants'
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm } from "react-hook-form";



const UpdateUser = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    const { error, isUpdated } = useSelector(state => state.user);
    const { user } = useSelector(state => state.userDetails)
    const { id } = useParams();

    const errMsg = (message = '') => toast.error(message, {

        position: toast.POSITION.BOTTOM_CENTER

    });

    const successMsg = (message = '') => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });



    useEffect(() => {

        // console.log(user && user._id !== userId);

        if (user && user._id !== id) {

            dispatch(getUserDetails(id))

        } else {

            setName(user.name);

            setEmail(user.email);

            setRole(user.role)

        }



        if (error) {

            errMsg(error);

            dispatch(clearErrors());

        }



        if (isUpdated) {

            successMsg('User updated successfully')

            navigate('/admin/users')

            dispatch({

                type: UPDATE_USER_RESET

            })

        }

    }, [dispatch, error, navigate, isUpdated, id, user])



    const submitHandler = (data, e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.set('name', name);

        formData.set('email', email);

        formData.set('role', role);

        dispatch(updateUser(user._id, formData))

    }

    return (

        <Fragment>

            <MetaData title={`Update User`} />


            <div className="row">

                <div className="col-12 col-md-2">

                    <Sidebar />

                </div>

                <div className="col-12 col-md-10 white">
                    <IconButton sx={{ ml: 3, my: 1 }} onClick={() => {
                        goBack()
                    }}><ArrowBackIcon sx={{ fontSize: 35, color: '#fff' }}></ArrowBackIcon></IconButton>
                    <div className="row wrapper">

                        <div className="col-10 col-lg-5">

                            <form className="shadow-lg" onSubmit={handleSubmit(submitHandler)}>
                                <h1 className="mt-2 mb-5">Update User</h1>

                                <div className="form-group">

                                    <label htmlFor="name_field">Name</label>

                                    <input

                                        type="name"

                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: "Name field cannot be empty."
                                            }
                                        })}

                                        id="name_field"

                                        className="form-control"

                                        value={name}

                                        onChange={(e) => setName(e.target.value)}
                                    // required
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
                                        required
                                    />
                                    {errors.email && <p className='red'><i>{errors.email.message}</i></p>}
                                </div>

                                <div className="form-group">

                                    <label htmlFor="role_field">Role</label>

                                    <select


                                        {...register("role", {
                                            required: {
                                                value: true,
                                                message: "Role field cannot be empty."
                                            }
                                        })}

                                        id="role_field"

                                        className="form-control"

                                        value={role}

                                        onChange={(e) => setRole(e.target.value)}
                                        required
                                    >

                                        <option value="user">user</option>

                                        <option value="applicant">applicant</option>

                                        <option value="employee">employee</option>

                                        <option value="admin">admin</option>

                                    </select>
                                    {errors.role && <p className='red'><i>{errors.role.message}</i></p>}
                                </div>

                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </Fragment>

    )

}



export default UpdateUser

