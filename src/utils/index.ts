import { Request } from 'express';
import { Sequelize, Model, ModelStatic } from 'sequelize';
import { chalkERROR, chalkINFO, chalkSUCCESS } from '@/utils/chalkTip';

import sequelize from '../config/mysql';
import path from 'path';
import { spawnSync } from 'child_process';
/**
 * @description: 處理free命令返回的內存訊息
 * @param {string} str
 * @return {*}
 */
export const handleData = (str: string): Record<string, string> => {
  const arr = str.match(/\S+/g)!;

  const mem = 'Mem:';
  const swap = 'Swap:';
  const res: string[][] = [];
  const obj: Record<string, string> = {};

  res.push(arr.splice(0, 6));
  res.push(arr.splice(0, 7));
  res.push(arr.splice(0, arr.length));

  res[0].forEach((key, index) => {
    if (res[1][index + 1]) {
      obj[mem + key] = res[1][index + 1];
    }
    if (res[2][index + 1]) {
      obj[swap + key] = res[2][index + 1];
    }
  });
  return obj;
};

export function dockerIsInstalled() {
  const res = spawnSync('docker', ['-v']);
  if (res.status !== 0) {
    return false;
  }
  return true;
}

export const resolveApp = (relativePath) =>
  path.join(__dirname, '../', relativePath);

export const replaceKeyFromValue = (str: string, obj: Record<string, string>): string => {
  let res = str;
  Object.keys(obj).forEach((v) => {
    res = res.replace(new RegExp(`{${v}}`, 'ig'), obj[v]);
  });
  return res;
};

export const getFileExt = (name: string): string => {
  const arr = name.split('.');
  const ext = arr[arr.length - 1];
  return ext;
};

export const isAdmin = (req: Request): boolean => req.url!.indexOf('/admin/') !== -1;

/** 處理返回的分頁資料 */
export const handlePaging = (
  result: { count: number; rows: any[] },
  nowPage?: string,
  pageSize?: string
): { nowPage: number; pageSize: number; hasMore: boolean; total: number; rows: any[] } => {
  const obj = {
    nowPage: nowPage ? +nowPage : 1,
    pageSize: pageSize ? +pageSize : result.count,
    hasMore: (nowPage ? +nowPage : 1) * (pageSize ? +pageSize : result.count) - result.count < 0,
    total: result.count,
    rows: result.rows
  };
  return obj;
};

/** 刪除所有外鍵 */
export const deleteAllForeignKeys = async (): Promise<void> => {
  try {
    const queryInterface = sequelize.getQueryInterface();
    const allTables: string[] = await queryInterface.showAllTables();
    console.log(chalkINFO(`所有表:${allTables.toString()}`));
    const allConstraint: Promise<any>[] = allTables.map((v) => queryInterface.getForeignKeysForTables([v]));
    const res1 = await Promise.all(allConstraint);
    const allConstraint1: Promise<void>[] = [];
    res1.forEach((v) => {
      const tableName = Object.keys(v)[0];
      const constraint: string[] = v[tableName];
      constraint.forEach((item) => {
        allConstraint1.push(queryInterface.removeConstraint(tableName, item));
      });
      console.log(chalkINFO(`目前${tableName}表的外鍵: ${constraint.toString()}`));
    });
    await Promise.all(allConstraint1);
    console.log(chalkSUCCESS('刪除所有外鍵成功！'));
  } catch (err) {
    console.log(chalkERROR('刪除所有外鍵失敗！'), err);
  }
};

/** 刪除所有索引（除了PRIMARY） */
export const deleteAllIndexes = async (): Promise<void> => {
  try {
    const queryInterface = sequelize.getQueryInterface();
    const allTables = await queryInterface.showAllTables();
    console.log(chalkINFO(`所有表:${allTables.toString()}`));
    const allIndexes: Promise<any>[] = allTables.map((v) => queryInterface.showIndex(v));
    const res1 = await Promise.all(allIndexes);
    const allIndexes1: Promise<void>[] = [];
    res1.forEach((v) => {
      const tableName = v[0].tableName;
      const indexStrArr: string[] = [];
      v.forEach((x) => {
        indexStrArr.push(x.name);
        if (x.name !== 'PRIMARY') {
          allIndexes1.push(queryInterface.removeIndex(tableName, x.name));
        }
      });
      console.log(chalkINFO(`目前${tableName}表的索引: ${indexStrArr.toString()}`));
    });
    await Promise.all(allIndexes1);
    console.log(chalkSUCCESS('刪除所有索引成功！'));
  } catch (err) {
    console.log(chalkERROR('刪除所有索引失敗！'), err);
  }
};

/**
 * 初始化表
 * @param model
 * @param method
 */
export const initTable = (
  model: ModelStatic<Model>,
  method?: 'force' | 'alter'
): void => {
  async function main(
    modelArg: ModelStatic<Model>,
    methodArg: 'force' | 'alter'
  ): Promise<void> {
    if (methodArg === 'force') {
      await deleteAllForeignKeys();
      await modelArg.sync({ force: true });
      console.log(chalkSUCCESS(`${modelArg.tableName}表剛剛(重新)創建！`));
    } else if (methodArg === 'alter') {
      await deleteAllForeignKeys();
      await modelArg.sync({ alter: true });
      console.log(chalkSUCCESS(`${modelArg.tableName}表剛剛同步成功！`));
    } else {
      console.log(chalkINFO(`初始化資料庫表: ${modelArg.tableName}`));
    }
  }
  main(model, method!).catch((err) => {
    console.log(chalkERROR(`initTable失敗`), err.message);
    console.log(err);
  });
};

/**
 * @param code 驗證碼
 * @param desc 驗證碼作用
 * @param exp 有效期，單位：秒，但返回時會轉換成分鐘
 */
export const emailContentTemplate = ({
  code,
  desc,
  exp,
  subject,
}: {
  code: string;
  desc: string;
  exp: number;
  subject?: string;
}): { subject: string; content: string } => {
  const subjectTemp = subject || `目驗證碼：${code}`;
  const content = `目驗證碼：${code}，此驗證碼用於${desc}，有效期${exp / 60}分鐘，請勿告知他人。`;
  return { subject: subjectTemp, content };
};

/**
 * 扁平化資料轉樹型
 */
export const arrayToTree = ({
  originArr = [],
  originPid = 1,
  originIdKey = 'id',
  originPidKey = 'pid',
  resChildrenKey = 'children',
  resIdKey,
  resPidKey,
}: {
  originArr: any[];
  originPid: number;
  originIdKey: string;
  originPidKey: string;
  resChildrenKey: string;
  resIdKey?: string;
  resPidKey?: string;
}): any[] => {
  const handleToTree = (arr: any[], pid: number): any[] => {
    function loop(_pid: number): any[] {
      const res: any[] = [];
      for (let i = 0; i < arr.length; i += 1) {
        const item = arr[i];
        if (resIdKey && item[originIdKey] !== undefined) {
          item[resIdKey] = item[originIdKey];
          delete item[originIdKey];
        }
        if (resPidKey && item[originPidKey] !== undefined) {
          item[resPidKey] = item[originPidKey];
          delete item[originPidKey];
        }
        if (item[originPidKey] === _pid || (resPidKey && item[resPidKey] === _pid)) {
          const children = loop(item[resIdKey as string] || item[originIdKey]);
          if (children.length) item[resChildrenKey] = children;
          res.push(item);
        }
      }
      return res;
    }
    return loop(pid);
  };
  const data = JSON.parse(JSON.stringify(originArr));
  return handleToTree(data, originPid);
};