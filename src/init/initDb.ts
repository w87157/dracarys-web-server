import fs from 'fs';

import { Model, ModelStatic, Sequelize } from 'sequelize';

import { PROJECT_ENV, PROJECT_ENV_ENUM } from '@/constant';
import { chalkERROR, chalkINFO, chalkSUCCESS } from '@/utils/chalkTip';
/** 刪除所有索引（除了PRIMARY） */
export async function deleteAllIndexs(sequelize: Sequelize) {
  try {
    const queryInterface = sequelize.getQueryInterface();
    const allTables = await queryInterface.showAllTables();
    console.log(chalkINFO(`所有表:${allTables.toString()}`));
    const allIndexs: any = [];
    allTables.forEach((v) => {
      allIndexs.push(queryInterface.showIndex(v));
    });
    const res1 = await Promise.all(allIndexs);
    const allIndexs1: any = [];
    res1.forEach((v: any[]) => {
      const { tableName }: { tableName: string } = v[0];
      const indexStrArr: string[] = [];
      v.forEach((x) => {
        indexStrArr.push(x.name);
        if (x.name !== 'PRIMARY') {
          allIndexs1.push(queryInterface.removeIndex(tableName, x.name));
        }
      });
      console.log(
        (`目前${tableName}表的索引: ${indexStrArr.toString()}`)
      );
    });
    await Promise.all(allIndexs1);
    console.log(chalkSUCCESS('刪除所有索引成功！'));
  } catch (err) {
    console.log(chalkERROR('刪除所有索引失敗！'), err);
  }
}

/** 刪除所有外鍵 */
export async function deleteAllForeignKeys(sequelize: Sequelize) {
  try {
    const queryInterface = sequelize.getQueryInterface();
    const allTables: string[] = await queryInterface.showAllTables();
    console.log(chalkINFO(`所有表:${allTables.toString()}`));
    const allConstraint: any = [];
    allTables.forEach((v) => {
      allConstraint.push(queryInterface.getForeignKeysForTables([v]));
    });
    const res1 = await Promise.all(allConstraint);
    const allConstraint1: any = [];
    res1.forEach((v) => {
      const tableName = Object.keys(v)[0];
      const constraint: string[] = v[tableName];
      constraint.forEach((item) => {
        allConstraint1.push(queryInterface.removeConstraint(tableName, item));
      });
      console.log(
        (`目前${tableName}表的外鍵: ${constraint.toString()}`)
      );
    });
    await Promise.all(allConstraint1);
    console.log(chalkSUCCESS('刪除所有外鍵成功！'));
  } catch (err) {
    console.log(chalkERROR('刪除所有外鍵失敗！'), err);
  }
}

/**
 * 初始化表
 * @param model
 * @param method
 */
export function initTable(data: {
  model: ModelStatic<Model>;
  method?: 'force' | 'alter';
  sequelize: Sequelize;
}) {
  async function main(
    modelArg: ModelStatic<Model>,
    methodArg?: 'force' | 'alter'
  ) {
    if (methodArg === 'force') {
      await deleteAllForeignKeys(data.sequelize);
      await modelArg.sync({ force: true });
      console.log(chalkSUCCESS(`${modelArg.tableName}表剛剛(重新)創建！`));
    } else if (methodArg === 'alter') {
      await deleteAllForeignKeys(data.sequelize);
      await modelArg.sync({ alter: true });
      console.log(chalkSUCCESS(`${modelArg.tableName}表剛剛同步成功！`));
    } else {
      console.log(chalkINFO(`加載資料庫表: ${modelArg.tableName}`));
    }
  }
  main(data.model, data.method).catch((err) => {
    console.log(chalkERROR(`initTable失敗`), err.message);
    console.log(err);
  });
}

/** 加載所有model */
export const loadAllModel = () => {
  const modelDir = `${process.cwd()}/src/model`;
  fs.readdirSync(modelDir).forEach((file: string) => {
    if (PROJECT_ENV === PROJECT_ENV_ENUM.development) {
      if (file.indexOf('.model.ts') === -1) return;
    } else if (file.indexOf('.model.js') === -1) return;

    // eslint-disable-next-line
    require(`${modelDir}/${file}`).default;
  });
  console.log(chalkSUCCESS(`加載所有資料庫表成功!`));
};

/** 刪除所有表 */
export const deleteAllTable = async (sequelize: Sequelize) => {
  try {
    loadAllModel();
    await sequelize.drop();
    console.log(chalkSUCCESS('刪除所有表成功！'));
  } catch (err) {
    console.log(chalkERROR('刪除所有表失敗！'));
  }
};

/**
 * 初始化資料庫：
 * force:重置所有
 * alert:校正現有資料庫
 * load:加載資料庫表
 */
export const initDb = async (
  type: 'force' | 'alert' | 'load',
  sequelize: Sequelize
) => {
  console.log(chalkINFO(`initDb 被調用，參數 type: ${type}`));
  switch (type) {
    case 'force':
      await deleteAllForeignKeys(sequelize);
      await deleteAllIndexs(sequelize);
      await deleteAllTable(sequelize);
      await sequelize.sync({ force: true }); // 將創建表,如果表已經存在,則將其首先刪除
      console.log(chalkSUCCESS('初始化資料庫所有表完成！'));
      break;
    case 'alert':
      require('@/model/relation');
      await sequelize.sync({ alter: true }); // 這將檢查資料庫中表的目前狀態(它具有哪些列,它們的資料類型等),然後在表中進行必要的更改以使其與模型匹配.
      console.log(chalkSUCCESS('校正資料庫所有表完成！'));
      break;
    case 'load':
      require('@/model/relation');
      break;
    default:
      console.log(chalkERROR(`initDb參數不正確，接收到的參數: ${type}`));
      throw new Error('initDb參數不正確！');
  }
};
