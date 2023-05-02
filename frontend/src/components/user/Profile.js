import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { red, cyan } from '@mui/material/colors';

const Profile = () => {
    const { user, loading } = useSelector(state => state.auth)
//     <div class="pCard_card">
//    <div class="pCard_up">
//       <div class="pCard_text">
//          <h2>Van Goggles</h2>
//          <p>Some guy & some dude</p>
//       </div>
//       <div class="pCard_add"><i class="fa fa-plus"></i></div>
//    </div>
//    <div class="pCard_down">
//       <div>
//          <p>Projects</p>
//          <p>126</p>
//       </div>
//       <div>
//          <p>Views</p>
//          <p>21,579</p>
//       </div>
//       <div>
//          <p>Likes</p>
//          <p>1,976</p>
//       </div>
//    </div>
//    <div class="pCard_back">
//       <p>See My Latest Work Here</p>
//       <a href="#"><i class="fa fa-facebook fa-2x fa-fw"></i></a>
//       <a href="#"><i class="fa fa-linkedin fa-2x fa-fw"></i></a>
//       <a href="#"><i class="fa fa-behance fa-2x fa-fw"></i></a> <br>
//       <a href="#"><i class="fa fa-codepen fa-2x fa-fw"></i></a>
//       <a href="#"><i class="fa fa-dribbble fa-2x fa-fw"></i></a>
//       <a href="#"><i class="fa fa-instagram fa-2x fa-fw"></i></a>
//       <p>Follow Me!</p>
//    </div>
// </div>
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Your Profile'} />



                    <div class="ribbon-wrapper">
                    <h3 class="ribbon">
                    <strong class="ribbon-inner">My Profile</strong>
                    </h3>
                    </div>

                    {/* <div className="row justify-content-around mt-5 user-info">

                        <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
                            </figure>
                            <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Edit Profile
                            </Link>
                        </div>
                        <div className="col-12 col-md-5">
                            <h4>Full Name</h4>
                            <p>{user.name}</p>
                            <h4>Email Address</h4>
                            <p>{user.email}</p>
                            <h4>Joined On</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>
                            {user.role !== 'admin' && (
                                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                                    My Orders
                                </Link>
                            )}
                            <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                                Change Password
                            </Link>
                        </div>
                    </div> */}

                    <div class="pCard_card">
   <div class="pCard_up" style={{ backgroundImage: `url(${user.avatar.url})` }}>
      <div class="pCard_text">
         <h2>{user.name}</h2>
         <p>{user.role}</p>
      </div>
      <div class="pCard_add"> <Link to="/me/update"><IconButton aria-label="Edit Profile" sx={{mt: 0.5, width: 80, height: 80}}>
  <EditIcon sx={{ color: cyan[50], fontSize: 35 }}/>
</IconButton></Link></div>
   </div>
   <div class="pCard_down">
      <div>
         <p>Email Address</p>
         <p>{user.email}</p>
      </div>
      <div>
         <p>Joined on:</p>
         <p>{String(user.createdAt).substring(0, 10)}</p>
      </div>
      {/* <div>
         <p>Likes</p>
         <p>1,976</p>
      </div> */}
      
   </div>
  
   <div class="pCard_back">
      <p>See My Latest Work Here</p>
      <a href="#"><i class="fa fa-facebook fa-2x fa-fw"></i></a>
      <a href="#"><i class="fa fa-linkedin fa-2x fa-fw"></i></a>
      <a href="#"><i class="fa fa-behance fa-2x fa-fw"></i></a> <br></br>
      <a href="#"><i class="fa fa-codepen fa-2x fa-fw"></i></a>
      <a href="#"><i class="fa fa-dribbble fa-2x fa-fw"></i></a>
      <a href="#"><i class="fa fa-instagram fa-2x fa-fw"></i></a>
      <p>Follow Me!</p>
   </div>
</div>

                </Fragment>

            )}

        </Fragment>

    )

}
export default Profile

