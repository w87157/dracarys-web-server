import express, { Request, Response, NextFunction } from 'express';
import successHandler from '@/app/handler/success-handle';
import { COMMON_HTTP_CODE, PROJECT_ENV, PROJECT_ENV_ENUM } from '@/constant';
import { bulkCreateLive, bulkCreateShopProduct, bulkCreateShopDiamond, bulkCreateShopPayment, bulkCreateShopOrderDetail, bulkCreateShopMyOrder, bulkCreateShopItems, bulkCreateForum, bulkCreateForumContent, bulkCreateForumList, bulkCreateForumNews, bulkCreateForumTop, bulkCreateArtworkType, bulkCreateArtwork } from '@/init/initData';
import liveModel from '@/model/live.model';
import shopProductModel from '@/model/shop-product.model'; // 修正这里的导入
import shopDiamondModel from '@/model/shop-diamond.model'; // 修正这里的导入
import shopPaymentModel from '@/model/shop-payment.model'; // 修正这里的导入
import shopOrderDetailModel from '@/model/shop-order-detail.model'; // 修正这里的导入
import ShopMyFavoriteModel from '@/model/shop-my-favorite.model'; // 修正这里的导入
import shopOrderModel from '@/model/shop-my-order.model'; // 修正这里的导入
import shopItemsModel from '@/model/shop-items.model'; // 修正这里的导入
import ForumModel from '@/model/forum.model';
import ForumContentModel from '@/model/forum-content.model';
import ForumListModel from '@/model/forum-list.model';
import ForumNewsModel from '@/model/forum-news.model';
import ForumTopModel from '@/model/forum-top.model';
import ArtWorkTypeModel from '@/model/artwork-type.model';
import ArtWorkModel from '@/model/artwork.model';
import { chalkWARN, chalkINFO, chalkERROR } from '@/utils/chalkTip';

class InitController {
  common = {
    initDefault: async () => {
      try {
        const live = await liveModel.count();
        if (live === 0) {
          console.log(chalkWARN('正在初始化資料'));
          await Promise.all([
            // this.common.initLive(),
            this.common.initShopProduct(),
            this.common.initShopDiamond(),
            this.common.initShopPayment(),
            this.common.initShopOrderDetail(),
            // this.common.initShopMyFavorite(),
            this.common.initShopOrder(),
            this.common.initShopItems(),
            this.common.initForum(),
            this.common.initForumContent(),
            this.common.initForumList(),
            this.common.initForumNews(),
            this.common.initForumTop(),
            this.common.initArtwork(),
            this.common.initArtworkType(),
          ]);
          console.log(chalkINFO('初始化資料完成'));
        } else {
          console.log(chalkWARN('已初始化資料庫，不能在初始化了'));
        }
      } catch (error) {
        console.error(chalkERROR(error));
      }
    },
    // 暫時先關掉假資料
    // initLive: async () => {
    //   const count = await liveModel.count();
    //   if (count === 0) {
    //     await liveModel.bulkCreate(bulkCreateLive);
    //   }
    // },
    initShopProduct: async () => {
      const count = await shopProductModel.count();
      console.log(chalkINFO('Shop的數量'), count);
      if (count === 0) {
        await shopProductModel.bulkCreate(bulkCreateShopProduct);
      }
    },
    initShopDiamond: async () => {
      const count = await shopDiamondModel.count();
      console.log(chalkINFO('Shop的數量'), count);
      if (count === 0) {
        await shopDiamondModel.bulkCreate(bulkCreateShopDiamond);
      }
    },
    initShopPayment: async () => {
      const count = await shopPaymentModel.count();
      console.log(chalkINFO('Shop的數量'), count);
      if (count === 0) {
        await shopPaymentModel.bulkCreate(bulkCreateShopPayment);
      }
    },
    initShopOrderDetail: async () => {
      const count = await shopOrderDetailModel.count();
      console.log(chalkINFO('Shop的數量'), count);
      if (count === 0) {
        await shopOrderDetailModel.bulkCreate(bulkCreateShopOrderDetail);
      }
    },
    // initShopMyFavorite: async () => {
    //   const count = await ShopMyFavoriteModel.count();
    //   console.log(chalkINFO('Shop的數量'), count);
    //   if (count === 0) {
    //     await ShopMyFavoriteModel.bulkCreate(bulkCreateShopMyFavorite);
    //   }
    // },
    initShopOrder: async () => {
      const count = await shopOrderModel.count();
      console.log(chalkINFO('Shop的數量'), count);
      if (count === 0) {
        await shopOrderModel.bulkCreate(bulkCreateShopMyOrder);
      }
    },
    initShopItems: async () => {
      const count = await shopItemsModel.count();
      console.log(chalkINFO('Shop的數量'), count);
      if (count === 0) {
        await shopItemsModel.bulkCreate(bulkCreateShopItems);
      }
    },
    initForum: async () => {
      const count = await ForumModel.count();
      console.log(chalkINFO('論壇文章管理'), count);
      if (count === 0) {
        await ForumModel.bulkCreate(bulkCreateForum);
      }
    },
    initForumContent: async () => {
      const count = await ForumContentModel.count();
      console.log(chalkINFO('論壇文章'), count);
      if (count === 0) {
        await ForumContentModel.bulkCreate(bulkCreateForumContent);
      }
    },
    initForumList: async () => {
      const count = await ForumListModel.count();
      console.log(chalkINFO('新聞相關文章'), count);
      if (count === 0) {
        await ForumListModel.bulkCreate(bulkCreateForumList);
      }
    },
    initForumNews: async () => {
      const count = await ForumNewsModel.count();
      console.log(chalkINFO('管理員文章管理'), count);
      if (count === 0) {
        await ForumNewsModel.bulkCreate(bulkCreateForumNews);
      }
    },
    initForumTop: async () => {
      const count = await ForumTopModel.count();
      console.log(chalkINFO('Shop&ArtGallery活動'), count);
      if (count === 0) {
        await ForumTopModel.bulkCreate(bulkCreateForumTop);
      }
    },

    initArtwork: async () => {
      const count = await ArtWorkModel.count();
      console.log(chalkINFO('ArtWork'), count);
      if (count === 0) {
        await ArtWorkModel.bulkCreate(bulkCreateArtwork);
      }
    },

    initArtworkType: async () => {
      const count = await ArtWorkTypeModel.count();
      console.log(chalkINFO('ArtWorkType'), count);
      if (count === 0) {
        await ArtWorkTypeModel.bulkCreate(bulkCreateArtworkType);
      }
    },
  };

  // initLive = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     await this.common.initLive();
  //     successHandler({ req, res, message: '初始化角色成功！' });
  //     next();
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // 初始化商店
  initShopProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.common.initShopProduct();
      successHandler({ req, res, message: '初始化商店成功！' });
      next();
    } catch (error) {
      next(error);
    }
  };


  initShopDiamond = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.common.initShopDiamond();
      successHandler({ req, res, message: '初始化商店成功！' });
      next();
    } catch (error) {
      next(error);
    }
  };

  initShopPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.common.initShopPayment();
      successHandler({ req, res, message: '初始化商店成功！' });
      next();
    } catch (error) {
      next(error);
    }
  };

  initShopOrderDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.common.initShopOrderDetail();
      successHandler({ req, res, message: '初始化商店成功！' });
      next();
    } catch (error) {
      next(error);
    }
  };

  // initShopMyFavorite = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     await this.common.initShopMyFavorite();
  //     successHandler({ req, res, message: '初始化商店成功！' });
  //     next();
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  initShopOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.common.initShopOrder();
      successHandler({ req, res, message: '初始化商店成功！' });
      next();
    } catch (error) {
      next(error);
    }
  };

  initShopItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.common.initShopItems();
      successHandler({ req, res, message: '初始化商店成功！' });
      next();
    } catch (error) {
      next(error);
    }
  };

  // 初始化論壇
  initForum = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.common.initForum();
      successHandler({ req, res, message: '初始化論壇成功！' });
      next();
    } catch (error) {
      next(error);
    }
  };

  initForumContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.common.initForumContent();
      successHandler({ req, res, message: '初始化論壇成功！' });
      next();
    } catch (error) {
      next(error);
    }
  };

  initForumList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.common.initForumList();
      successHandler({ req, res, message: '初始化論壇成功！' });
      next();
    } catch (error) {
      next(error);
    }
  };

  initForumNews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.common.initForumNews();
      successHandler({ req, res, message: '初始化論壇成功！' });
      next();
    } catch (error) {
      next(error);
    }
  };

  initForumTop = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.common.initForumTop();
      successHandler({ req, res, message: '初始化論壇成功！' });
      next();
    } catch (error) {
      next(error);
    }
  };

  initArtwork = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.common.initArtwork();
      successHandler({ req, res, message: '初始化論壇成功！' });
      next();
    } catch (error) {
      next(error);
    }
  };

  initArtworkType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.common.initArtworkType();
      successHandler({ req, res, message: '初始化論壇成功！' });
      next();
    } catch (error) {
      next(error);
    }
  };

  // 重建表
  forceTable = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (PROJECT_ENV !== PROJECT_ENV_ENUM.development) {
        // some condition for production
      }
      await Promise.all([
        liveModel.sync({ force: true }),
        shopProductModel.sync({ force: true }), // 修正这里的同步
      ]);

      successHandler({ req, res, data: '重建表成功！' });
      next();
    } catch (error) {
      next(error);
    }
  };
}

const router = express.Router();
const initController = new InitController();

// router.post('/init-live', initController.initLive);
router.post('/init-shop-product', initController.initShopProduct);
router.post('/init-shop-product', initController.initShopDiamond);
router.post('/init-shop-payment', initController.initShopPayment);
// router.post('/init-shop-order-detail', initController.initShopOrderDetail);
// router.post('/init-shop-my-favorite', initController.initShopMyFavorite);
// router.post('/init-shop-order', initController.initShopOrder);
router.post('/init-shop-items', initController.initShopItems);
router.post('/init-forum', initController.initForum);
router.post('/init-forum-content', initController.initForumContent);
router.post('/init-forum-list', initController.initForumList);
router.post('/init-forum-news', initController.initForumNews);
router.post('/init-forum-top', initController.initForumTop);
router.post('/init-art-work-type', initController.initArtworkType);
router.post('/init-art-work', initController.initArtwork);
router.post('/force-table', initController.forceTable);

export { initController };
export default router;
