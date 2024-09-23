import Sequelize from 'sequelize';

import { IList, ILive } from '@/interface';
import liveModel from '@/model/live.model';
import liveRoomModel from '@/model/liveRoom.model';
import userModel from '@/model/user.model';
import { handlePaging } from '@/utils';

const { Op } = Sequelize;

class LiveService {
  /** 直播是否存在 */
  async isExist(ids: number[]) {
    const res = await liveModel.count({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    return res === ids.length;
  }

  /** 獲取直播列表 */
  async getList({
    id,
    orderBy,
    orderName,
    nowPage,
    pageSize,
    keyWord,
    rangTimeType,
    rangTimeStart,
    rangTimeEnd,
  }: IList<ILive>) {
    let offset;
    let limit;
    if (nowPage && pageSize) {
      offset = (+nowPage - 1) * +pageSize;
      limit = +pageSize;
    }
    const allWhere: any = {};
    if (id) {
      allWhere.id = +id;
    }
    if (keyWord) {
      const keyWordWhere = [
        {
          socketId: {
            [Op.like]: `%${keyWord}%`,
          },
        },
        {
          roomId: {
            [Op.like]: `%${keyWord}%`,
          },
        },
      ];
      allWhere[Op.or] = keyWordWhere;
    }
    if (rangTimeType) {
      allWhere[rangTimeType] = {
        [Op.gt]: new Date(+rangTimeStart!),
        [Op.lt]: new Date(+rangTimeEnd!),
      };
    }
    // @ts-ignore
    const result = await liveModel.findAndCountAll({
      include: [
        {
          model: userModel,
          attributes: {
            exclude: ['password', 'token'],
          },
        },
        {
          model: liveRoomModel,
        },
      ],
      order: [[orderName, orderBy]],
      limit,
      offset,
      where: {
        ...allWhere,
      },
    });
    return handlePaging(result, nowPage, pageSize);
  }

  /** 查找直播 */
  async find(id: number) {
    const result = await liveModel.findOne({ where: { id } });
    return result;
  }

  /** 查找直播 */
  findBySocketId = async (socketId: string) => {
    const res = await liveModel.findAndCountAll({ where: { socketId } });
    return res;
  };

  /** 查找直播 */
  findByRoomId = async (roomId: string) => {
    const res = await liveModel.findOne({
      include: [
        {
          model: userModel,
          attributes: {
            exclude: ['password', 'token'],
          },
        },
        {
          model: liveRoomModel,
        },
      ],
      where: { roomId },
    });
    return res;
  };

  /** 修改直播 */
  async update({
    id,
    socketId,
    roomId,
    user_id,
    coverImg,
    track_audio,
    track_video,
    system,
    streamurl,
    flvurl,
  }: ILive) {
    const result = await liveModel.update(
      {
        socketId,
        roomId,
        user_id,
        coverImg,
        track_audio,
        track_video,
        system,
        streamurl,
        flvurl,
      },
      { where: { id } }
    );
    return result;
  }

  /** 創建直播 */
  async create({
    socketId,
    roomId,
    user_id,
    coverImg,
    track_audio,
    track_video,
    system,
    streamurl,
    flvurl,
  }: ILive) {
    const result = await liveModel.create({
      socketId,
      roomId,
      user_id,
      coverImg,
      track_audio,
      track_video,
      system,
      streamurl,
      flvurl,
    });
    return result;
  }

  /** 刪除直播 */
  async delete(id: number) {
    const result = await liveModel.destroy({
      where: { id },
      individualHooks: true,
    });
    return result;
  }

  /** 刪除直播 */
  deleteBySocketId = async (socketId: string) => {
    const res = await liveModel.destroy({ where: { socketId } });
    return res;
  };
}

export default new LiveService();
