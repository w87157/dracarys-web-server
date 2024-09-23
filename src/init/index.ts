import fs from 'fs';

import { aliasOk } from './alias'; // 處理路徑名稱

// eslint-disable-next-line import/order
import { SECRETTEMP_FILE, SECRET_FILE, UPLOAD_DIR } from '../constant';

function handleSecretFile() {
  const isExist = fs.existsSync(SECRET_FILE);
  if (!isExist) {
    const secretTemp = fs.readFileSync(SECRETTEMP_FILE);
    fs.writeFileSync(SECRET_FILE, secretTemp.toString());
  }
}

function handleUploadDir() {
  const isExist = fs.existsSync(UPLOAD_DIR);
  if (!isExist) {
    fs.mkdirSync(UPLOAD_DIR);
  }
}
// 這個後面的代碼才能用@名稱
aliasOk();
handleSecretFile(); // 處理秘鑰文件(src.config/secret.ts)
handleUploadDir(); // 處理文件上傳目錄(src/upload)