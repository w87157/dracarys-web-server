// 一定要將import './init';放到最開頭,因為它裡面初始化了路徑名稱
import './init';
import express from 'express';
import serveStatic from 'serve-static';
import { corsMiddle } from './app/app.middleware';
import { connectMysql } from './config/mysql';
import { connectWebSocket } from './config/websocket';
import {
  PROJECT_ENV,
  PROJECT_NAME,
  PROJECT_PORT,
  STATIC_DIR,
} from './constant';
import { loadAllRoutes } from './router';
import { chalkERROR, chalkSUCCESS, chalkWARN } from '@/utils/chalkTip';
import { initController } from './controller/init.controller'; // 確保正確導入 initController
import { initFFmpeg } from '@/init/initFFmpeg';
import ArtGallery from '@/router/art-gallery'

async function runServer() {

  const port = +PROJECT_PORT; // 端口
  const app = express();
  app.set('trust proxy', true);

  app.use(
    serveStatic(STATIC_DIR, {
      maxAge: '1m', // 緩存時間：1分鐘
    })
  );
  // 靜態文件目錄
  app.use(corsMiddle); // 設置允許跨域


  // app.use('/art-gallery', ArtGallery)
  // app.use(express.static('public'))
  try {
    await Promise.all([
      connectMysql(), // 連線mysql
    ]);
    initController.common.initDefault(),

      await initFFmpeg(true); // 初始化FFmpeg推流
    // await initController.common.initDefault(); // 使用 initController


      // initDb(2); // 初始化sequelize的relation表關聯
      loadAllRoutes(app); // 初始化所有router

    const httpServer = app.listen(port, () => {
      console.log(chalkSUCCESS(`專案啟動成功！`));
      console.log(chalkWARN(`目前監聽的端口: ${port}`));
      console.log(chalkWARN(`目前的專案名稱: ${PROJECT_NAME}`));
      console.log(chalkWARN(`目前的專案環境: ${PROJECT_ENV}`));
    });

    connectWebSocket(httpServer); // 初始化websocket
  } catch (error) {
    console.log(chalkERROR(`專案啟動失敗！`));
    console.log(error);
  }
}

runServer();