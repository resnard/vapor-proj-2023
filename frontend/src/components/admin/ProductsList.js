import React, { Fragment, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'

import { getAdminProducts, 
    deleteProduct, 
    clearErrors } from '../../actions/productActions'

import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
const ProductsList = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate()
    const { loading, error, products } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector(state => state.product)
    useEffect(() => {
        dispatch(getAdminProducts());
        if (error) {
            dispatch(clearErrors())
        }
        if (deleteError) {
            dispatch(clearErrors())
        }
        if (isDeleted) {
            
            navigate('/admin/products');
            dispatch({ type: DELETE_PRODUCT_RESET })
        }



    }, [dispatch,  error, navigate, isDeleted, deleteError])

    
    // [dispatch, alert, error, deleteError, isDeleted, navigate])
    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc',
                    
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Platform',
                    field: 'platform',
                    sort: 'asc'
                },
                {
                    label: 'Genre',
                    field: 'category',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
               {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                platform: product.platform,
                category: product.category,
                price: `$${product.price}`,
                stock: product.stock,
                actions: <Fragment>
                    <Link to={`/admin/product/${product._id}`} className="btn btn-info py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })
        return data;
    }
    const deleteProductHandler = (id) => {

        dispatch(deleteProduct(id))

    } 
    console.log(setProducts());
    return (
        <Fragment>
          <MetaData title={'All Games'} />
            <div className="row white">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                   <div class="ribbon-wrapper"> <h3 class="ribbon">
<strong class="ribbon-inner">All Games</strong>
</h3>
</div>
                        {/* <h1 className="my-5">All Games</h1> */}
                        {loading ? <Loader /> : (

                            <MDBDataTable
                           
                                data={setProducts()}
                                className="px-3 white"
                                maxHeight='520px' maxWidth='520px'
                    bordered

                    striped

                    hover

                            />
                           
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}
export default ProductsList