const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const mongoose = require('mongoose');

// Create a new order   =>  /api/v1/order/new
exports.newOrder = async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;
    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order

    })

}

exports.getSingleOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404))

    }



    res.status(200).json({
        success: true,
        order
    })

}

exports.myOrders = async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })
    // console.log(req.user)
    res.status(200).json({
        success: true,
        orders
    })

}

exports.allOrders = async (req, res, next) => {
    const orders = await Order.find()
    // console.log(orders)
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })

}

exports.updateOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }
    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })
    order.orderStatus = req.body.status
    order.deliveredAt = Date.now()
    await order.save()
    res.status(200).json({
        success: true,
    })

}

exports.deleteOrder = async (req, res, next) => {

    const order = await Order.findById(req.params.id)



    if (!order) {

        return next(new ErrorHandler('No Order found with this ID', 404))

    }



    await order.remove()



    res.status(200).json({

        success: true

    })

}

exports.totalOrders = async (req, res, next) => {
    const totalOrders = await Order.aggregate([
        {
            $group: {
                _id: null,
                count: { $sum: 1 }
            }
        }
    ])
    if (!totalOrders) {
        return next(new ErrorHandler('error total orders', 404))

    }
    res.status(200).json({
        success: true,
        totalOrders
    })

}

exports.totalSales = async (req, res, next) => {
    const totalSales = await Order.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: "$totalPrice" }
            }
        }
    ])
    if (!totalSales) {
        return next(new ErrorHandler('error total saless', 404))

    }
    res.status(200).json({
        success: true,
        totalSales
    })

}

exports.customerSales = async (req, res, next) => {
    const customerSales = await Order.aggregate([

        {
            $lookup: {
                from: 'users', // the document to be joined (model)
                localField: 'user', //the column from the currnet document 
                foreignField: '_id', //foreign key
                as: 'userDetails' //name of the array to be generated
            },
        },

        // {
        //     $group: {
        //        _id: "$user",
        //        total: { $sum: "$totalPrice" },


        //     }
        //   },

        { $unwind: "$userDetails" }, //deconstruct an array field ( converts array to object)

        {
            $group: {
                _id: "$user",
                total: { $sum: "$totalPrice" },
                doc: { "$first": "$$ROOT" },
                // $$ROOT references the root document (in this case Order is the root document)
                //$$ to access the value of the variable
            }
        },

        {
            $replaceRoot: {
                newRoot: { $mergeObjects: [{ total: '$total' }, '$doc'] },
            },//$replaceroot replaces document to avoid error you can use mergeObjects 
            //in this case we are merging $doc object to $total
        },
        // {
        //     $group: {
        //         _id: "$userDetails.name",
        //         total: { $sum: "$totalPrice" }
        //     }
        // },
        { $sort: { total: -1 } }, // -1 descending / 1 - ascending
        {
            $project: { //$project is similar to select
                _id: 0, //0 - false/ 1 - true
                "userDetails.name": 1,
                total: 1,

            }
        }

    ])
    if (!customerSales) {
        return next(new ErrorHandler('error customer sales', 404))

    }
    // return console.log(customerSales)
    res.status(200).json({
        success: true,
        customerSales
    })

}

exports.salesPerMonth = async (req, res, next) => {
    const salesPerMonth = await Order.aggregate([
        {
            $group: {
                // _id: {month: { $month: "$paidAt" } },
                _id: { year: { $year: "$paidAt" }, month: { $month: "$paidAt" } },
                total: { $sum: "$totalPrice" },
            },
        },

        {
            $addFields: {
                month: {
                    $let: {
                        vars: {
                            monthsInString: [, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', ' Sept', 'Oct', 'Nov', 'Dec']
                        },
                        in: {
                            $arrayElemAt: ['$$monthsInString', "$_id.month"]
                        }
                    }
                }
            }
        },
        { $sort: { "_id.month": 1 } },
        {
            $project: {
                _id: 1,
                month: 1,
               
                total: 1,

            }
        }

    ])
    if (!salesPerMonth) {
        return next(new ErrorHandler('error sales per month', 404))

    }
    // return console.log(customerSales)
    res.status(200).json({
        success: true,
        salesPerMonth
    })

}

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false })
}




