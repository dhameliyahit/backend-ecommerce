import express from 'express'
import { isAdmin, requireSignIn } from './../middleware/authmiddleware.js';
import { brainTreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, reletedProductController, searchProductController, updateProductController } from '../controller/productController.js';
import formidable from 'express-formidable'
const router = express.Router()

//routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)


//get all routes
router.get('/get-product', getProductController)

//get single product
router.get('/get-product/:slug', getSingleProductController)

//get photo
router.get('/product-photo/:pid', productPhotoController)

//delete product


router.delete('/delete-product/:pid', deleteProductController)

// filter product
router.post("/product-filters", productFiltersController);

//count
router.get('/product-count', productCountController)

//product-per-page
router.get('/product-list/:page', productListController)

//search router
router.get('/search/:keyword',searchProductController)

//smiler product
router.get('/related-product/:pid/:cid',reletedProductController)

//categor vise produt
router.get('/product-category/:slug',productCategoryController)

//payments route
//token
router.get('/braintree/token',braintreeTokenController)

//payment
router.post('/braintree/payment',requireSignIn,brainTreePaymentController)

export default router