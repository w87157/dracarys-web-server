import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/mysql';
import { initTable } from '../utils';
import { IShopMyOrder } from '@/interface';
import Account from "@/model/member.model";

interface ShopMyOrder
  extends Model<InferAttributes<ShopMyOrder>, InferCreationAttributes<ShopMyOrder>>,
  IShopMyOrder {}

const model = sequelize.define<ShopMyOrder>(
  'shop_my_order_model',
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
    payment_status: {
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
