import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './layout/MetaData'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Slider, { Range, createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

import { useDispatch, useSelector } from 'react-redux'

import { getProducts } from '../actions/productActions'
import Product from './product/Product'
import Loader from './layout/Loader'

import {Fab, Tooltip, Popover} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';


const Home = () => {
    const dispatch = useDispatch();
    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products); 
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1,1000])
    const [category, setCategory] = useState('');
    let { keyword } = useParams()
//pop over
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
//pop over end

    const notify = (error = '') => toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = createSliderWithTooltip(Slider.Range);
    const categories = [
        'All',
        'RPG',
                'Rogue Like',
                'Single Player',
                'MOBA',
                'Strategy',
                'Puzzle',
                "First Person Shooter",
                'Indie',
                'Arcarde',
                'Platformer',
                'Horror',
                'Idle'

    ]

    

    useEffect(() => {
        if(error){
			// return alert.error(error)
            notify(error)
		}
        if(category=='All'){
            setCategory('');
        }
        dispatch(getProducts(keyword, currentPage, price, category))
    }, [dispatch, error, currentPage, keyword, price, category]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }
    let count = productsCount;
    
    if (keyword) {
        let count = filteredProductsCount
    }
    console.log(keyword, count, filteredProductsCount, resPerPage)
    console.log("Site products:", products, category, price)
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Buy Best Games Online'} />
                    <Tooltip title="Filter Games" placement="right" arrow>
                    <Fab aria-describedby={id} onClick={handleClick} sx={{color: '#2E3440',backgroundColor: '#2E3440',position: "relative", "&:hover": { backgroundColor: "transparent"}, zIndex: 2, mx: 1.5, mt: 1.5, mb: -5}}>
        <FilterAltIcon sx={{color: '#FFF'}}/>
      </Fab></Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{mt: 3}}
        anchorReference="anchorPosition"
  anchorPosition={{ top: 200, left: 0 }}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
      >
        <div className="shadow-lg gen-container white"><br></br>
                                        <div className="px-5">
                                            <Range
                                                marks={{
                                                    1: `$1`,
                                                    1000: `$1000`
                                                }}
                                                min={1}
                                                max={1000}
                                                defaultValue={[1, 1000]}
                                                tipFormatter={value => `$${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />
                                            <hr className="" />
                                            <div className="">
                                                <h4 className="mb-3">
                                                   Genres:
                                                </h4>
                                                <ul className="pl-0">
                                                    {categories.map(category => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={category}
                                                            
                                                            onClick={
                                                                () => setCategory(category)           }
                                                        >
                                                            {category}
                                                            
                                                        </li>
                                                    ))}
                                                </ul>
                                                <br></br>
                                            </div>
                                        </div>
                                    </div>
      </Popover>
                    <div class="ribbon-wrapper">
                    <h3 class="ribbon">
                    <strong class="ribbon-inner">Our Latest Games</strong>
                    </h3>
                    </div>
                    <section id="products" className="container mt-5">
                        {/* <div className="row">
                            {products && products.map(product => (
                                <Product key={product._id} product={product} />
                            ))}
                        </div> */}
                        <div className="row">

                            {keyword ? (
                                <Fragment>
                                   

                                 
                                            {products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))}
                                       
                                </Fragment>
                            ) : (
                                products.map(product => (
                                    <Product key={product._id} product={product} col={3} />
                                ))
                            )}

                        </div>

                    </section>
                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}
                </Fragment>
            )
            }
        </Fragment>

    )

}

export default Home