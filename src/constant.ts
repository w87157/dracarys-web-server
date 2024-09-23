import path from 'path';

export enum PROJECT_ENV_ENUM {
  development = 'development',
  prod = 'prod',
  beta = 'beta',
}

export const PROJECT_NAME = process.env.NODE_APP_RELEASE_PROJECT_NAME as string;
export const PROJECT_ENV = process.env
  .NODE_APP_RELEASE_PROJECT_ENV as PROJECT_ENV_ENUM;
export const PROJECT_PORT = process.env.NODE_APP_RELEASE_PROJECT_PORT as string;
export const PROJECT_NODE_ENV = process.env.NODE_ENV as string;

export const STATIC_DIR = path.join(__dirname, './public/'); // 靜態文件目錄
export const UPLOAD_DIR = path.join(__dirname, './upload/'); // 上傳文件接口接收到的文件存放的目錄
export const SECRET_FILE = path.join(
  __dirname,
  PROJECT_NODE_ENV === 'development'
    ? './secret/secret.ts'
    : './secret/secret.ts'
); // 秘鑰文件
export const SECRETTEMP_FILE = path.join(
  __dirname,
  PROJECT_NODE_ENV === 'development'
    ? './secret/secretTemp.ts'
    : './secret/secretTemp.ts'
); // 秘鑰文件模板
export const QQ_MAIL_CONFIG = {
  from: '2274751790@qq.com', // sender address
  to: '2274751790@qq.com', // list of receivers
};

export const ERROR_HTTP_CODE = {
  serverError: 10000, // 伺服器錯誤
  banIp: 1000,
  adminDisableUser: 1001,
  notFound: 1002, // 返回了404的http狀態碼
  errStatusCode: 1003, // 返回了即不是200也不是404的http狀態碼
  shutdown: 1004, // 停機維護
};

export const ALLOW_HTTP_CODE = {
  ok: 200, // 成功
  apiCache: 304, // 接口緩存
  paramsError: 400, // 參數錯誤
  unauthorized: 401, // 未授權
  forbidden: 403, // 權限不足
  notFound: 404, // 未找到
  serverError: 500, // 伺服器錯誤
};

export const HTTP_ERROE_MSG = {
  paramsError: '參數錯誤！',
  unauthorized: '未授權！',
  forbidden: '權限不足！',
  notFound: '未找到！',
  serverError: '伺服器錯誤！',
};

export const COMMON_HTTP_CODE = {
  success: 200, // 成功
  apiCache: 304, // 接口缓存
  paramsError: 400, // 参数错误
  unauthorized: 401, // 未授权
  forbidden: 403, // 权限不足
  notFound: 404, // 未找到
  methodNotAllowed: 405, // 方法不允许，如：服务端提供了一个get的/api/list接口，但客户端却post了/api/list接口
  serverError: 500, // 服务器错误
};

export const HTTP_SUCCESS_MSG = {
  GET: '獲取成功！',
  POST: '新增成功！',
  PUT: '修改成功！',
  DELETE: '刪除成功！',
};

export const BLACKLIST_TYPE = {
  banIp: 1, // 頻繁操作
  adminDisableUser: 2, // 被管理員禁用
};

export const COMMON_ERR_MSG = {
  banIp: '此ip已被禁用，請聯繫管理員處理！',
  jwtExpired: '登錄訊息過期！',
  invalidToken: '非法token！',
  adminDisableUser: '你的賬號已被管理員禁用，請聯繫管理員處理！',
  shutdown: '停機維護中~',
};

// 沒有用到這個DisableEnum枚舉，eslint會報錯
// export enum DisableEnum {
//   'banIp' = 1,
//   'adminDisableUser' = 2,
// }

// 發送郵件結果類型
export const VERIFY_EMAIL_RESULT_CODE = {
  ok: '發送成功！',
  more: '一天只能發5次驗證碼！',
  later: '一分鐘內只能發1次驗證碼，請稍後再試！',
  err: '驗證碼錯誤或已過期！',
  system: '發送郵件錯誤！',
};

// redis前綴
export const REDIS_PREFIX = {
  liveRoom: `${PROJECT_NAME}-${PROJECT_ENV}-liveRoom`, // 登錄不區分前後臺
  emailLogin: `${PROJECT_NAME}-${PROJECT_ENV}-emailLogin`, // 登錄不區分前後臺
  emailRegister: `${PROJECT_NAME}-${PROJECT_ENV}-emailRegister`, // 註冊不區分前後臺
  userBindEmail: `${PROJECT_NAME}-${PROJECT_ENV}-userBindEmail`, // 用戶綁定郵箱
  userCancelBindEmail: `${PROJECT_NAME}-${PROJECT_ENV}-userCancelBindEmail`, // 用戶取消綁定郵箱
  fileProgress: `${PROJECT_NAME}-${PROJECT_ENV}-fileProgress`, // 文件上傳進度
  chunkFileProgress: `${PROJECT_NAME}-${PROJECT_ENV}-chunkFileProgress`, // 分片文件上傳進度
  chooseSongList: `${PROJECT_NAME}-${PROJECT_ENV}-chooseSongList`, // 點歌列表
  historyHightOnlineNum: `${PROJECT_NAME}-${PROJECT_ENV}-historyHightOnlineNum`, // 歷史最高同時在線數
  currDayHightOnlineNum: `${PROJECT_NAME}-${PROJECT_ENV}-currDayHightOnlineNum`, // 目前最高同時在線數
  onlineUser: `${PROJECT_NAME}-${PROJECT_ENV}-onlineUser`, // 目前在線用戶
  onlineVisitor: `${PROJECT_NAME}-${PROJECT_ENV}-onlineVisitor`, // 目前在線遊客
  onlineList: `${PROJECT_NAME}-${PROJECT_ENV}-onlineList`, // 目前在線遊客+用戶
  live: `${PROJECT_NAME}-${PROJECT_ENV}-live`, // 在線遊客+用戶
};

// 平臺類型
export const THIRD_PLATFORM = {
  website: 1, // 站內（user表裡面的用戶就是這個類型，但是不記錄在third_user表裡）
  qq_www: 2, // qq前臺（現在不存在這個類型了）
  qq_admin: 3, // qq後臺
  github: 4, // github
  email: 5, // 郵箱
};

// 監控任務
export const MONIT_JOB = {
  MEMORY: 'monitMemoryJob', // 監控內存任務
  PROCESS: 'monitProcessJob', // 監控node進程任務
  BACKUPSDB: 'monitBackupsDbJob', // 監控備份資料庫任務
  QINIUCDN: 'monitQiniuCDNJob', // 監控七牛雲cdn任務
  DELETELOG: 'monitDeleteLog', // 監控刪除日誌
};

// 監控類型
export const MONIT_TYPE = {
  MEMORY_LOG: 1, // 伺服器內存日誌
  MEMORY_THRESHOLD: 2, // 伺服器內存達到閾值
  QINIU_CDN: 3, // 監控七牛雲
  VUE3_BLOG_SERVER_NODE_PROCESS: 4, // 監控node進程
  RESTART_PM2: 5, // 重啟pm2
  CLEAR_CACHE: 6, // 清除buff/cache
  BACKUPS_DB_OK: 7, // 備份資料庫成功
  BACKUPS_DB_ERR: 8, // 備份資料庫失敗
};

// 七牛雲文件上傳進度類型
export enum QINIU_UPLOAD_PROGRESS_TYPE {
  fileProgress = 1,
  chunkFileProgress = 2,
}
export const QINIU_PROGRESS_LOG_V1 = path.join(UPLOAD_DIR, 'progressv1.log'); // 上傳文件接口接收到的文件存放的目錄
export const QINIU_PROGRESS_LOG_V2 = path.join(UPLOAD_DIR, 'progressv2.log'); // 上傳文件接口接收到的文件存放的目錄
export const QINIU_CDN_DOMAIN = 'resource.hsslive.cn';
export const QINIU_CDN_URL = 'https://resource.hsslive.cn/';
export const QINIU_BUCKET = 'hssblog'; // 七牛雲bucket
export enum QINIU_PREFIX {
  'image/' = 'image/',
  'backupsDatabase/' = 'backupsDatabase/',
  'media/' = 'media/',
  'nuxt-blog-client/' = 'nuxt-blog-client/',
}
