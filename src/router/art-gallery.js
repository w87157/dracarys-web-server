// myRoutes.js
import express from "express";
import {
  testConnection,
  uploadImage,
  getVoteList,
  getArtworkList,
  getArtworkDetail,
  voteIncrease,
  downloadIncrease,
  LikeIncrease,
} from "../controller/art.controller";

const router = express.Router();

// 測試連線
router.get("/", testConnection);

// 圖片上傳
router.post('/upload', uploadImage);



// 投票作品清單
router.get("/vote-list", getVoteList);

// // 歷屆作品清單
router.get("/artwork-list", getArtworkList);

// // 作品詳細頁: 相關統計數字更新
router.get("/detail/:id", getArtworkDetail);

// 投票
router.post("/vote/:id", voteIncrease)  //有進去


// 下載加一
router.post('/increment-download/:id', downloadIncrease);


// 收藏加一
router.post('/increment-like/:id', LikeIncrease);



export default router;