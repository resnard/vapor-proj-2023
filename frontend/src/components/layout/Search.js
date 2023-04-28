import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { TextField, Autocomplete, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux'



const Search = () => {
  // const {products} = useSelector(state => state.products);
  const [productsAll, setProdA] = useState([])
  // const productData = productsAll.products
 
  const fetchProductsData = () => {
    // fetch("https://jsonplaceholder.typicode.com/users")
    fetch(`${process.env.REACT_APP_API}/api/v1/products`)
      .then(response => {
        return response.json()
      })
      .then(productsA => {
        setProdA(productsA.products)
      })
  }

  useEffect(() => {
    fetchProductsData()
  }, [])

    const [keyword, setKeyword] = useState('');
    let navigate = useNavigate();

    const searchHandler = (e) => {
        e.preventDefault()
        navigate('/')
        if (keyword.trim()) {
         
           navigate(`/search/${keyword}`)
        } 
    }

    return (
        <form onSubmit={searchHandler} >
            <div className="input-group mb-2">
            <Autocomplete
            // filterOptions={products.map((product) => product.name)}
        freeSolo
        id="free-solo-2-demo"
        // disableClearable
        options={productsAll.map((options) => options.name)}
        renderInput={(params) => (
          <TextField
          defaultValue="Small"
            {...params}
            onChange={(e) => setKeyword(e.target.value)}
            // label="Search input"
            placeholder="Enter Game Title ..."
            InputProps={{
              ...params.InputProps,
              type: 'search',
              sx: {width: 500, paddingBottom: 50},
              endAdornment: (
                <InputAdornment position="end">
                     <IconButton type="submit">  <SearchIcon /></IconButton>
                
                </InputAdornment>
              ),
            }}
            size="small"
          />
        )}
      />
{/*          
               <input
        type="text"
        id="search_field"
        className="form-control"
        placeholder="Enter Game Title ..."
        onChange={(e) => setKeyword(e.target.value)}
    /> */}
                {/* <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div> */}
            </div>
        </form>
    )

 
}

export default Search