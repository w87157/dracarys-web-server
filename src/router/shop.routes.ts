import express from 'express';
import {
  getProducts,
  getDiamonds,
  getProductById,
  getProductItemById,
  newPayment,
  getPayments,
  getMyOrder,
  getMyDiamondOrder,
  createMyDiamondOrder,
  getDiamondOrderDetail,
  addToDiamondOrder,
  getMyDiamondOrderById,
  getMyDiamondOrderByPlayer,
  createMyOrder,
  addToOrder,
  getMyOrderById,
  getOrderDetail,
  getFavorite,
  createFavorite,
  removeFavorite,
  syncFavorites,
  getOrderDetailsByPlayer,
  getFavoriteWithProduct,
  updateDiamonds,
} from './../controller/shop.controller';
// import { createECPayOrder } from './../controller/ecpay.controller';

const router = express.Router();

// product
router.get('/p-list', getProducts); // 〇
router.get('/p-list/:id', getProductById); // 〇

// product + item 2 張表
router.get('/p-item/:id', getProductItemById); // 〇

// diamond
router.get('/d-list', getDiamonds); // 〇

// payment
router.post('/payment', newPayment); // 〇
// "id": 0,⇒ 不用給
// "fk_order_id": "4",⇒ 必須
// "payment_method": ''
// "isSuccess": true,
// "paid_at": date,
// "coupon_used": true,⇒ 可不用給
// "fk_coupon_id": "1"⇒ 可不用給
router.get('/payment', getPayments); // 〇

// ShopMyOrder
router.get('/my-order', getMyOrder); // 〇
router.post('/my-order', createMyOrder);  // 〇
// "fk_player_account":'',
// "amount": 2000,
// "status":"已下單/取消訂單",
// "payment_status":"尚未付款".

// MyDiamondOrder
router.get('/my-d-order', getMyDiamondOrder); // 〇
router.post('/my-d-order', createMyDiamondOrder); // 〇
// {
//   "fk_player_account": "player1",
//   "amount": 300,
//   "products": [
//     {"id": 1, "price": 100},
//     {"id": 2, "price": 200}
//   ]
// }
router.get('/my-order/:id', getMyOrderById);

// MyDiamondOrder & ShopDiamondOrderDetail
router.get('/my-d-order/:id', getMyDiamondOrderById); // 〇
router.get('/my-d-order/:fk_player_account/details', getMyDiamondOrderByPlayer); // 〇

// ShopDiamondOrderDetail
router.get('/my-d-order-detail', getDiamondOrderDetail); // 〇 不會用到
router.post('/my-d-order-detail', addToDiamondOrder); // 〇 不會用到
// fk_order_id,
// fk_product_id,
// quantity,
// price,

// ShopOrderDetail
router.post('/order-detail', addToOrder); // 〇 不會用到
// "id": 0,⇒ 不用給
// "fk_player_account":''.
// "fk_order_id": "4",⇒ 必須
// "fk_product_id": "1",⇒ 必須
// "quantity": "1"⇒ 可不用給
router.get('/order-detail', getOrderDetail); // 〇 不會用到
router.get('/my-order/:fk_player_account/details', getOrderDetailsByPlayer); // 〇

// 我的最愛
router.get('/favorites', getFavorite); 
router.get('/combined-favorites/:login', getFavoriteWithProduct); 
router.post('/favorites', createFavorite); 
router.delete('/favorites/:fk_product_id', removeFavorite); 
router.post('/favorites/sync', syncFavorites );

// usdateDiamond
router.post('/update-diamonds', updateDiamonds);

export default router;
