import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { newProduct, clearErrors } from '../../actions/productActions'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import { useForm } from "react-hook-form";





const NewProduct = () => {
    const { register, handleSubmit, watch, formState:{errors}} = useForm();
    const onSubmit = data => console.log(data);
    const [name, setName] = useState('');

    const [price, setPrice] = useState(0);

    const [description, setDescription] = useState('');

    const [platform, setPlatform] = useState('');

    const [category, setCategory] = useState('');

    const [stock, setStock] = useState(0);

    const [seller, setSeller] = useState('');

    const [images, setImages] = useState([]);

    const [imagesPreview, setImagesPreview] = useState([])

    const categories = [

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

    const platforms = [

        "PC",
        "X-BOX",
        "PlayStation",
        "PC & Console"

    ]



    const dispatch = useDispatch();

    let navigate = useNavigate()
    const goBack = () => {
		navigate(-1);
	}


    const { loading, error, success } = useSelector(state => state.newProduct);

    const message = (message = '') => toast.success(message, {

        position: toast.POSITION.BOTTOM_CENTER

    });

    useEffect(() => {



        if (error) {

            dispatch(clearErrors())

        }

        if (success) {

            navigate('/admin/products');

            message('Product created successfully');

            dispatch({ type: NEW_PRODUCT_RESET })

        }



    }, [dispatch, error, success,navigate])



    const submitHandler = (values, event) => {

        event.preventDefault();



        const formData = new FormData();

        formData.set('name', name);

        formData.set('price', price);

        formData.set('description', description);

        formData.set('platform', platform);

        formData.set('category', category);

        formData.set('stock', stock);

        formData.set('seller', seller);

        images.forEach(image => {

            formData.append('images', image)

        })

        dispatch(newProduct(formData))

    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);

        setImages([])

        files.forEach(file => {

            const reader = new FileReader();

            reader.onload = () => {

                if (reader.readyState === 2) {

                    setImagesPreview(oldArray => [...oldArray, reader.result])

                    setImages(oldArray => [...oldArray, reader.result])

                }

            }

            reader.readAsDataURL(file)

        })

    }

    console.log("Form caught errors: ", errors);

    return (

        <Fragment>

            <MetaData title={'New Game'} />

            <div className="row">

                <div className="col-12 col-md-2">

                    <Sidebar />

                </div>

                <div className="col-12 col-md-10">

                    <Fragment>
                    <IconButton sx={{ml: 3, my: 1}}  onClick={() => {
    goBack()
  }}><ArrowBackIcon sx={{fontSize: 35, color: '#fff'}}></ArrowBackIcon></IconButton>
                        <div className="wrapper my-5 white">

                            <form className="shadow-lg" onSubmit={handleSubmit(submitHandler)} encType='multipart/form-data'>

                                <h1 className="mb-4">New Game</h1>



                                <div className="form-group">

                                    <label htmlFor="name_field">Title</label>

                                    <input

                                        type="text"

                                        {...register("name", { required: "Game Title is required!" })}

                                        id="name_field"

                                        className="form-control"

                                        value={name}

                                        onChange={(e) => setName(e.target.value)}
                                        // required

                                    /> 

                                </div>

                                <div className="form-group">

                                    <label htmlFor="price_field">Price</label>

                                    <input

                                        type="text"

                                        {...register("Game Price", { required: "Game should have a price!" })}

                                        id="price_field"

                                        className="form-control"

                                        value={price}

                                        onChange={(e) => setPrice(e.target.value)}
                                        // required

                                    />

                                </div>

                                <div className="form-group">

                                    <label htmlFor="description_field">Description</label>

                                    <textarea className="form-control" id="description_field" rows="8" 
                                     {...register("Game Description", { required: "Game Description is required!" })}
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)}  
                                    // required
                                    ></textarea>

                                </div>

                                <div className="form-group">
                                    <label htmlFor="platform_field">Platform:</label>
                                    <select className="form-control" id="platform_field" 
                                     {...register("Game Platform", { required: "Game Platform in required!" })} value={platform} onChange={(e) => setPlatform(e.target.value)}  
                                    //  required
                                     >
                                        {platforms.map(platform => (
                                            <option key={platform} value={platform} >{platform}</option>
                                        ))}
                                    </select>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="category_field">Genre:</label>
                                    <select className="form-control" id="category_field" 
                                     {...register("Game Genre", { required: "Genre is required!" })} value={category} onChange={(e) => setCategory(e.target.value)}  
                                    //  required
                                     >
                                        {categories.map(category => (
                                            <option key={category} value={category} >{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">

                                    <label htmlFor="stock_field">Stock</label>

                                    <input

                                        type="number"
                                        {...register("Game Stocks", { required: "Game Stock is required!" })}    
                                        id="stock_field"

                                        className="form-control"

                                        value={stock}

                                        onChange={(e) => setStock(e.target.value)}
                                        // required

                                    />

                                </div>



                                <div className="form-group">

                                    <label htmlFor="seller_field">Developer Name:</label>

                                    <input

                                        type="text"
                                        
                                        id="seller_field"
                                        {...register("Game Developer", { required: "Game Developer cannot be emppty!" })}
                                        className="form-control"

                                        value={seller}

                                        onChange={(e) => setSeller(e.target.value)}
                                        // required

                                    />

                                </div>



                                <div className='form-group'>

                                    <label>Images</label>



                                    <div className='custom-file'>

                                        <input

                                            type='file'
                                            {...register("images", { required: "Game Image cannot be Null!" })}
                                         

                                            className='custom-file-input'

                                            id='customFile'

                                            onChange={onChange}

                                            multiple

                                            // required

                                        />

                                        <label className='custom-file-label' htmlFor='customFile'>

                                            Choose Images

                                     </label>

                                    </div>



                                    {imagesPreview.map(img => (

                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />

                                    ))}



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

export default NewProduct

