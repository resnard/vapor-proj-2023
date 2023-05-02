import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProduct, getProductDetails, clearErrors } from '../../actions/productActions'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'
import { useForm } from "react-hook-form";

const UpdateProduct = () => {
    const { register, handleSubmit, watch, formState:{errors}} = useForm( {mode: 'onChange'});
    const onSubmit = data => console.log(data);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [platform, setPlatform] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
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
    const { error, product } = useSelector(state => state.productDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.product);
    let { id } = useParams();
    let navigate = useNavigate();
    const errMsg = (message = '') => toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    const successMsg = (message = '') => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    useEffect(() => {
        if (product && product._id !== id) {
            dispatch(getProductDetails(id));
        } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setPlatform(product.platform);
            setSeller(product.seller);
            setStock(product.stock)
            setOldImages(product.images)
        }
        if (error) {
            errMsg(error)
            dispatch(clearErrors())
        }
        if (updateError) {
            errMsg(updateError);
            dispatch(clearErrors())
        }
        if (isUpdated) {
            navigate('/admin/products');
            successMsg('Product updated successfully');
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }
    }, [dispatch, error, isUpdated, navigate, updateError, product, id])

    const submitHandler = (data, e) => {
        e.preventDefault();
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
        dispatch(updateProduct(product._id, formData))
    }
    const onChange = e => {
        const files = Array.from(e.target.files)
        setImagesPreview([]);
        setImages([])
        setOldImages([])
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
    return (
        <Fragment>
            <MetaData title={'Update Product'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5 white">
                            <form className="shadow-lg" onSubmit={handleSubmit(submitHandler)} encType='multipart/form-data'>
                                <h1 className="mb-4">Update Game</h1>
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
                                    {errors.name && <p className='red'><i>{errors.name.message}</i></p>}

                                </div>



                                <div className="form-group">

                                    <label htmlFor="price_field">Price</label>

                                    <input

                                        type="text"

                                        id="price_field"
                                        {...register("price", { required: true, message: "Game should have a price!", min: {
                                            value: 1,
                                            message: "Price cannot be zero."} })}
                                        className="form-control"

                                        value={price}

                                        onChange={(e) => setPrice(e.target.value)}

                                        // required

                                    />
                                    {errors.price && <p className='red'><i>{errors.price.message}</i></p>}

                                </div>



                                <div className="form-group">

                                    <label htmlFor="description_field">Description</label>

                                    <textarea className="form-control" id="description_field" 
                                     {...register("description", { required: "Game Description is required!" })}
                                     rows="8" value={description} onChange={(e) => setDescription(e.target.value)}  
                                    //  required
                                     ></textarea>
{errors.description && <p className='red'><i>{errors.description.message}</i></p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="platform_field">Platform:</label>
                                    <select className="form-control" id="platform_field"
                                     {...register("platform", { required: "Game Platform in required!" })}  value={platform} onChange={(e) => setPlatform(e.target.value)}  
                                    //  required
                                     >
                                         <option value="" selected disabled>Please select an option...</option>
                                        {platforms.map(platform => (
                                            <option key={platform} value={platform} >{platform}</option>
                                        ))}
                                        
                                    </select>
                                    {errors.platform && <p className='red'><i>{errors.platform.message}</i></p>}
                                </div>

                                <div className="form-group">

                                    <label htmlFor="category_field">Genre</label>

                                    <select className="form-control" id="category_field"
                                      {...register("genre", { required: "Genre is required!" })}  value={category} onChange={(e) => setCategory(e.target.value)}  
                                    //   required
                                      >
<option value="" selected disabled>Please select an option...</option>
                                        {categories.map(category => (

                                            <option key={category} value={category} >{category}</option>

                                        ))}



                                    </select>
                                    {errors.genre && <p className='red'><i>{errors.genre.message}</i></p>}
                                </div>

                                <div className="form-group">

                                    <label htmlFor="stock_field">Stock</label>

                                    <input

                                        type="number"
                                        {...register("stocks", { required: {value: true, message: "Game Stock is required!"}, min: {value: 1, message: "Game must have atleast one stock."} })}
                                        id="stock_field"

                                        className="form-control"

                                        value={stock}

                                        onChange={(e) => setStock(e.target.value)}
                                        // required           
                                    />
{errors.stocks && <p className='red'><i>{errors.stocks.message}</i></p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="seller_field">Developer Name</label>
                                    <input

                                        type="text"
                                        {...register("developer", { required: "Game Developer cannot be empty!" })}
                                        id="seller_field"

                                        className="form-control"

                                        value={seller}

                                        onChange={(e) => setSeller(e.target.value)}
                                        // required        
                                    />
{errors.developer && <p className='red'><i>{errors.developer.message}</i></p>}
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
                                        {errors.images && <p className='red'><i>{errors.images.message}</i></p>}
                                    </div>

                                    {oldImages && oldImages.map(img => (
                                        <img key={img} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                                    ))}



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

                                    UPDATE

                                </button>

                            </form>

                        </div>

                    </Fragment>

                </div>

            </div>

        </Fragment>

    )

}



export default UpdateProduct