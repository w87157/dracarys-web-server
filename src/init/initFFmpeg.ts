import { execSync, spawnSync } from 'child_process';

import { PROJECT_ENV, PROJECT_ENV_ENUM } from '@/constant';
import liveService from '@/service/live.service';
import { chalkERROR, chalkSUCCESS, chalkWARN } from '@/utils/chalkTip';

import { initUser } from './initData';

function ffmpegIsInstalled() {
  const res = spawnSync('ffmpeg', ['-version']);
  if (res.status !== 0) {
    return false;
  }
  return true;
}

async function addLive({
  roomId,
  user_id,
  localFile,
  remoteFlv,
  flvurl,
  base64,
}: {
  roomId;
  user_id;
  localFile: string;
  remoteFlv: string;
  flvurl: string;
  base64: string;
}) {
  // ffmpeg後臺運行
  // https://www.jianshu.com/p/6ea70e6d8547
  // 1 代表標準輸出
  // 2 代表標準錯誤
  // 1>/dev/null 把標準輸出導入到null設備,也就是消失不見，如果要重定向到某個文件，可以1>1.txt
  // 2>&1 把標準錯誤也導入到標準輸出同樣的地方
  // -loglevel quiet不輸出log
  const ffmpeg = `ffmpeg -loglevel quiet -stream_loop -1 -re -i ${localFile} -c copy -f flv ${remoteFlv} 1>/dev/null 2>&1 &`;
  // const ffmpeg = `echo test initFFmpeg`;
  execSync(ffmpeg);
  const socketId = roomId;
  await liveService.deleteBySocketId(socketId);
  await liveService.create({
    roomId,
    user_id,
    socketId,
    system: 1,
    track_audio: true,
    track_video: true,
    coverImg: base64,
    streamurl: '',
    flvurl,
  });
}

export const initFFmpeg = async (init = true) => {
  if (!init) return;
  const flag = ffmpegIsInstalled();
  if (flag) {
    console.log(chalkWARN('ffmpeg已安裝，開始運行ffmpeg推流'));
  } else {
    console.log(chalkERROR('未安裝ffmpeg！'));
    return;
  }
  try {
    if (PROJECT_ENV === PROJECT_ENV_ENUM.development) {
      await Promise.all([
        addLive({
          roomId: initUser.admin.live_room.id,
          user_id: initUser.admin.id,
          localFile: initUser.admin.live_room.localFile,
          remoteFlv: initUser.admin.live_room.remoteFlv,
          flvurl: initUser.admin.live_room.flvurl,
          base64: initUser.admin.live_room.base64,
        }),
        addLive({
          roomId: initUser.systemUser1.live_room.id,
          user_id: initUser.systemUser1.id,
          localFile: initUser.systemUser1.live_room.localFile,
          remoteFlv: initUser.systemUser1.live_room.remoteFlv,
          flvurl: initUser.systemUser1.live_room.flvurl,
          base64: initUser.systemUser1.live_room.base64,
        }),
      ]);
    } else {
      const queue: any[] = [];
      Object.keys(initUser).forEach((item) => {
        queue.push(
          addLive({
            roomId: initUser[item].live_room.id,
            user_id: initUser[item].id,
            localFile: initUser[item].live_room.localFile,
            remoteFlv: initUser[item].live_room.remoteFlv,
            flvurl: initUser[item].live_room.flvurl,
            base64: initUser[item].live_room.base64,
          })
        );
      });
      await Promise.all(queue);
    }
    console.log(chalkSUCCESS(`FFmpeg推流成功！`));
  } catch (error) {
    console.log(chalkERROR(`FFmpeg推流錯誤！`));
    console.log(error);
  }
};
