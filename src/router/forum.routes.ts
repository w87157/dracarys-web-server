import express from 'express';
import bodyParser from 'body-parser';
import {
    createForum,
    getForums,
    getForumById,
    updateForum,
    deleteForum,

    getForumTop,
    // getForumsContent,
    getCategorizedForums,
    // getForumNews,   

    // getStreamVideo,
    // getStreamVideoById,

} from '@/controller/forum.controller';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// User Article Management
router.get('/articles/categorized', getCategorizedForums);  // 獲取所有論壇分類文章
router.get('/articles/:id', getForumById); // 獲取特定文章
router.get('/articles', getForums); // 獲取所有文章
router.post('/articles', createForum); // 創建新文章
router.put('/articles/:id', updateForum); // 更新特定文章
router.delete('/articles/:id', deleteForum); // 刪除特定文章



// Top Official Events
router.get('/forums', getForumTop);

// Get NewsData
// 先寫死
// router.get('/forums', getForumsContent);


// Admin Article Management
// 以後再做
// router.get('/admin-forums', getAllForumNews);
// router.put('/admin-forums/:id', updateForumNews);
// router.delete('/admin-forums/:id', deleteForumNews);

// router.get('/stream-videos', getStreamVideo);
// router.get('/stream-videos/:id', getStreamVideoById);


// router.get("/", function (req, res) {
//     res.send("news-content");
// });

// router.get("/", testForum);

export default router;