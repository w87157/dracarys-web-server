import { Sequelize } from 'sequelize';

import { MYSQL_CONFIG } from '../../secret/secret';
import { initDb } from '@/init/initDb';
import {
  chalkERROR,
  chalkINFO,
  chalkSUCCESS,
  chalkWARN,
} from '@/utils/chalkTip';
export const dbName = MYSQL_CONFIG.database;

export function newSequelize(db?) {
  return new Sequelize({
    database: db,
    username: MYSQL_CONFIG.username,
    password: MYSQL_CONFIG.password,
    host: MYSQL_CONFIG.host,
    port: MYSQL_CONFIG.port,
    dialect: 'mysql',
    dialectOptions: {
      // 返回正確的時間戳字符串。
      dateStrings: true,
      typeCast: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    timezone: '+08:00',
  });
}

const msg = (flag: boolean) =>
  `連接${MYSQL_CONFIG.host}:${MYSQL_CONFIG.port}服務器的${dbName}資料庫${
    flag ? '成功' : '失敗'
  }!`;

const sequelize = newSequelize(dbName);

async function handleInit() {
  const initSequelize = newSequelize();
  try {
    await initSequelize.query(`USE ${dbName}`, { logging: false });
    console.log(chalkINFO('正在初始化資料庫...'));
  } catch (error: any) {
    if (error.message.indexOf('Access') !== -1) {
      console.log(chalkERROR(msg(false)));
      await initSequelize.close();
      return;
    }
    if (error.message.indexOf('ECONNREFUSED') !== -1) {
      console.log(chalkERROR(msg(false)));
      await initSequelize.close();
      return;
    }
    console.log(chalkWARN(`${dbName}資料庫不存在，開始新建${dbName}資料庫！`));
    await initSequelize.query(
      `CREATE DATABASE ${dbName} CHARACTER SET = 'utf8mb4';`,
      { logging: false }
    );
    console.log(chalkSUCCESS(`新建${dbName}資料庫成功！`));
    await initDb('force', sequelize);
  }
  await initSequelize.close();
}

/** 連接資料庫 */
export const connectMysql = async () => {
  console.log(
    (
      `開始連接${MYSQL_CONFIG.host}:${MYSQL_CONFIG.port}服務器的${dbName}資料庫...`
    )
  );
  await handleInit();
  await sequelize.authenticate({ logging: false });
  await initDb('load', sequelize);
  console.log(chalkSUCCESS(msg(true)));
};

export default sequelize;
