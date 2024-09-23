import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/mysql';
import { initTable } from '../utils';
import { IShopMyDiamondOrder } from '@/interface';
import Account from "@/model/member.model";

interface ShopMyDiamondOrder
  extends Model<InferAttributes<ShopMyDiamondOrder>, InferCreationAttributes<ShopMyDiamondOrder>>,
  IShopMyDiamondOrder {}

const model = sequelize.define<ShopMyDiamondOrder>(
  'shop_my_d_order_model',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      // autoIncrement: true,
    },
    fk_player_account: {
      type: DataTypes.STRING(100),
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING(100),
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);


// model.belongsTo(Account, {
//   foreignKey: 'fk_player_account',
//   targetKey: 'login',
// });

initTable(model);
export default model;
