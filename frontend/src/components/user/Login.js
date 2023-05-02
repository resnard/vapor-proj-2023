import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors, glogin } from '../../actions/userActions'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useForm } from "react-hook-form";
import GoogleIcon from '@mui/icons-material/Google';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Login = () => {

    const { register, handleSubmit, watch, formState:{errors}} = useForm();
    const onSubmit = data => console.log(data);

    const googlelogin = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
      });
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()
    let location = useLocation();
    const { isAuthenticated, error, loading } = useSelector(state => state.auth);
    // const redirect = location.search ? location.search.split('=')[1] : ''
    const redirect = new URLSearchParams(location.search).get('redirect')
    const notify = (error = '') => toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    const notifySuccess = (message) => toast.success(message, {
        icon: () =>  <AccountCircleIcon color='success'/> ,
        position: toast.POSITION.TOP_LEFT
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        // setProfile(res.data);
                        // console.log(res.data);
                        dispatch(glogin(res.data))
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );
    useEffect(() => {
        if (isAuthenticated && redirect === 'shipping') {
            navigate(`/${redirect}`, { replace: true })
        }
        else if (isAuthenticated)
       
            navigate('/')
         
        if (error) {
            // alert.error(error);
            console.log(error)
            notify(error)
            dispatch(clearErrors());
        }

    }, [dispatch, isAuthenticated, error, navigate, redirect])

    const submitHandler = (data, event) => {
        event.preventDefault();
      
        dispatch(login(email, password))
        notifySuccess('Logged In Successfully.')
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Login'} />

                    <div className="row wrapper white">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={handleSubmit(submitHandler)}>
                                <h1 className="mb-3">Login</h1>
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

                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        {...register("password", { required: "Password is required!" })}
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                //    required
                                    />
                                     {errors.password && <p className='red'><i>{errors.password.message}</i></p>}
                                </div>
                                          <div className='float-right mb-4'>

                                          <Link to="/password/forgot" >Forgot Password?</Link>
                                <Link to="/register" className='mx-4'>New User?</Link><br></br>

                                          </div>
                                

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    LOGIN
                                </button>
                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    onClick={()=>googlelogin()}
                                >
                                    <GoogleIcon sx={{color: '#FFF', mr: 2}}/>LOG IN WITH GOOGLE
                                </button>

                                {/* <div className="d-flex justify-content-center mt-3 "> <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /></div> */}
                               
                              
                            </form>
                          
                        </div>
                    </div>


                </Fragment>
            )}
        </Fragment>
    )
}

export default Login