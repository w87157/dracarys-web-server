import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/mysql';
import { initTable } from '../utils';
import { IShopDiamondOrderDetail } from '@/interface';

interface ShopDiamondOrderDetail
  extends Model<InferAttributes<ShopDiamondOrderDetail>, InferCreationAttributes<ShopDiamondOrderDetail>>,
  IShopDiamondOrderDetail {}
const model = sequelize.define<ShopDiamondOrderDetail>(
  'shop_d_order_detail_model',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
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