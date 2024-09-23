import { Request, Response } from 'express';
import ShopProduct from '../model/shop-product.model';
import ShopDiamond from '../model/shop-diamond.model';
import ShopItems from '../model/shop-items.model';
import ShopPayment from '../model/shop-payment.model';
import ShopMyOrder from '../model/shop-my-order.model';
import ShopMyDiamondOrder from '../model/shop-my-d-order.model';
import ShopDiamondOrderDetail from '../model/shop-d-order-detail.model';
import ShopOrderDetail from '../model/shop-order-detail.model';
import ShoppingCart from '../model/shop-cart.model';
import ShoppingCartItems from '../model/shop-cart-items.model';
import ShopMyFavorite from '../model/shop-my-favorite.model'
import Account from '../model/member.model';
import sequelize from '../config/mysql';
import { v4 as uuidv4 } from 'uuid';
import { IShopProduct, IShopMyFavorite } from '@/interface'

// import createECPayOrder from './ecpay.controller';

// 獲取所有產品 ShopProduct
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await ShopProduct.findAll();
    res.status(200).json({ result: products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// 獲取所有鑽石 ShopDiamond
export const getDiamonds = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await ShopDiamond.findAll();
    res.status(200).json({ result: data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch diamond data' });
  }
};

// 獲取單一產品 ShopProduct
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await ShopProduct.findByPk(req.params.id);
    if (product) {
      res.status(200).json({ result: product });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};


export const getProductItemById = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id, 10);

    // Fetch the product details
    const product = await ShopProduct.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Fetch the items related to the product
    const items = await ShopItems.findAll({
      where: { fk_product_id: productId },
    });

    res.status(200).json({
      product: {
        id: product.id,
        product_name: product.product_name,
        product_desc: product.product_desc,
        price: product.price,
        category: product.category,
        image: product.image,
        onshelf_status: product.onshelf_status,
      },
      items: items.map(item => ({
        id: item.id,
        item_name: item.item_name,
        item_desc: item.item_desc,
        image: item.image,
      })),
    });
  } catch (error) {
    console.error('Error fetching product and items:', error);
    res.status(500).json({ error: 'Failed to fetch product and items' });
  }
};

// 生成訂單編號
function generateOrderID() {
  const timestamp = new Date().getTime().toString();
  const uuid = uuidv4().substring(0, 8);
  return timestamp + uuid;
}

export const newPayment = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body); // 查看請求體
  try {
    const { fk_order_id, payment_method, isSuccess, paid_at, coupon_used, fk_coupon_id } = req.body;

    // 確保必填字段存在
    if (!fk_order_id || !isSuccess) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const item = await ShopPayment.create({
      id: generateOrderID(),
      fk_order_id,
      payment_method,
      isSuccess,
      paid_at: new Date(),
      coupon_used,
      fk_coupon_id
    });

    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add item' });
  }
};

// 獲取所有訂單 ShopPayment
export const getPayments = async (req: Request, res: Response): Promise<void> => {
  try {
    const payment = await ShopPayment.findAll();
    res.status(200).json({ result: payment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// 獲取下單記錄 ShopMyOrder
export const getMyOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await ShopMyOrder.findAll();
    res.status(200).json({ result: order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// 獲取下單記錄 ShopMyDiamondOrder
export const getMyDiamondOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await ShopMyDiamondOrder.findAll();
    res.status(200).json({ result: order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const createMyDiamondOrder = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body); // 查看請求體
  try {
    const { fk_player_account, amount, products } = req.body;

    // 確保必填字段存在
    if (!fk_player_account || !amount) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }
    if (!Array.isArray(products)) {
      res.status(400).json({ error: 'Products is not an array' });
      return;
    }

    const newOrder = await ShopMyDiamondOrder.create({
      id: 'D' + generateOrderID(),
      fk_player_account,
      amount,
      status: '尚未付款',
    });

    interface Product {
      id: number;
      price: number;
    }

    // 創建 DiamondOrderDetail
    const orderItems = products.map((product: Product) => ({
      fk_order_id: newOrder.id,
      fk_product_id: product.id,
      quantity: 1,
      price: product.price,
    }));

    await ShopDiamondOrderDetail.bulkCreate(orderItems);
    res.status(201).json({
      message: 'Order created successfully',
      orderId: newOrder.id,
    });

    // 綠界整合
    // const paymentUrl = createECPayOrder(newOrder, amount);

    // res.status(201).json({
    //   message: 'Order created successfully',
    //   newOrder,
    //   paymentUrl,
    // });
  } catch (error) {
    console.error(error);  // 添加這一行來查看錯誤信息
    res.status(500).json({ error: 'Failed to create order' });
  }
};

const options = {
  OperationMode: 'Test', //Test or Production
  MercProfile: {
    MerchantID: 2000132,
    HashKey: "5294y06JbISpM5x9",
    HashIV: "v77hoKGq4kWxNNIS",
  },
  IgnorePayment: [
    //    "Credit",
    "WebATM",
    "ATM",
    "CVS",
    "BARCODE",
    "AndroidPay"
  ],
  IsProjectContractor: false,
};

export const getMyDiamondOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await ShopMyDiamondOrder.findByPk(id);
    if (!order) {
      return // res.status(404).json({ message: 'Order not found' });
    }

    const orderItems = await ShopDiamondOrderDetail.findAll({
      where: { fk_order_id: id },
    });

    res.status(200).json({ order, orderItems });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Failed to fetch order' });
  }
};

// 獲取儲值詳細內容(By Player) ShopMyDiamondOrder + ShopDiamondOrderDetail + ShopDiamond + Account
// 獲取特定玩家的所有儲值訂單
export const getMyDiamondOrderByPlayer = async (req, res) => {
  const { fk_player_account } = req.params;

  try {
    // 確認玩家帳戶存在
    const player = await Account.findOne({
      where: { login: fk_player_account },
    });

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // 查找該玩家的所有訂單
    const orders = await ShopMyDiamondOrder.findAll({
      where: { fk_player_account },
    });

    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this player' });
    }

    // 查找每個訂單的訂單項目
    const orderItemsPromises = orders.map(order =>
      ShopDiamondOrderDetail.findAll({
        where: { fk_order_id: order.id },
      })
    );

    const orderItems = await Promise.all(orderItemsPromises);

    // 查找每個訂單項目的鑽石商品詳細信息
    const diamondPromises = orderItems.flat().map(orderItem =>
      ShopDiamond.findByPk(orderItem.fk_product_id)
    );

    const diamonds = await Promise.all(diamondPromises);


    // 組合訂單項目和鑽石商品詳細信息
    const orderItemsWithDiamonds = orderItems.map(orderItemArray =>
      orderItemArray.map(orderItem => ({
        ...orderItem.dataValues,
        diamond: diamonds.find(diamond => diamond?.id === orderItem.fk_product_id),
      }))
    );

    // 組合訂單和訂單項目
    const result = orders.map((order, index) => ({
      order,
      orderItems: orderItemsWithDiamonds[index],
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// 獲取儲值詳細內容 ShopDiamondOrderDetail
export const getDiamondOrderDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await ShopDiamondOrderDetail.findAll();
    res.status(200).json({ result: item });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// 追加商品到訂單 ShopDiamondOrderDetail
export const addToDiamondOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fk_order_id, fk_product_id, quantity, price } = req.body;
    const item = await ShopDiamondOrderDetail.create({
      fk_order_id,
      fk_product_id,
      quantity,
      price,
    });

    res.status(201).json(item);
  } catch (error) {
    console.error('Error adding order detail:', error);
    res.status(500).json({ error: 'Failed to add order detail' });
  }
};

// 新增訂單 ShopMyOrder　（createMyOrder＋addToOrder）
export const createMyOrder = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body); // 查看請求體
  try {
    const { fk_player_account, amount, status, payment_status, products } = req.body;

    // 確保必填字段存在
    if (!fk_player_account || !amount) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }
    if (!Array.isArray(products)) {
      res.status(400).json({ error: 'Products is not an array' });
      return;
    }

    const newOrder = await ShopMyOrder.create({
      id: 'P' + generateOrderID(),
      fk_player_account,
      amount,
      status: '已下單',
      payment_status: 'pending',
    });

    interface Product {
      id: number;
      quantity: number,
      price: number;
    }

    const orderItems = products.map((product: Product) => ({
      fk_player_account: newOrder.fk_player_account,
      fk_order_id: newOrder.id,
      fk_product_id: product.id,
      quantity: product.quantity,
      price: product.price,
    }));

    await ShopOrderDetail.bulkCreate(orderItems);
    res.status(200).json({ orderItems });
  } catch (error) {
    console.error(error);  // 添加這一行來查看錯誤信息
    res.status(500).json({ error: 'Failed to add item' });
  }
};

export const getMyOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await ShopMyOrder.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const orderItems = await ShopOrderDetail.findAll({
      where: { fk_order_id: id },
    });

    res.status(200).json({ order, orderItems });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Failed to fetch order' });
  }
};

// 追加商品到訂單 ShopOrderDetail
export const addToOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fk_player_account, fk_order_id, fk_product_id, quantity } = req.body;
    const item = await ShopOrderDetail.create({
      fk_player_account,
      fk_order_id,
      fk_product_id,
      quantity,
    });

    res.status(201).json(item);
  } catch (error) {
    console.error('Error adding order detail:', error);
    res.status(500).json({ error: 'Failed to add order detail' });
  }
};

// 獲取訂單詳細內容 ShopOrderDetail
export const getOrderDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await ShopOrderDetail.findAll();
    res.status(200).json({ result: item });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// 我的最愛
export const getFavorite = async (req: Request, res: Response): Promise<void> => {
  const { login } = req.query; // Note: change from req.body to req.query

  if (!login) {
    res.status(400).json({ error: 'Login is required.' });
    return;
  }

  try {
    const user = await Account.findOne({ where: { login } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const favorites = await ShopMyFavorite.findAll({
      where: { fk_player_account: login }
    });

    res.status(200).json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getFavoriteWithProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { login } = req.params;

    // 獲取 favorites 列表
    const favorites = await ShopMyFavorite.findAll({
      where: { fk_player_account: login }
    });

    // 獲取所有產品列表
    const products = await ShopProduct.findAll();

    // 創建產品 ID 到產品詳細信息的映射
    const productMap: { [key: number]: IShopProduct } = products.reduce((acc, product) => {
      if (product.id !== undefined) {
        acc[product.id] = product;
      }
      return acc;
    }, {} as { [key: number]: IShopProduct });

    // 將 favorites 列表與產品詳細信息進行關聯
    const combinedFavorites: { [key: number]: IShopMyFavorite } = favorites.map(favorite => ({
      ...favorite.dataValues,
      product: productMap[favorite.fk_product_id]
    }));

    res.json(combinedFavorites);
  } catch (error) {
    console.error('Error combining favorites and products:', error);
    res.status(500).send('Internal Server Error');
  }
};


export const createFavorite = async (req: Request, res: Response): Promise<void> => {
  const { fk_player_account, fk_product_id } = req.body;

  if (!fk_player_account) {
    res.status(400).json({ error: 'Login is required.' });
    return
  }

  if (!fk_product_id) {
    res.status(400).json({ error: 'Product ID is required.' });
    return
  }

  try {
    const user = await Account.findOne({ where: { login: fk_player_account } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const existingFavorite = await ShopMyFavorite.findOne({
      where: { fk_player_account, fk_product_id },
    });

    if (existingFavorite) {
      res.status(409).json({ message: 'Favorite already exists' });
      return;
    }

    await ShopMyFavorite.create({ fk_player_account, fk_product_id });
    res.status(201).json({ message: 'Favorite added successfully' });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const removeFavorite = async (req: Request, res: Response): Promise<void> => {
  const { fk_product_id } = req.params;
  const { login } = req.body;

  if (!fk_product_id) {
    res.status(404).json({ error: 'Product ID not found.' });
    return;
  }

  if (!login) {
    res.status(404).json({ error: 'Login is required.' });
    return;
  }

  try {
    const user = await Account.findOne({ where: { login } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await ShopMyFavorite.destroy({
      where: { fk_player_account: login, fk_product_id },
      force: true
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const syncFavorites = async (req: Request, res: Response): Promise<void> => {
  const { login, favorites } = req.body;

  if (!login || !Array.isArray(favorites)) {
    res.status(400).json({ message: 'Invalid request' });
    return;
  }

  try {
    const user = await Account.findOne({ where: { login } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const existingFavorites = await ShopMyFavorite.findAll({ where: { fk_player_account: login } });
    const existingProductIds = existingFavorites.map(fav => fav.fk_product_id);

    const newFavorites = favorites.filter(productId => !existingProductIds.includes(productId));

    const favoriteEntries = newFavorites.map((productId: number) => ({
      fk_player_account: login,
      fk_product_id: productId,
    }));

    await ShopMyFavorite.bulkCreate(favoriteEntries);

    res.status(200).json({ message: 'Favorites synced successfully' });
  } catch (error) {
    console.error('Error syncing favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// order
export const getOrderDetailsByPlayer = async (req: Request, res: Response): Promise<void> => {
  console.log('Request params:', req.params);
  const { fk_player_account } = req.params;

  if (!fk_player_account) {
    res.status(400).json({ message: 'Player account parameter is missing' });
    return;
  }

  try {
    const player = await Account.findOne({
      where: { login: fk_player_account },
    });

    if (!player) {
      console.log('Player not found');
      res.status(404).json({ message: 'Player not found' });
      return;
    }

    const orders = await ShopMyOrder.findAll({
      where: { fk_player_account },
    });

    if (!orders.length) {
      console.log('No orders found for this player');
      res.status(404).json({ message: 'No orders found for this player' });
      return;
    }

    // console.log('Orders found:', orders);

    const orderItemsPromises = orders.map(order =>
      ShopOrderDetail.findAll({
        where: { fk_order_id: order.id },
      })
    );

    const orderItemsArray = await Promise.all(orderItemsPromises);
    // console.log('Order items array:', orderItemsArray);

    const productIds = orderItemsArray.flat().map(orderItem => orderItem.fk_product_id);
    const uniqueProductIds = [...new Set(productIds)].filter(id => id !== undefined);
    // console.log('Unique product IDs:', uniqueProductIds);

    const products = await ShopProduct.findAll({
      where: { id: uniqueProductIds },
    });

    // console.log('Products found:', products);

    const orderItemsWithProducts = orderItemsArray.map(orderItemArray =>
      orderItemArray.map(orderItem => ({
        ...orderItem.dataValues,
        product: products.find(product => product.id === orderItem.fk_product_id),
      }))
    );

    // console.log('Order items with products:', orderItemsWithProducts);

    const result = orders.map((order, index) => ({
      ...order.dataValues,
      orderItems: orderItemsWithProducts[index],
    }));

    // console.log('Final result:', result);

    res.status(200).json(result); // 返回成功响应应为200而不是201
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};


// update diamond amount
export const updateDiamonds = async (req: Request, res: Response) => {
  const { login, diamond } = req.body;

  try {
    const account: any = await Account.findOne({ where: { login } });
    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

    account.diamond = diamond;
    await account.save();

    res.json({ success: true, message: 'Diamond count updated successfully' });
  } catch (error) {
    console.error('Error updating diamond count:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};