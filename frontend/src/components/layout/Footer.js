import React, { Fragment } from 'react'

const Footer = () => {
    return (
        <Fragment>
            <footer class="site-footer mt-n0">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>About</h6>
            <p class="text-justify">Vapor.com <i>GAME SHOP HAVEN </i> is an e-commerce site dedicated to selling the top, trending, and latest games. It allows users to easily register and log in either through the site or google account, it makes it easier to browse for games using the built in game filter. This is a project for our programming subject.</p>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Platforms</h6>
            <ul class="footer-links">
              <li><a href="#">React JS</a></li>
              <li><a href="#">Javascript</a></li>
              <li><a href="#">HTML</a></li>
              <li><a href="#">CSS</a></li>
              <li><a href="#">Mongo DB</a></li>
              <li><a href="#">Cloudinary</a></li>
            </ul>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul class="footer-links">
              <li><a href="http://scanfcode.com/about/">About Us</a></li>
              <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
              <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a></li>
              <li><a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
              <li><a href="http://scanfcode.com/sitemap/">Sitemap</a></li>
            </ul>
          </div>
        </div>
        <hr/>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2023 All Rights Reserved by 
         <a href="#"> Vapor - Game Shop</a>.
            </p>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
              <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
              <li><a class="dribbble" href="#"><i class="fa fa-dribbble"></i></a></li>
              <li><a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a></li>   
            </ul>
          </div>
        </div>
      </div>
</footer>
        </Fragment>
    )
}

export default Footer