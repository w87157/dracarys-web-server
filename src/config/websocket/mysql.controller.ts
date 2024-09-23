import liveModel from '../../model/live.model';

class DBController {
  /** 新增一個在線房間 */
  addLiveRoom = async ({ roomId = '-1', socketId = '-1', data = {data:{coverImg:''}} }) => {
    const res = await liveModel.create({
      roomId,
      socketId,
      coverImg: JSON.stringify(data.data.coverImg),
    });
    return res;
  };

  /** 刪除一個在線房間 */
  deleteLiveRoom = async (socketId: string) => {
    const res = await liveModel.destroy({ where: { socketId } });
    return res;
  };

  /** 獲取所有在線房間 */
  getAllLiveRoom = async () => {
    const res = await liveModel.findAndCountAll();
    return res;
  };

  /** 獲取所有在線房間 */
  searchLiveRoomBySocketId = async (socketId: string) => {
    const res = await liveModel.findAndCountAll({ where: { socketId } });
    return res;
  };

  /** 獲取所有在線房間 */
  searchLiveRoomByRoomId = async (roomId: string) => {
    const res = await liveModel.findAndCountAll({ where: { roomId } });
    return res;
  };
}

export default new DBController();
