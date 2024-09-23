import express from 'express';
import { PROJECT_ENV, PROJECT_NAME, PROJECT_NODE_ENV } from '../constant';
import DBController from '../config/websocket/mysql.controller';
import successHandler from '../app/handler/success-handle';
import memberRouter from '@/router/member.routes';
import shopRoutes from '@/router/shop.routes';
import ArtGallery from '@/router/art-gallery';
import forumRoutes from '@/router/forum.routes';
import ecpay from '@/router/ecpay';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

export function loadAllRoutes(app: express.Application) {
  const router = express.Router();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // 啟動檔案上傳
  app.use(fileUpload({
    createParentPath: true
  }));



  // 根router
  app.get('/', async (req, res, next) => {
    res.json({
      message: `歡迎訪問${PROJECT_NAME},目前環境是:${PROJECT_ENV},目前時間:${new Date().toLocaleString()}`,
    });
    await next();
  });

  router.get('/live/list', async (req, res, next) => {
    const result = await DBController.getAllLiveRoom();
    successHandler({ req, res, data: result }); // 確保 successHandler 的調用方式正確
    await next();
  });

  // 使用 router 註冊到 app 中
  app.use(router);
  // API群組
  app.use("/member", memberRouter);
  app.use("/shop", shopRoutes);
  app.use('/art-gallery', ArtGallery);
  app.use('/forum', forumRoutes);
  app.use('/ecpay', ecpay);

  //// 允許assets被以url調用 
  app.use(express.static('public'))

  // 遍歷目錄初始化router
  // fs.readdirSync(__dirname).forEach((file) => {
  //   try {
  //     if (PROJECT_NODE_ENV === 'development' && file === 'index.ts') return;
  //     if (PROJECT_NODE_ENV !== 'development' && file === 'index.js') return;

  //     const allRouter = require(`./${file}`).default;

  //     // 確保導入的是有效的router對象
  //     if (typeof allRouter === 'function' && typeof allRouter.routes === 'function') {
  //       app.use(allRouter.routes());
  //       router.use('/admin', allRouter.routes());
  //       console.log(`初始化router: ${file}`);
  //     } else {
  //       console.error(`無效的router導出: ${file}`);
  //     }
  //   } catch (error) {
  //     console.error(`初始化${file}router出錯:`, error);
  //   }
  // });

  console.log('初始化所有router成功~');
}
