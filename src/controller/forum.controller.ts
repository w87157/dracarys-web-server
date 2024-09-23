import ForumModel from '@/model/forum.model';
import ForumContentModel from '@/model/forum-content.model';
import ForumListModel from '@/model/forum-list.model';
import ForumNewsModel from '@/model/forum-news.model';
import ForumTopModel from '@/model/forum-top.model';
import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { Op } from 'sequelize';
import { UploadedFile } from 'express-fileupload';

// test
// export const testForum = (req, res) => {
//     res.send('論壇快快連線吧~');
// };


interface FileRequest extends Request {
    files?: {
        [key: string]: UploadedFile | UploadedFile[];
    };
}


// Get articles
export const getForums = async (req: Request, res: Response) => {
    // try {
    //     const forums = await ForumModel.findAll();
    //     res.status(200).json({ result: forums });
    // } catch (error) {
    //     res.status(500).json({ error: 'Failed to fetch forums' });
    // }

    try {
        const forums = await ForumModel.findAll({
            order: [['submit_time', 'DESC']]
        });
        res.status(200).json({ result: forums });
    } catch (error) {
        console.error('Failed to fetch forums:', error);
        res.status(500).json({ error: 'Failed to fetch forums' });
    }
};



// Get an article
export const getForumById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const forum = await ForumModel.findByPk(id);
        if (!forum) {
            return res.status(404).json({ message: 'Forum not found' });
        }
        // 確保 forum 中有 image 屬性
        if (forum.image) {
            // 截取 image 路徑的所需部分
            const imagePath = forum.image.split('src/public')[1];
            // 創建包含截取後 image 路徑的新對象
            const modifiedArticle = {
                ...forum.toJSON(),
                image: "http://localhost:8080" + imagePath
            };
            res.json(modifiedArticle);
        } else {
            res.json(forum);
        }
    } catch (error) {
        console.error('Error fetching forum:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create new articles
export const createForum = async (req: FileRequest, res: Response): Promise<void> => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).json({ message: 'No files were uploaded.' });
            return;
        }

        const { Player_id, area, category, article_title, article, figcaption } = req.body;
        const image = req.files.image as UploadedFile;

        const uploadPath = `src/public/img/${Date.now()}-${image.name}`;

        // 將文件移動到指定的 uploadPath
        image.mv(uploadPath, async (err) => {
            if (err) {
                console.error('Error:', err);
                return res.status(500).json({ message: 'Error', error: err.message });
            }

            // 在數據庫中創建新的論壇條目
            try {
                const newForum = await ForumModel.create({
                    Player_id,
                    area,
                    category,
                    article_title,
                    article,
                    figcaption,
                    image: uploadPath,
                    submit_time: new Date()
                });

                res.status(201).json({
                    message: '成功新增文章',
                    forum: newForum
                });
            } catch (error) {
                console.error('Error creating article.', error);
                // res.status(400).json({
                //     message: '創建論壇文章時出錯',
                //     error: error.message
                // });
            }
        });

    } catch (error) {
        console.error('Error creating forum:', error);
        res.status(400).json({
            message: 'Error creating forum',
            error: (error as Error).message
        });
    }
};

// Update articles
export const updateForum = async (req: any, res: Response): Promise<void> => {

    try {
        const { id } = req.params;
        const { area, category, article_title, article, figcaption } = req.body;

        // 查詢指定 id 的資料
        const forum = await ForumModel.findByPk(id);

        if (!forum) {
            res.status(404).json({ message: 'Forum not found' });
            return;
        }

        let imagePath = forum.image; // 保留原有的圖片路徑

        // 檢查是否有新圖片上傳
        if (req.files && req.files.image) {
            const image = req.files.image as UploadedFile;
            const uploadPath = `src/public/img/${Date.now()}-${image.name}`;

            // 將新圖片移動到指定的 uploadPath
            await image.mv(uploadPath);
            imagePath = uploadPath; // 更新圖片路徑
        }


        // 更新文章
        await ForumModel.update({
            area,
            category,
            article_title,
            article,
            image: imagePath,
            figcaption
        }, {
            where: {
                id: id
            }
        });

        // 重新查詢並返回更新後的資料
        const updatedForum = await ForumModel.findByPk(id);

        res.json({ message: 'Forum updated successfully', forum: updatedForum });
    } catch (error) {
        console.error('Error updating forum:', error);
        res.status(500).json({ message: 'Server error' });
    }

};

// Delete articles
export const deleteForum = async (req: Request, res: Response) => {
    // try {
    //     const forum = await ForumModel.findByPk(req.params.id);
    //     if (forum) {
    //         await forum.destroy();
    //         res.status(204).send();
    //     } else {
    //         res.status(404).json({ error: 'Forum not found' });
    //     }
    // } catch (error) {
    //     res.status(400).json({ error: '400' });
    // }

    try {
        const { id } = req.params;

        const forum = await ForumModel.findByPk(id);
        if (!forum) {
            return res.status(404).json({ message: 'Forum not found' });
        }

        // 刪除文章
        await forum.destroy();

        res.json({ message: 'Forum deleted successfully' });
    } catch (error) {
        console.error('Error deleting forum:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Forum Area Category data
export const getCategorizedForums = async (req: Request, res: Response) => {
    try {
        const categories = ['Guide', 'Equipment', 'Map', 'Other'];
        const result = {};

        for (const category of categories) {
            const forums = await ForumModel.findAll({
                where: { category },
                order: [['submit_time', 'DESC']],
                limit: 4,  // 每個類別只獲取最新的4篇文章
                attributes: ['id', 'article_title', 'article', 'image', 'submit_time'] // 只選擇需要的欄位
            });

            // 處理圖片路徑
            const processedForums = forums.map(forum => {
                const forumData = forum.toJSON();
                if (forumData.image) {
                    const imagePath = forumData.image.split('src/public')[1];
                    forumData.image = "http://localhost:8080" + imagePath;
                }
                // 截短文章內容
                forumData.article = forumData.article.substring(0, 100) + '...';
                return forumData;
            });

            result[category] = processedForums;
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Failed to fetch categorized forums:', error);
        res.status(500).json({ error: 'Failed to fetch categorized forums' });
    }
};


// Get top official events
export const getForumTop = async (req: Request, res: Response) => {
    try {
        const events = await ForumTopModel.findAll();
        res.status(200).json({ events });
    } catch (error) {
        res.status(400).json({ error: '400' });
    }

    // try {
    //     const products = await ShopProduct.findAll();
    //     res.status(200).json({ result: products });
    //   } catch (error) {
    //     res.status(500).json({ error: 'Failed to fetch products' });
    //   }
};

// Read new articles
// export const getForumsContent = async (req: Request, res: Response) => {
//     try {
//         const forumContents = await ForumContentModel.findAll();
//         res.status(200).json(forumContents);
//     } catch (error) {
//         res.status(400).json({ error: '400' });
//     }
// };

// Read more list
// export const getForumsList = async (req: Request, res: Response) => {
//     try {
//         const forumLists = await ForumListModel.findAll();
//         res.status(200).json(forumLists);
//     } catch (error) {
//         res.status(400).json({ error: '400' });
//     }
// };

// Read news list
// export const getForumNews = async (req: Request, res: Response) => {
//     try {
//         const forumNews = await ForumNewsModel.findAll();
//         res.status(200).json(forumNews);
//     } catch (error) {
//         res.status(400).json({ error: '400' });
//     }
// };


// Get current Taiwan time
export const getCurrentTaiwanTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 8);
    return now;
};

// Upload stream video
// export const uploadVideo = (req: Request, res: Response) => {
//     if (!req.file) {
//         return res.status(400).send({ error: 'No video file uploaded' });
//     }

//     res.status(200).send({ message: 'Video uploaded successfully', path: `/uploads/${req.file.filename}` });
// };

// Stream video
// export const streamVideo = (req: Request, res: Response) => {
//     const videoPath = path.join(__dirname, '../uploads', req.params.filename);

//     fs.stat(videoPath, (err, stats) => {
//         if (err) {
//             return res.status(404).send({ error: 'Video not found' });
//         }

//         const { range } = req.headers;
//         if (!range) {
//             return res.status(400).send({ error: 'Range header is required' });
//         }

//         const CHUNK_SIZE = 10 ** 6; // 1MB
//         const start = Number(range.replace(/\D/g, ''));
//         const end = Math.min(start + CHUNK_SIZE, stats.size - 1);
//         const contentLength = end - start + 1;

//         const headers = {
//             'Content-Range': `bytes ${start}-${end}/${stats.size}`,
//             'Accept-Ranges': 'bytes',
//             'Content-Length': contentLength,
//             'Content-Type': 'video/mp4',
//         };

//         res.writeHead(206, headers);

//         const videoStream = fs.createReadStream(videoPath, { start, end });
//         videoStream.pipe(res);
//     });
// };