import ArtWorkModel from "../model/artwork.model";
// import ArtWorkTypeModel from "../model/artwork-type.model";
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize';



///// 測試用
export const testConnection = (req, res) => {
  res.send('我的藝術走廊有連線!!!!');
};


///// 參賽作品
export const getVoteList = async (req, res) => {
  const voteTime = '2024-06-01 00:00:00';
  try {
    const result = await ArtWorkModel.findAll({
      where: {
        createdAt: {
          [Op.gte]: voteTime
        }
      },
      order: [
        ['createdAt', 'DESC'] // 按 createdAt 降序排列
      ]
    });
    // const result = await ArtWorkModel.findAll();
    res.status(200).json(result)
  } catch (err) {
    console.error(err);
    res.status(500).send('<h3>連線有問題喔，請稍後再試一次！</h3>');
  }
}


///// 作品報名上傳
export const uploadImage = async (req, res) => {

  const extMap = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
  };

  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }

    const { title, desc, artwork_type_id, user_account } = req.body;
    const artwork = req.files.artwork;


    //使用 mv() 方法來移動上傳檔案到要放置的目錄裡
    let timeStamp = `${Date.now()}` + extMap[artwork.mimetype]
    await artwork.mv('./src/public/img/' + timeStamp);

    const newArtwork = await ArtWorkModel.create({
      title,  //必填
      desc,
      img: 'http://localhost:8080/img/' + timeStamp, //必填 [！]測試時，key = artwork
      artwork_type_id, //必填
      user_account, //必填
      view_count: 0,
      download_count: 0,
      like_count: 0,
      vote_count: 0,  //新增
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({ newArtwork, artwork });
    // res.json(newArtwork)

  } catch (error) {
    console.error('Error creating artwork:', error);
    res.status(500).json({ error: 'Internal server error!!' });
  }
};


///// 歷屆作品
// export const getArtworkList = async (req, res) => {
//   const voteTime = '2024-06-01 00:00:00';
//   try {
//     const page = Number(req.query.page) || 1;
//     const perpage = Number(req.query.perpage) || 8;
//     const limit = perpage;
//     const offset = (page - 1) * perpage;

//     const artworks = await ArtWorkModel.findAll({
//       where: {
//         createdAt: {
//           [Op.lt]: voteTime,
//         },
//       },
//       limit: limit,
//       offset: offset
//     });

//     const artworksCount = await ArtWorkModel.count(); //計算資料筆數:number

//     const pageCount = Math.ceil(artworksCount / perpage);    // 計算總共幾頁

//     return res.status(200).json({
//       status: 'success',
//       data: {
//         total: artworksCount, //總筆數
//         pageCount,            //總頁數
//         page,                 //目前第幾頁
//         perpage,              //每頁幾筆資料
//         artworks,             //本頁商品陣列
//       }

//     });
//   } catch (error) {
//     console.error('Error fetching artworks:', error);
//     return res.status(500).json({
//       error: 'An error occurred while fetching artworks',
//       details: error.message
//     });
//   }
// };
export const getArtworkList = async (req, res) => {
  const voteTime = '2024-06-01 00:00:00';
  try {
    const artworks = await ArtWorkModel.findAll({
      where: {
        createdAt: {
          [Op.lt]: voteTime,
        },
      },
    });


    return res.status(200).json({
      status: 'success',
      artworks,             //本頁商品陣列
    });
  } catch (error) {
    console.error('Error fetching artworks:', error);
    return res.status(500).json({
      error: 'An error occurred while fetching artworks',
      details: error.message
    });
  }
};

///// 作品內頁：找到該筆 + 統計數據更新(觀看+1 | )
export const getArtworkDetail = async (req, res) => {
  let output = {
    success: false,
    rows: {},
  };
  const artworkId = +req.params.id || 0;


  // 使用者亂輸入的防禦
  if (!artworkId) {
    return res.json(output);
  }

  // 找到動態路由指定的該筆資料
  try {
    let result = await ArtWorkModel.findOne({
      where: {
        id: artworkId
      }
    })

    // 沒找到資料的流程控制
    if (result) {
      // 觀看加一
      result.view_count += 1;
      await result.save();

      output = { ...output, success: !output.success, rows: result }
      res.json(output);
    } else {
      res.json(output);
    }
  } catch (error) {
    res.json(output);
  }


};

//////  投票功能
export const voteIncrease = async (req, res) => {
  // res.send('vote plus one')  //成功
  const { id } = req.params;
  console.log('投票ID:', id); // 檢查傳遞的ID

  try {
    // 更新作品的投票數
    const [updatedCount] = await ArtWorkModel.update(
      { vote_count: Sequelize.literal('vote_count + 1') },
      {
        where: { id }
      }
    );

    console.log('更新结果:', updatedCount); // 檢查更新结果

    if (updatedCount === 0) {
      throw new Error('作品不存在');
    }

    // 獲取更新後的的作品信息
    const updatedArtwork = await ArtWorkModel.findByPk(id);
    console.log('更新後的作品:', updatedArtwork); // 檢查更新後的作品

    res.json({
      success: true,
      message: '投票成功',
      artwork: updatedArtwork
    });

  } catch (error) {
    console.error('投票错误:', error);
    if (error.message === '作品不存在') {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: '服務器錯誤' });
    }
  }
};


/////// 作品下載加一
export const downloadIncrease = async (req, res) => {
  try {
    const { id } = req.params;

    // 查找作品
    const artwork = await ArtWorkModel.findByPk(id);

    if (!artwork) {
      return res.status(404).json({ success: false, message: '作品未找到' });
    }

    // 增加下載次數
    artwork.download_count = (artwork.download_count || 0) + 1;
    await artwork.save();

    // 返回成功響應
    res.json({
      success: true,
      message: '下載次數已更新',
      newDownloadCount: artwork.download_count
    });

  } catch (error) {
    console.error('增加下載次數時出錯:', error);
    res.status(500).json({ success: false, message: '服務器錯誤' });
  }
}


///////  作品按讚加一(like)
export const LikeIncrease = async (req, res) => {
  try {
    const { id } = req.params;

    // 查找作品
    const artwork = await ArtWorkModel.findByPk(id);

    if (!artwork) {
      return res.status(404).json({ success: false, message: '作品未找到' });
    }

    // 增加下載次數
    artwork.like_count = (artwork.like_count || 0) + 1;
    await artwork.save();

    // 返回成功響應
    res.json({
      success: true,
      message: '按讚次數已更新',
      newDownloadCount: artwork.like_count
    });

  } catch (error) {
    console.error('增加按讚次數時出錯:', error);
    res.status(500).json({ success: false, message: '服務器錯誤' });
  }
}

