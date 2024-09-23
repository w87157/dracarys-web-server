import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/mysql';
import { initTable } from '../utils';
import { IShopDiamond } from '@/interface';

interface ShopDiamond
  extends Model<InferAttributes<ShopDiamond>, InferCreationAttributes<ShopDiamond>>,
  IShopDiamond {}
const model = sequelize.define<ShopDiamond>(
  'shop_diamond_model',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    d_name: {
      type: DataTypes.STRING(100),
    },
    d_amount: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.INTEGER,
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

initTable(model);
export default model;