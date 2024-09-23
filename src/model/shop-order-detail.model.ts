import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/mysql';
import { initTable } from '../utils';
import { IShopOrderDetail } from '@/interface';

interface ShopOrderDetail
  extends Model<InferAttributes<ShopOrderDetail>, InferCreationAttributes<ShopOrderDetail>>,
  IShopOrderDetail {}
const model = sequelize.define<ShopOrderDetail>(
  'shop_order_detail_model',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    fk_player_account: {
      type: DataTypes.STRING(100),
    },
    fk_order_id: {
      type: DataTypes.STRING,
    },
    fk_product_id: {
      type: DataTypes.INTEGER,
    },
    quantity: {
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